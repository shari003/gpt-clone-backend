require('dotenv').config();
const express = require('express');
const cors = require('cors');
const fetch = require("node-fetch");

const app = express();

const PORT = 3000 ?? process.env.PORT;


const API_KEY = process.env.GPT_API_KEY;
const POST_URL = process.env.POST_URL;

// MIDDLEWARES
app.use(express.urlencoded({extended: true}));
app.use(express.json());
app.use(cors());

// ROUTES

app.post("/completions", async(req, res) => {

    const {message} = req.body;

    const options = {
        method: "POST",
        headers: {
            Authorization: `Bearer ${API_KEY}`,
            "Content-Type": 'application/json'
        },
        body: JSON.stringify({
            model: 'gpt-3.5-turbo',
            messages: [{
                role: 'user',
                content: message
            }],
        })
    }

    try{
        const response = await fetch(POST_URL, options);
        const data = await response.json();

        res.status(200).json({
            success: true,
            data: data
        })

    }catch(e){
        console.log(e);
    }
})


app.use("*", (req, res) => {
    res.status(200).json({
        success: true,
        message: "Hello, Welcome to ConvoBOT"
    })
});

app.listen(PORT, console.log("Server started at PORT: " + PORT));