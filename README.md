
## Setup

### Database
1 - Create account in [mongodb](https://cloud.mongodb.com)

2 - Create `.env` file and add database credentials

```.env
DB_URL=mongodb+srv://<db_user>:<db_password>@appName.fyo28.mongodb.net/<db_name>?retryWrites=true&w=majority&appName=appName
```
> Note: `DB_URL` **value** present in this document is just an example. Retrieve the correct mongodb connection url and set it in `DB_URL` .env

### Session Token
1 - Create a JWT_SECRET_KEY in `.env` file

> Note: See an implementation example in the [article](https://dev.to/tkirwa/generate-a-random-jwt-secret-key-39j4)

### Code Style
Use biomejs lib, see more [here](https://biomejs.dev/guides/getting-started/)

## Run
```javascript
node --env-file=.env --watch server.js
```

## Routes
- [GET] /users
- [GET] /users By (query params)
- [POST] /user
- [PUT] /user:id
- [DELETE] /user:id

- [POST] /login
