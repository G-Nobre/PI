const data = require('../model/ciborgApiUris')

module.exports = {
    getGames: function(args){
        let game = args[0]
        let limit = args[1]

        return data.getGames(game,limit).then(games => {return {data:games,game:game,limit:limit}})
    },
    getGameDetails: function(args){
        let name = args[0]
        return data.getGames(name, 1)
    },
    getPopularGames: function(args){
        let limit = args[0]

        return data.getPopularGames(limit)
    },
    getGameGroups: function(){
        return data.getGameGroups()
    },
    createGameGroup: function(args){
        let name = document.querySelector("#GroupName").value
        let desc = document.querySelector("#GroupDesc").value

        return data.createGroup(name, desc)
    },
    editGameGroup: function(args){
        let name = document.querySelector("#GroupName").value
        let desc = document.querySelector("#GroupDesc").value

        return data.editGroup(name, desc)
    },
    deleteGroup: function(args){
        let groupID = args[0]

        return data.deleteGroup(groupID)
    },
    insertGameInGroup: function(args){
        let groupId = args[0]
        let gameId = args[1]
        
        return data.insertGameInGroup(groupId,gameId)
    },
    getGroupDetails:function(args){
        let groupID = args[0]

        return data.getGroupDetails(groupID)
    },
    deleteGameFromGroup: function(args){
        let groupId = args[0]
        let gameId = args[1]
        return data.deleteGameFromGroup(groupId, gameId)
    }
}