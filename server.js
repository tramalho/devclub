import express from 'express';

const app = express();
app.use(express.json());

const users = []

// console.log("### process.env ###");
// console.log(process.env.DB_USERNAME);
// console.log(process.env.DB_PASSWORD);
// console.log(process.env.DB_URL);

// const completeUrl = process.env.DB_URL.replace("<DB_USERNAME>", process.env.DB_USERNAME)
// .replace("<DB_PASSWORD>", process.env.DB_PASSWORD).replace("<DB_NAME>", process.env.DB_NAME);

// console.log(`\n ${completeUrl}`);

// console.log("###################");

app.get('/users', (req, res) => {    
    res.status(200).json(users);
});

app.post('/user', (req, res) => {
users.push(req.body);
res.sendStatus(201);
});

app.listen(3333);
