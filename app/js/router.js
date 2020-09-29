const ctrl = require('./controller/ciborg-controller')
const views = require('./view/views')

module.exports = {
    games: {
        controller: ctrl.getGames,
        view: views.gamesView
    },
    gameDetails: {
        controller: ctrl.getGameDetails,
        view: views.gameDetailsView
    },
    popularGames: {
        controller: ctrl.getPopularGames,
        view: views.popularGamesView
    },
    groups: {
        controller: ctrl.getGameGroups,
        view: views.gameGroupView
    },
    createGroup: {
        controller: ctrl.createGameGroup,
        view: views.createGroupView
    },
    deleteGroup:{
        controller: ctrl.deleteGroup,
        view: views.gameGroupView
    },
    GroupChoice:{
        controller: ctrl.getGameGroups,
        view: views.groupChoiceView
    },
    insertGame:{
        controller: ctrl.insertGameInGroup,
        view: views.createGroupView
    },
    groupDetails:{
        controller: ctrl.getGroupDetails,
        view: views.groupDetailsView
    },
    deleteGame:{
        controller: ctrl.deleteGameFromGroup,
        view: views.groupDetailsView
    },
    editGroup:{
        controller: ctrl.editGroup,
        view: views.groupDetailsView
    },
    edit:{
        controller: ctrl.getGroupDetails,
        view: views.edit
    }
}

function nop() {}
