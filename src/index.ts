import * as express from 'express';
import * as firebaseAdmin from 'firebase-admin';


const app = express();

const serviceAccount = require('../firestore-key.json');
firebaseAdmin.initializeApp({
    credential: firebaseAdmin.credential.cert(serviceAccount)
});
const firestore = firebaseAdmin.firestore();

app.listen(9001, () => {
    console.log("App is running on PORT:: 9001")
})

app.get('/', async (request, response) => {
    const users = await firestore.collection('users').get();
    let payload = [];
    users.forEach((doc) => {
        payload.push(doc.data())
    })
    response.send(payload);
});



/*
* User crud
*
*
*
* */
