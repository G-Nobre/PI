const sucess = 200
const created = 201
const notfound = 404
const timeout = 504

function invalidPath(resp, path){
    let error = {error: "Resource not found", uri: path}
    let json = JSON.stringify(error)

    resp.writeHead(notfound, {"Content-type": "text/json"});
    resp.end(json)
}

function gatewayTimeOut() {
    return {
        "status": timeout,
        "error": "Gateway Timeout: Could not get any response"
    }
}

function badRequest() {
    return {
        "error" : "The request query string is invalid",
        "uri" : "e.g: /group/?InvalidQueryString"
    }
}

function sucessStatusCode(response){
    return response.status === sucess || response.status === created
}

module.exports = {
    verifySucess : sucessStatusCode,
    invalidPath: invalidPath,
    gatewayTimeOut: gatewayTimeOut,
    badRequest: badRequest
}