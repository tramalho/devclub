
## Routes
- [GET] /users
- [POST] /user

## Database
1 - Create account in [mongodb](https://cloud.mongodb.com)

2 - Create `.env` file and add database credentials

```.env
DB_URL=mongodb+srv://<db_user>:<db_password>@appName.fyo28.mongodb.net/<db_name>?retryWrites=true&w=majority&appName=appName
```
> Note: `DB_URL` **value** present in this document is just an example. Retrieve the correct mongodb connection url and set it in `DB_URL` .env

## Run
```javascript
node --env-file=.env --watch server.js
```

## Code Style
Use biomejs lib, see more [here](https://biomejs.dev/guides/getting-started/)

