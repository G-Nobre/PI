let ciborgDB
const boardGamesDB = require('./board-games-data')

module.exports = function(index) {
    ciborgDB = require('./ciborg-db')(index)
    
    return {
        getByName: getByName,
        getMostPopularGames: getMostPopularGames,
        register: register,
        authenthicateUser: authenthicateUser,
        getAllGameGroups:getAllGameGroups,
        createGroup: createGroup,
        deleteGroup: deleteGroup,
        insertGameInGroup:insertGameInGroup,
        getGroupDetails:getGroupDetails,
        deleteGameFromGroup:deleteGameFromGroup,
        editGroup:editGroup
    }
}

function getByName(name, limit) {
    return boardGamesDB.getByName(name, limit)
}

function getMostPopularGames(limit) {
    return boardGamesDB.getMostPopularGames(limit)
}

function register(user){
    return ciborgDB.registerUser(user)
}

function authenthicateUser(user){
    return ciborgDB.findUser(user, ["email","password"])
}

function getAllGameGroups(user){
    return ciborgDB.getGameGroupsFromUser(user.email)
}

function deleteGroup(groupID, email){
    return ciborgDB
                .deleteGroup(groupID, email)
                .then(filterGroups)

    function filterGroups(res){
        res.body = res.body.filter(group => group.id !== groupID)
        return res
    }
}

function createGroup(name, desc, email){
    return ciborgDB.createGroup(name, desc, email)
}

function editGroup(info, email){
    return ciborgDB.getGroupDetails(info.groupId,email)
        .then((groupDetails) => ciborgDB.editGroup(info, groupDetails, email))
}

function insertGameInGroup(groupId,gameId,email){
    return boardGamesDB.getDetailsById(gameId).then((game)=>{
        return ciborgDB.insertGameInGroup(groupId,game.body.games[0],email)
    })
}

function deleteGameFromGroup(groupId, gameId, email){
    return ciborgDB.getGroupDetails(groupId,email)
        .then((groupDetails)=> ciborgDB.deleteGameFromGroup(groupId,groupDetails,gameId,email))
        .then(() => ciborgDB.getGroupDetails(groupId,email))
}

function getGroupDetails(groupId,email){
    return ciborgDB.getGroupDetails(groupId,email)
}
