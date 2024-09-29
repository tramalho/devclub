
## Routes
- [GET] /users
- [POST] /user

## Database
1 - Create account in [mongodb](https://cloud.mongodb.com)

2 - Create `.env` file and add database credentials

```.env
DB_URL=mongodb+srv://<db_user>:<db_password>@freemzero.fyo28.mongodb.net/<db_name>?retryWrites=true&w=majority&appName=freeMZero
```
> Note: `DB_URL` **value** present in this doc is only a example. Retrive correct url connection from mongodb and set in DB_URL .env



## To Run
```javascript
node --watch server.js
```

