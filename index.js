const prettyjson = require('prettyjson');
const express = require('express');

const options = {
    noColor: true
};

// create an express app and configure it with boadyParser middleware
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Test our server on the browser
app.get('/', (req,res)=>res.send({message:'The server is running'}));

// create our webhook endpoint to recive webhooks from Safaricom
app.post('/dashboard', (req, res) => {
    console.log('-----------Received M-Pesa webhook-----------');

    // format and dump the request payload recieved from safaricom in the terminal
    console.log(prettyjson.render(req.body, options));
    console.log('-----------------------');

    let message = {
        "ResponseCode": "00000000",
        "ResponseDesc": "success"
    };

    // respond to safaricom servers with a success message
    res.json(message);
});

const port = process.env.PORT || 5000

app.listen(port, () => {
    
    console.log(`server listening on port ${port}`);
});
