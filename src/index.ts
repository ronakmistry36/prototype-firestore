import * as express from 'express';
import * as bodyParser from "body-parser";
import * as firebaseAdmin from 'firebase-admin';
import {UserRepository} from "./repository/user/UserRepository";
import {UserEntity} from "./entity/UserEntity";
import {response} from "express";

const app = express();
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

const serviceAccount = require('../firestore-key.json');
firebaseAdmin.initializeApp({
    credential: firebaseAdmin.credential.cert(serviceAccount)
});

app.listen(9001, () => {
    console.log("App is running on PORT:: 9001")
})

app.get('/', async (request, response) => {
    const userRepository = new UserRepository();
    const users = await userRepository.findAll();
    response.send(users);
});

app.get('/users/:id', async (request, response) => {
    const userRepository = new UserRepository();
    const user = await userRepository.findById(request.params.id)
    response.send(user);
});

app.post('/users', async (request, response) => {
    const userRepository = new UserRepository();
    const userEntity = request.body as UserEntity;
    await userRepository.save(userEntity);
    response.send("saved");
});

app.delete('/users/:id', async (request, response) => {
    const userRepository = new UserRepository();
    const user = await userRepository.deleteById(request.params.id)
    response.send(user);
});