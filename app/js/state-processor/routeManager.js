

function RouteManager(result) {
    this.args = null,
    this.result = result,
    this.setMainContent = (html) => {
        result.innerHTML = html
    },
    this.changeRoute = (hash) => {
        window.location.hash = hash
    },
    this.changeArgs= (args)=>{
        this.args = args
    }
}

module.exports = {
    init: (result) => new RouteManager(result)
}
