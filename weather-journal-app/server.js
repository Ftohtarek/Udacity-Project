// Setup empty JS object to act as endpoint for all routes
let projectData = {};

// Require Express to run server and routes
const express = require('express');
// Start up an instance of app
const app = express();
/* Middleware*/
const bodyParser = require('body-parser')
//Here we are configuring express to use body-parser as middle-ware.
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Cors for cross origin allowance
const cors = require('cors')
app.use(cors())

// Initialize the main project folder
app.use(express.static('website'));
app.use(express.static('node_modules'));

// Setup Server
const host = 8000;
app.listen(host, () => {
    console.log('app is listing on host : ', host);
})

// routing

app.get('/retrive', (req, res) => {
    res.send(projectData)
})
app.post('/add', checkRequest)

function checkRequest(req, res) {
    let { body } = req
    console.log('posted Data');
    console.log(body);
    if (!body.temperature) {
        res.send({ isPosted: false });
        console.log('inValid');
        return 0
    }
    res.send({ isPosted: true })
    addData(body)
}
function addData(req) {
    projectData = {
        temperature: req.temperature,
        date: req.date,
        userResponse: req.userResponse
    }
}

