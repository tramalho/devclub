import express from 'express';

const app = express();
app.use(express.json());

const users = []

app.get('/users', (req, res) => {    
    res.status(200).json(users);
});

app.post('/user', (req, res) => {
users.push(req.body);
res.sendStatus(201);
});

app.listen(3333);
