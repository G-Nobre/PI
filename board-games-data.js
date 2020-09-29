const errorHandler = require('./error-handler');
const url = 'http://www.boardgameatlas.com/api/'
const request = require('request')

const clientId = 'E1Z5Ye5WzX'
let resp = {}

module.exports = {
    getByName: getByName,
    getMostPopularGames: getMostPopularGames,
    getGameById:getGameById,
    getDetailsById:getDetailsById
}


function getByName(name, limit) {
    let finalUrl = url + `search?name=${name}&limit=${limit}&client_id=${clientId}`
    return makeRequest(finalUrl)
}

function getDetailsById(id) {
    let finalUrl = `${url}search?ids=${id}&client_id=${clientId}`
    return makeRequest(finalUrl)
}

function getGameById(id) {
    let finalUrl = `${url}search?ids=${id}&client_id=${clientId}`
    return makeRequest(finalUrl)
}

function getMostPopularGames(limit) {
    let finalUrl = url + `search?orderby=popularity&limit=${limit}&client_id=${clientId}`
    return makeRequest(finalUrl)
}

function makeRequest(finalUrl) {
    return new Promise((resolve, reject) => {
            request(finalUrl, (err, response, body) => {
            if(err) {
                reject(errorHandler.gatewayTimeOut())
            }
            resp.status = response.statusCode
            resp.body = getFilteredBody(body)
            resolve(resp)
        })
    })
}

function getFilteredBody(body) {
    let jsonedBody = JSON.parse(body)

    let filteredBody = { games: [] }
    
    for (let i = 0; i < jsonedBody.games.length; i++) {
        let game = {}
        game.name = jsonedBody.games[i].name
        game.id = jsonedBody.games[i].id
        game.year_published = jsonedBody.games[i].year_published
        game.min_players = jsonedBody.games[i].min_players
        game.max_players = jsonedBody.games[i].max_players
        game.min_playtime = jsonedBody.games[i].min_playtime
        game.max_playtime = jsonedBody.games[i].max_playtime
        game.min_age = jsonedBody.games[i].min_age
        game.description = jsonedBody.games[i].description_preview
        filteredBody.games[i] = game
    }
    return filteredBody
}
