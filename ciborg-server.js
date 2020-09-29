let index = process.argv[2] || 'groups';

const PORT = process.env.npm_package_config_port;

const passport = require('passport')
const bcrypt = require('bcryptjs')
const cookieParser = require('cookie-parser')

const express = require('express')
const session = require('express-session')

const service = require('./ciborg-services')(index)
const gamesApi = require('./ciborg-web-api')(service)

const app = express()

passport.serializeUser((user, done) => done(null, user))
passport.deserializeUser((user, done) => done(null, user))

app.use(cookieParser())
app.use(express.json())
app.use(express.urlencoded({extended: true}))

app.use(session({
    secret: process.env.npm_package_config_secret,
    resave: false,
    saveUninitialized: true
}))

app.use(passport.initialize())
app.use(passport.session())

app.use('/', express.static('./app'))

app.get(`/games/search/:name/:limit`, gamesApi.getByName)
app.get(`/games/popularity/:limit`, gamesApi.getMostPopularGames)

app.post('/register', checkNotAuthenticated, registerClient)
app.post('/login', checkNotAuthenticated, login)
app.use('/logout', checkAuthenticated, logout)

app.get('/gameGroups', checkAuthenticated, gamesApi.getAllGameGroups);
app.post('/create/group/:name/:desc',checkAuthenticated, (req, resp) => {
    gamesApi.createGroup(req,resp)
        .then(() => waitFor(() => resp.end(), 1000))
})
app.post('/edit',checkAuthenticated, (req, resp) => {
    gamesApi.editGroup(req, resp)
        .then(() => waitFor(() => resp.redirect(302, 'auth/GameGroups.html'), 1000))
})
app.put('/group/:groupId/:gameId',checkAuthenticated, gamesApi.insertGameInGroup)
app.get('/group/details/:groupId',checkAuthenticated, gamesApi.getGroupDetails)
app.delete('/delete/group/:id',checkAuthenticated, gamesApi.deleteGroup)
app.delete('/delete/game/:groupId/:gameId',checkAuthenticated, gamesApi.deleteGameFromGroup)

app.listen(PORT, () => console.log(`Server listening on port ${PORT}...`));

///////////////////////////////

async function login(req, resp, done) {
    let user = {
        email: req.body.email,
        password: req.body.password
    }

    gamesApi.authenticateUser(user)
        .then(processUser)
        .catch(err => done(err))

    function processUser(user) {
        if(!user)
            return resp.redirect('/login.html')
        req.logIn({
            username: user
        }, err => resp.redirect('/auth/home.html'))
    }
}

async function registerClient(req, resp){
    try {
        let salt = await bcrypt.genSalt(10)
        let hashedPassword = await bcrypt.hash(req.body.password, salt)

        if(!(await bcrypt.compare(req.body.confirm_pass, hashedPassword))){
            return resp.redirect('register.html')
        }

        let user = {
            name: req.body.name,
            email: req.body.email,
            password: hashedPassword
        }

        if(await gamesApi.registerClient(user))
            resp.redirect('/login.html')
    } catch {
        resp.redirect('/register.html')
    }
}

function logout(req, resp){
    req.logOut()
    resp.redirect('/login.html')
}

function checkAuthenticated(req, resp, next){
    if(req.isAuthenticated())
        return next()
    resp.status(403).end();
}

function checkNotAuthenticated(req, resp, next){
    if(!req.isAuthenticated())
        return next()
    resp.status(403).send("You must logout at '/logout'")
}

function waitFor(next,time){
    setTimeout(next, time)
}