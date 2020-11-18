import * as express from 'express';
import * as firebaseAdmin from 'firebase-admin';

const app = express();

const serviceAccount = require('../firestore-key.json');


app.listen(9001, () => {
    firebaseAdmin.initializeApp({
        credential: firebaseAdmin.credential.cert(serviceAccount)
    });

    const db = firebaseAdmin.firestore();


    console.log("App is running on PORT:: 9001")
})

app.get('/', (request, response) => {
    response.send('HMW - Backend');
});
