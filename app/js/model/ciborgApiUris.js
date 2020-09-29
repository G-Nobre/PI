const apiUris = new CiborgApiUris()

module.exports = {
    getGames: getGames,
    getPopularGames: getPopularGames,
    getGameGroups: getGameGroups,
    createGroup: createGroup,
    deleteGroup:deleteGroup,
    insertGameInGroup:insertGameInGroup,
    getGroupDetails:getGroupDetails,
    deleteGameFromGroup:deleteGameFromGroup,
    editGroup:editGroup
}

function CiborgApiUris() {
    const baseUri = "http://localhost:8080"

    this.getGames = (name,limit) => `${baseUri}/games/search/${name}/${limit}`
    this.getPopularGames = (limit) => `${baseUri}/games/popularity/${limit}`
    this.getGameGroups = () => `${baseUri}/gameGroups`
    this.createGroup = (name, desc) => `${baseUri}/create/group/${name}/${desc}`
    this.deleteGroup = (id) => `${baseUri}/delete/group/${id}`
    this.insertGameInGroup = (groupId,gameId) => `${baseUri}/group/${groupId}/${gameId}`
    this.getGroupDetails = (groupId) => `${baseUri}/group/details/${groupId}`
    this.deleteGameFromGroup = (groupId, gameId) => `${baseUri}/delete/game/${groupId}/${gameId}`
    this.editGroup = (groupId) => `${baseUri}/edit/group/${groupId}/`
}

function getGames(name, limit) {
    let url = apiUris.getGames(name,limit)
    return fetch(url).then(processResponse)
}

function getPopularGames(limit) {
    let url = apiUris.getPopularGames(limit)
    return fetch(url).then(processResponse)
}

function getGameGroups(){
    let url = apiUris.getGameGroups()
    return fetch(url).then(processResponse)
}

function createGroup(name, desc) {
    let url = apiUris.createGroup(name, desc)
    return fetch(url, { method: "POST" } )
}

function deleteGroup(groupID){
    let url = apiUris.deleteGroup(groupID)
    return fetch(url, {method: "DELETE"} ).then(processResponse)
}

function insertGameInGroup(groupId,gameId){
    let url = apiUris.insertGameInGroup(groupId,gameId)
    return fetch(url, {method:"PUT"}).then(processResponse)
}

function editGroup(groupId){
    let url = apiUris.editGroup(groupId)
    return fetch(url, {method:"PUT"}).then(processResponse)
}

function getGroupDetails(groupId){
    let url = apiUris.getGroupDetails(groupId)
    return fetch(url).then(processResponse)
}

function deleteGameFromGroup(groupId,gameId){
    let url = apiUris.deleteGameFromGroup(groupId,gameId)
    return fetch(url, {method:"DELETE"}).then(processResponse)
}
const processResponse = (response) => response.json()
