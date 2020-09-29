const expect = require('chai').expect
const request = require('request')
const index = 'test'
const ciborgServices = require('../ciborg-services')(index)

let spiritIslandID = 'kPDxpJZ8PD';
let gloomhavenID = 'RLlDWHh7hR';

describe('Ciborg-server testing...', function() {
    let groupID;

    it('should return 5 games', async function() {
        let game = 'Catan'
        let limit = 5

        const res = await ciborgServices.getByName(game, limit)
        let games = res.body.games

        expect(res.status).to.be.equal(200)
        expect(games.length).to.be.equal(5)
        expect(games[0].name).to.include(game)
        expect(games[1].name).to.include(game)
    })

    it('should return 10 most popular games', async function() {
        let limit = 10
        const res = await ciborgServices.getMostPopularGames(10)
        let games = res.body.games

        expect(res.status).to.be.equal(200)
        expect(games.length).to.be.equal(limit)
        expect(games[0].name).to.be.equal('Spirit Island')
        expect(games[0].min_age).to.be.equal(13)
    })


    it(`should create a new group on '${index}' index`, function(done) {
        let gameBody = {
            name: "GameGroup",
            description: "This is my game group",
            games: []
        }

        let body = JSON.stringify(gameBody)
        
        ciborgServices.postGameGroup(body)
            .then(processSucess)
            .finally(done)

            function processSucess(res) {
                let jsonData = res.body
                expect(res.status).to.be.equal(201)
                expect(jsonData.index).to.be.equal(`${index}`)
                expect(jsonData.result).to.be.equal('created')
                groupID = jsonData.id
            }
    })

    it(`should update name of the group`, async function() {
        let gameBody = {
            name: "MyGameGroup",
            description: "This is my game group",
            games: []
        }

        let body = JSON.stringify(gameBody)
        const res = await ciborgServices.updateGameGroup(groupID,body)
        let jsonData = res.body

        expect(res.status).to.be.equal(200)
        expect(jsonData.id).to.be.equal(groupID)
        expect(jsonData.result).to.be.equal('updated')
    })

    it('should insert 2 games into a group', function(done) {
        ciborgServices.addGameToGroup(groupID, spiritIslandID)
            .then(processSucess)
            .then(insert2ndgame)
            .finally(done)

        function insert2ndgame() {
            ciborgServices.addGameToGroup(groupID, gloomhavenID)
            .then(processSucess)
            .then(insertRepeatedGame)
        }

        function insertRepeatedGame() {
            ciborgServices.addGameToGroup(groupID, gloomhavenID)
            .then(processGameAlreadyExists)
        }

        function processSucess(res){
            let jsonData = res.body
            expect(res.status).to.be.equal(200)
            expect(jsonData.result).to.be.equal('updated')
        }

        function processGameAlreadyExists(res){
            let jsonData = res.body

            expect(res.status).to.be.equal(200)
            expect(jsonData.response).to.be.equal(`${gloomhavenID} already exists in ${groupID}`)
        }
    })
    
    it('should get 2 games from group', function() {
        setTimeout(async () => {
            const res = await ciborgServices.getGameGroupDetails(groupID)
            let jsonData = res.body

            expect(res.status).to.be.equal(200)
            expect(jsonData.name).to.be.equal('MyGameGroup')
            expect(jsonData.games.length).to.be.equal(2)
        }, 1100)
    })

    it('should delete spirit game from group', async function() {
        setTimeout(async () => {
            const res = await ciborgServices.deleteGameFromGroup(groupID, spiritIslandID)
            let jsonData = res.body

            expect(res.status).to.be.equal(200);
            expect(jsonData.result).to.be.equal('updated');
        }, 1200)
    })

    it('should get only get 1 game from group', function() {
        setTimeout(async () => {
            const res = await ciborgServices.getGameGroupDetails(groupID)
            let jsonData = res.body

            expect(res.status).to.be.equal(200)
            expect(jsonData.name).to.be.equal('MyGameGroup')
            expect(jsonData.games.length).to.be.equal(1)
        }, 1400)
    })

    it('should get 1 game between 60 and 160 playtime', async function () {
        setTimeout(async () => {
            const res = await ciborgServices.getGamesBetweenTimes(groupID, 60, 160)
            let jsonData = res.body

            expect(res.status).to.be.equal(200)
            expect(jsonData.games.length).to.be.equal(1)
            expect(jsonData.games[0].id).to.be.equal(gloomhavenID)

            let url = `http://localhost:9200/${index}`
            request.delete(url,processDelete)
        
            function processDelete(err, resp, body) {
                let jsonData = JSON.parse(body)
                expect(err).to.be.null;
                expect(resp.statusCode).to.be.equal(200)
                expect(jsonData.acknowledged).to.be.equal(true)
            }
        }, 1500)
    })

})
