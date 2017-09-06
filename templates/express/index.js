const Promise = require('bluebird');
global.Promise = Promise;

const express = require('express');
const bodyParser = require('body-parser');

const port = process.env.PORT || 3000;
const app = express();
app.use(bodyParser.json());

app.get('/', (req, res) => {
    return res.send('Running');
});

app.listen(port, (err) => {
    if (err) throw err;
    console.log(`> Ready on http://localhost:${port}`);
});
