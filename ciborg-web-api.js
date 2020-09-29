let service;

module.exports = (serv) => {
    service = serv;

    {
        Promise.prototype.processResponse = processResponse
    }

    return {
        getByName: getByName,
        getMostPopularGames: getMostPopularGames,
        registerClient: registerClient,
        authenticateUser: authenthicateUser,
        getAllGameGroups: getAllGameGroups,
        createGroup: createGroup,
        deleteGroup: deleteGroup,
        insertGameInGroup:insertGameInGroup,
        getGroupDetails:getGroupDetails,
        deleteGameFromGroup:deleteGameFromGroup,
        editGroup:editGroup
    }
}

function getByName(req, resp) {
    let name = req.params.name
    let limit = req.params.limit

    service.getByName(name, limit).processResponse(resp)
}

function getMostPopularGames(req, resp) {
    let limit = req.params.limit
    service.getMostPopularGames(limit).processResponse(resp)
}

function registerClient(user) {
    return service.register(user);
}

function authenthicateUser(user) {
    return service.authenthicateUser(user)
}

function getAllGameGroups(req, resp){
    return service.getAllGameGroups(req.user.username).processResponse(resp)
}

function createGroup(req, resp){
    let name = req.params.name
    let desc = req.params.desc
    let email = req.user.username.email
    return service.createGroup(name, desc, email)
}

function editGroup(req, resp){
    let groupId = req.body.groupId
    let name = req.body.name
    let desc = req.body.desc
    let email = req.user.username.email

    return service.editGroup({name, desc, groupId}, email)
}

function deleteGroup(req, resp){
    let groupID = req.params.id
    let email = req.user.username.email
    service.deleteGroup(groupID, email).processResponse(resp)
}

function insertGameInGroup(req, resp){
    let groupId = req.params.groupId
    let gameId = req.params.gameId
    let email = req.user.username.email
    service.insertGameInGroup(groupId,gameId,email).processResponse(resp)
}

function getGroupDetails(req,resp){
    let groupID = req.params.groupId
    let email = req.user.username.email
    
    service.getGroupDetails(groupID,email).processResponse(resp)
}

function deleteGameFromGroup(req,resp){
    let groupId = req.params.groupId
    let gameId = req.params.gameId
    let email = req.user.username.email
    service.deleteGameFromGroup(groupId,gameId,email).processResponse(resp)
}

function processResponse(resp) {
    this
        .then((res) => answer(resp, res))
        .catch((res) => error(resp, res))
}

function error(resp, res) {
    resp.writeHead(res.status, {"Content-type": "application/json"});
    resp.end(JSON.stringify(res))
}

function answer(resp, result) {
    resp.writeHead(result.status, {"Content-type": "application/json"});
    resp.end(JSON.stringify(result.body))
}
