let result

function pageload() {
    result = document.querySelector('#result')
    
    document.querySelector("#btnPopularGameSearch")
            .addEventListener("click", popularGamesClick)

    function popularGamesClick(){
        let limit = document.querySelector("#gameLimit").value
        window.location.hash = `popularGames/${limit}`
    }
}