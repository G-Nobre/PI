const Handlebars = require('handlebars/dist/handlebars')

module.exports = {
    gamesTemplate: Handlebars.compile(require('./templates/games.hbs').default),
    gameDetailsTemplate: Handlebars.compile(require('./templates/gameDetails.hbs').default),
    gameGroupsTemplate: Handlebars.compile(require('./templates/gameGroups.hbs').default),
    groupChoiceTemplate: Handlebars.compile(require('./templates/GroupChoice.hbs').default),
    groupDetailsTemplate: Handlebars.compile(require('./templates/GroupDetails.hbs').default)
}
