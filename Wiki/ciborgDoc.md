# CIBORG API documentation

The base part of the URI path for the bundles API is http://localhost:8080/

# Requirements

In order for this application to work, you need to have installed the following programs.

- Node.js: https://www.nodejs.org/en/download
- Elastic search: https://www.elastic.co/pt/downloads/elasticsearch

# Getting Started

Before running this application, you need to install all npm modules dependencies that this app requires.

In order to do this, just insert the following command in your terminal:

```console
$ npm install
```

Elastic search should be started before running this application!


In order to run this application, just insert the following command in your terminal:

```console
$ npm start
```

The following message should appear on your terminal:

```console
Server listening on port 8080...
```

The following sections describe each API endpoint.

## Obtain a Game
```http
GET /games/search/:name/:limit
```
- Request:
    - Path parameters:
        - name - the name of the game to search
        - limit - show certain number of games
    - Body: none
- Response:
    - Success: 
        - Status code: 200
        - Content-Type: application/json
        - Body example:   
        ```json 
        {
            "games": [
            {
                "id": "OIXt3DmJU0",
                "name": "Catan",
                "year_published": 1995,
                "min_players": 3,
                "max_players": 4,
                "min_playtime": 45,
                "max_playtime": 90,
                "min_age": 10,
                "description": "The women and men of your expedition build ..."
            }
        }
        ```

## Get Most Popular Games
```http
GET /games/popularity/:limit
```

- Request:
    - Path parameters:
        - limit - show certain number of games
    - Body: none
- Response:
    - Success: 
        - Status code: 200
        - Content-Type: application/json
        - Body example:   
        ```json 
        {
            "games": [
            {
                "id": "kPDxpJZ8PD",
                "name": "Spirit Island",
                "year_published": 2016,
                "min_players": 1,
                "max_players": 4,
                "min_playtime": 90,
                "max_playtime": 120,
                "min_age": 13,
                "description": "Powerful Spirits have existed on this isolated island..."
            },
            {
                "id": "RLlDWHh7hR",
                "name": "Gloomhaven",
                "year_published": 2017,
                "min_players": 1,
                "max_players": 4,
                "min_playtime": 60,
                "max_playtime": 150,
                "min_age": 12,
                "description": "Gloomhaven is a game of Euro-inspired tactical ..."
            }
            ...
        }
        ```
## Create a Game Group
```http
POST /groups/_doc/
```

- Request:
    - Path parameters: none
    - Body: 
    ```json
    {
        "name": "MyGameGroup",
        "description": "This game group is an example for this documentation",
        "games": []
    }
    ```
- Response:
    - Success: 
        - Status code: 201
        - Content-Type: application/json
        - Body example:   
        ```json 
        {
            "_index" : "groups",
            "_id" : "eSzUR24B4aJ_8xkop4cK",
            "result": "created"
        }
        ```

## Update a Game Group
```http
PUT /groups/_doc/:idGroup
```

- Request:
    - Path parameters:
        - idGroup - the identification of the game group
    - Body: 
    ```json
    {
        "name": "MyNewGameGroup",
        "description": "This is a game group and this is an example for its documentation"
        "games": []
    }
    ```
- Response:
    - Success: 
        - Status code: 200
        - Content-Type: application/json
        - Body example:   
        ```json 
        {
            "_index" : "groups",
            "_id" : "eSzUR24B4aJ_8xkop4cK",
            "result": "updated"
        }
        ```

    - Errors:
        - 400 and 404(see Common Error Handing section)

## List all Game Groups
```http
GET /groups/_doc/_search
```

- Request:
    - Body: 
    ```json
    {
	    "query":{
            "match_all":{
            }
        }
	}
    ```
}
- Response:
    - Success: 
        - Status code: 200
        - Content-Type: application/json
        - Body example:   
        ```json 
        {
            "groups": [
                {
                    "name": "MyNewGameGroup",
                    "description": "This is a nice game group and this is an example for its documentation"
                },
                {
                    "name": "OtherGameGroup",
                    "description": "This is another game group documentation"
                },
                ...
            ]
            
        }
        ```
    - Errors:
        - 400 and 404(see Common Error Handing section)

## Add a Game to a Group
```http
PUT /groups/game/:idGroup/:idGame
```

- Request:
    - Path parameters:
        - idGroup - The identifier of the group
        - idGame - The identifier of the game to add
    - Body: none
- Response:
    - Success: 
        - Status code: 201
        - Content-Type: application/json
        - Body example:   
        ```json 
        {
            {
                "index": "groups",
                "id": "Ok4tS24Bbl-uw9fMdZpo",
                "result": "updated"
            }
        }
        ```

    - Errors:
        - 404(see Common Error Handing section)

## Remove a Game in a Group
```http
DELETE /groups/_doc/:idGroup/:idGame
```

- Request:
    - Path parameters:
        - idGroup - The identifier of the group
        - idGame - The identifier of the game in the group
    - Body: none
- Response:
    - Success: 
        - Status code: 201
        - Content-Type: application/json
        - Body example:   
        ```json 
        {
            "_index" : "groups",
            "_id" : "eSzUR24B4aJ_8xkop4cK",
            "result": "updated"
        }
        ```

    - Errors:
        - 404(see Common Error Handing section)

## Obtain a Game Group Details
```http
GET /groups/_doc/:idGroup
```
- Request:
    - Path parameters:
        - idGroup - the identifier of the game group
    - Body: none
- Response:
    - Success: 
        - Status code: 200
        - Content-Type: application/json
        - Body example:   
        ```json 
        {
            "groups": 
            {
                "name": "MyNewGameGroup",
                "description": "This is a nice game group and this is an example for its documentation",
                "games": [
                    {
                        "name": "Spirit Island",
                        "year_published": 2016,
                        "min_players": 1,
                        "max_players": 4,
                        "min_playtime": 90,
                        "max_playtime": 120,
                        "min_age": 13,
                        "description": "Powerful Spirits have existed on this isolated island ..."
                    },
                    {
                        "name": "Eat Poop You Cat",
                        "year_published": 1984,
                        "min_players": 3,
                        "max_players": 99,
                        "min_playtime": 20,
                        "max_playtime": 20,
                        "min_age": 0,
                        "description": " Each player starts with a piece of paper and a pencil. At the top ..."
                    },
                    ...
                ]
            }
        }
        ```

## Obtain games between a timeline in a group
```http
GET /groups/:idGroup/:mintime/:maxtime
```
- Request:
    - Path parameters:
        - idGroup - the identification of the game group
        - mintime - minimum playtime of the game
        - maxtime - maximum playtime of the game
    - Body: none
- Response:
    - Success: 
        - Status code: 200
        - Content-Type: application/json
        - Body example:   
        ```json 
        {
            "group": 
            {
                "name": "MyNewGameGroup",
                "description": "This is a nice game group and this is an example for its documentation",
                "games": [
                    {
                        "name": "Spirit Island",
                        "year_published": 2016,
                        "min_players": 1,
                        "max_players": 4,
                        "min_playtime": 90,
                        "max_playtime": 120,
                        "min_age": 13,
                        "description": "Powerful Spirits have existed on this isolated island ..."
                    },
                    {
                        "name": "Eat Poop You Cat",
                        "year_published": 1984,
                        "min_players": 3,
                        "max_players": 99,
                        "min_playtime": 20,
                        "max_playtime": 20,
                        "min_age": 0,
                        "description": " Each player starts with a piece of paper and a pencil. At the top ..."
                    },
                    ...
                ]
            }
        }
        ```
    - Errors:
        - 404(see Common Error Handing section)
        
## Common Error Handling

This section describes the error handling that is done in every endpoint that produces these erros. This is presented in a separate section to avoid repeating these descriptions wherever it applies.

Every error response has an `application/json` body with the content described for each error.

### 400 - Bad request

Every time the request contains a URI with and invalid QueryString or a Body with invalid Json content for that specific request, the response has a 400 status code with the following sample body:

- Body:

  ```json
      {
        "error": "The request query string is invalid",
        "uri": "/games/?InvalidQueryString"
      }
  ```

### 404 - Not found

Every time the request contains a URI for a resource not managed by the API, the response has a 404 status code with the following sample body.

- Body:

  ```json
      {
        "error": "Resource not found",
        "uri": "/games/notfoundresource"
      }
  ```
