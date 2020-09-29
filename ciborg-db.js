let request = require('request');
let bcrypt = require('bcryptjs');
let errorHandler = require('./error-handler');

let address = process.env.npm_package_config_address
let port = 9200;

let url = `http://${address}:${port}`;

module.exports = function (index) {
    request(url + `/users`, (err, resp) => {
        if (err) 
            return errorHandler.gatewayTimeOut()
        
        if (resp.statusCode === 404) 
            request.put(url + `/users`)
    })

    return {
        registerUser: registerUser,
        findUser: findUser,
        getGameGroupsFromUser: getGameGroupsFromUser,
        createGroup: createGroup,
        deleteGroup: deleteGroup,
        editGroup: editGroup,
        insertGameInGroup:insertGameInGroup,
        getGroupDetails:getGroupDetails,
        deleteGameFromGroup:deleteGameFromGroup
    }
};

function registerUser(user) {
    return new Promise((resolve, reject) => {
        findUser(user, ["email"])
            .then(processResultFromDB)
            .catch(() => reject)

        function processResultFromDB(found){
            return !found? insertUser() : reject()
        }

        function insertUser(){
            let options = {
                url: `${url}/users/_doc`,
                body: user,
                json: true
            }

            request.post(options, (err, resp, body) => {
                return err ? reject(false) : resolve(true)
            })
        }
    })
}

function findUser(user, args){
    let body = {query: {match_all: {}}}

    let options = {
        url: `${url}/users/_doc/_search`,
        body: body,
        json: true
    }

    return new Promise((resolve, reject) => {
        request(options, (err, resp, body) => {
            if(err) return reject(err)
            
            let users = body.hits.hits
            return resolve(tryGetUser())

            function tryGetUser(){
                let hit = users.find(checkElem)

                function checkElem(elem) {
                    for(let i = 0; i<args.length;++i){
                        if(args[i] === "password"){
                            if(!bcrypt.compareSync(user[args[i]], elem["_source"][args[i]]))
                                return false
                        }
                        else if(user[args[i]] != elem["_source"][args[i]])
                            return false
                    }
                    return true
                }

                let toRet = undefined

                if(hit != undefined) {
                    toRet = {}
                    let info = hit["_source"]
                    toRet.name = info.name
                    toRet.email = info.email
                    toRet.password = info.password
                    toRet.id = hit["_id"]
                    createUserIndex()
                }

                function createUserIndex(){
                    request(`${url}/${toRet.email}`, (err, resp) => {
                        if (resp.statusCode === 404){
                            request.put(url + `/${toRet.email}`)
                        }
                    })
                }

                return toRet
            }
        })
    })
}

function getGameGroupsFromUser(email){
    let body = {query: {match_all: {}}}

    let options = {
        url: `${url}/${email}/_doc/_search`,
        body: body,
        json: true
    }

    return new Promise((resolve,reject) => {
        request(options, (err,resp,body) => {
            if(err) return reject(err)
            
            let groups = body.hits.hits.map(getAllGroups)
            return resolve( { body:groups, status:200 } )
        })

        function getAllGroups(group){
            return {
                name:group['_source'].name,
                description:group['_source'].desc,
                id:group['_id']
            }
        }
    })
}

function insertGameInGroup(groupId,game,email){
    return getGroupDetails(groupId,email).then((group)=>{
        if(group.body.games.find(g => g.name === game.name) != undefined)
            return Promise.resolve({body: group.body, status: 200})
        group.body.games.push(game)
        let uri = `${url}/${email}/_doc/${groupId}`

        let options = {
            body:group.body,
            url:uri,
            json:true
        }
        
        return new Promise((resolve,reject) => {
            request.put(options, (err,resp,body) => 
                err ? reject(err): resolve({body, status: 200}))
        })
    })
}

function createGroup(name, desc, email){
    let body = { name, desc, games:[] }

    let options = {
        headers: {'content-type': 'application/json'},
        url: `${url}/${email}/_doc`,
        body: JSON.stringify(body)
    }

    return new Promise((resolve, reject) => {
        request.post(options, (error, response, body) => {
            return error ? reject(error) : resolve()
        })
    })
}

function editGroup(info, groupDetails, email){
    groupDetails.body.name = info.name
    groupDetails.body.desc = info.desc
    
    return new Promise((resolve,reject) => {
        let options = {
            uri: `${url}/${email}/_doc/${info.groupId}`,
            body: groupDetails.body,
            json: true
        }

        request.put(options,(err,resp,body) => 
            err ? reject(err) : resolve(body)
        )
    })
}


function deleteGroup(groupID, email){
    let uri = `${url}/${email}/_doc/${groupID}`

    return new Promise((resolve, reject) => {
        request.delete(uri, (err, resp, body) => {
            if(err) return Promise.reject(err)
            resolve(getGameGroupsFromUser(email))
        })
    })
}

function getGroupDetails(groupId,email){
    let body = {query: {match_all: {}}}

    let options = {
        uri: `${url}/${email}/_doc/${groupId}`,
        body: body,
        json: true
    }

    return new Promise((resolve,reject)=>{
        request(options, (err,resp,body)=> {
            if(err)return reject(err)
            return resolve({body: body['_source'], status: 200})
        })
    })

}

function deleteGameFromGroup(groupId,groupDetails,gameId,email){
    groupDetails.body.games = groupDetails.body.games.filter((game) => game.id !== gameId)
    return new Promise((resolve,reject) => {
        let options = {
            uri: `${url}/${email}/_doc/${groupId}`,
            body: groupDetails.body,
            json: true
        }
        request.put(options,(err,resp,body)=> err ? reject(err) : resolve())
    })
}