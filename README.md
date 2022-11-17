## Pre-requisite

1. A running PostgreSQL Server
2. An empty DB on the PostgreSQL
3. `node` and `npm` installed
4. Postman or cURL (for testing the API)
5. A free `8080` PORT (you may change the port in `server.js`)

## Installation

1. Clone the repo

2. Install the dependencies

```bash
npm install
```

## Configuration

You will have to update some values in `.env`

| key      | description                                                                                                      |
| -------- | ---------------------------------------------------------------------------------------------------------------- |
| HOST     | your host address on which postgreSQL is installed. Most probably `localhost`                                    |
| USER     | Username of the postgreSQL User (default: `postgres`)                                                            |
| PASSWORD | Password to the PostgreSQL User. You might have to set this via `\password username` command of PostgreSQL Shell |
| DB       | The DB Name of the empty DB you created in the second step of Pre-requisites                                     |

## Let's Go

```bash
npm start
```
