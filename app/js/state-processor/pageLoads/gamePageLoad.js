let result;

function pageload(){
    result = document.querySelector('#result')
    
    document.querySelector('#btnGameSearch')
                .addEventListener("click", gameSeachClick)

    function gameSeachClick(){
        let game = document.querySelector("#GameName").value
        let limit = document.querySelector("#GameLimit").value

        window.location.hash = `games/${game}/${limit}`
    }
}