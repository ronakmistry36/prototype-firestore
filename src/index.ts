import * as express from 'express';
import * as firebaseAdmin from 'firebase-admin';
import {UserRepository} from "./repository/user/UserRepository";

const app = express();

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
