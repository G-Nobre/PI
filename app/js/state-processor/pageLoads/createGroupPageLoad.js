let result

function pageload(){
    document.querySelector("#btnCreateGroup")
            .addEventListener("click", createGroupClick)

    function createGroupClick(){
        window.location.hash = `createGroup`
    }
}