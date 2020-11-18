import * as express from 'express';
const app = express();

app.listen(9001, () => {
    console.log("App is running on PORT:: 9001")
})

app.get('/', (request, response) => {
    response.send('HMW - Backend');
});
