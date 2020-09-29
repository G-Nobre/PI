const templates = require('./templates')

module.exports = {
    gamesView: gamesView,
    gameDetailsView: gameDetailsView,
    popularGamesView: popularGamesView,
    gameGroupView: gameGroupView,
    createGroupView: createGroupView,
    groupChoiceView: groupChoiceView,
    groupDetailsView: groupDetailsView,
    edit: edit
}

function gamesView(routeManager, response){
    routeManager.setMainContent(templates.gamesTemplate(response.data.games))
}

function popularGamesView(routeManager, response) {
    routeManager.setMainContent(templates.gamesTemplate(response.games))
}

function gameDetailsView(routeManager, response) {
    routeManager.setMainContent(templates.gameDetailsTemplate(response.games[0]))

    document.querySelector("button.addToGroup").addEventListener("click",groupsSelect)

    function groupsSelect(){
        routeManager.changeRoute(`GroupChoice/${this.id}`)
    }
}

function gameGroupView(routeManager, response){
    let button = document.getElementById("btnCreate")
    button.style.display = "block"
    routeManager.setMainContent(templates.gameGroupsTemplate(response))
    
    document
        .querySelectorAll("button.delete")
        .forEach(btn => btn.addEventListener("click", deleteGroup))

    function deleteGroup() {
        routeManager.changeRoute(`deleteGroup/${this.id}`)
    }
}

function createGroupView(routeManager, response){
    window.location.href = '/auth/GameGroups.html'
}

function groupChoiceView(routeManager, response){
    routeManager.setMainContent(templates.groupChoiceTemplate(response))

    document
    .querySelectorAll("button.addToGroup")
    .forEach(btn => btn.addEventListener("click",addToGroup))

    function addToGroup(){
        routeManager.changeRoute(`insertGame/${this.id}/${routeManager.args[0]}`)
    }
}

function groupDetailsView(routeManager, response){
    routeManager.setMainContent(templates.groupDetailsTemplate(response.games))

    let form = document.getElementById("form")
    let btnCreate = document.getElementById("btnCreate")
    let edit = document.getElementById("edit")
    
    //let group = document.getElementById("groupId")

    document.getElementById("title").innerHTML = response.name

    form.style.display = "none"
    btnCreate.style.display = "none"
    
    document
        .querySelectorAll("button.delete")
        .forEach(btn => btn.addEventListener("click",removeGame))

    edit.addEventListener("click", editGroup)

    function removeGame(){
        routeManager.changeRoute(`deleteGame/${routeManager.args[0]}/${this.id}`)
    }

    function editGroup(){
        routeManager.changeRoute(`edit/${routeManager.args[0]}`)
        //group.value = routeManager.args[0]
        //edit.style.display = "none"
        //form.style.display = "block"
    }
}

function edit(routeManager, response){
    routeManager.setMainContent(templates.groupDetailsTemplate(response.games))

    let form = document.getElementById("form")
    let btnCreate = document.getElementById("btnCreate")
    let edit = document.getElementById("edit")
    
    document.getElementById("GroupName").value = response.name
    document.getElementById("GroupDesc").innerHTML = response.desc
    document.getElementById("groupId").value = routeManager.args[0]

    document.getElementById("title").innerHTML = response.name

    edit.style.display = "none"
}
