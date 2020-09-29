let spiritgame = {
    id: "kPDxpJZ8PD",
    name: "Spirit Island",
    year_published: 2016,
    min_players: 1,
    max_players: 4,
    min_playtime: 90,
    max_playtime: 120,
    min_age: 13,
    description_preview: "Powerful Spirits have existed on this isolated island..."
}

let catangame = {
    id: "OIXt3DmJU0",
    name: "Catan",
    year_published: 1995,
    min_players: 3,
    max_players: 4,
    min_playtime: 45,
    max_playtime: 90,
    min_age: 10,
    description_preview: "The women and men of your expedition build ..."
}

function getByName(name, limit) {
    let resp = {}
    if (name === catangame.name.toLowerCase() || name === spiritgame.name) {
        resp.status = 200
        resp.body = JSON.stringify(games[name])
    } else {
        resp.status = 400
        resp.body = JSON.stringify({
            "error": "The request query string is invalid",
            "uri": "/games/?InvalidQueryString",
        })
    }

    return resp
}

function getMostPopularGames(req, resp) {
}

function postGameGroup(req, resp) {
}

function updateGameGroup(req, resp) {
}

function getAllGroups(req, resp) {
}

function addGameToGroup(req, resp) {
}

function deleteGameFromGroup(req, resp) {
}

function getGameGroupDetails(req, resp) {
}

function getGamesBetweenTimes(req, resp) {
}

let games = {
    spirit: spiritgame,
    catan: catangame
}

module.exports = {
    getByName: getByName,
    getMostPopularGames: getMostPopularGames,
    postGameGroup: postGameGroup,
    updateGameGroup: updateGameGroup,
    getAllGroups: getAllGroups,
    addGameToGroup: addGameToGroup,
    deleteGameFromGroup: deleteGameFromGroup,
    getGameGroupDetails: getGameGroupDetails,
    getGamesBetweenTimes: getGamesBetweenTimes
}
