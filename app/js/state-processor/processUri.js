const vge = require('./routeManager')
const routes = require('../router')

let routeManager

window.addEventListener("load", pageload)
window.addEventListener("hashchange", processHashChange)

function processHashChange() {
    if(routeManager == undefined)
        routeManager = vge.init(result)
        
    const DEFAULT_STATE = "home"
    const hash = window.location.hash.substring(1)
    let [state, ...args] = hash.split('/')

    let route = routes[state]

    if(!route) {
        window.location.hash = DEFAULT_STATE
        return
    }

    routeManager.changeArgs(args)

    route
        .controller(args)
        .then(data => route.view(routeManager, data))
        //.catch(() => window.location.href = "../NotAuthenticated.html")
}
