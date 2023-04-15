const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const fetch = require('node-fetch');


const app = express();
const PORT = process.env.PORT || 8000;

app.use(express.static('public'));



app.use(express.urlencoded({extended: false}));
app.use(express.json());
app.use(cors());



app.get("/get/:id", async(req,res) => {

    const teamID = req.params.id;

    const data = {}

    const teamHistoryData = await fetch(`https://fantasy.premierleague.com/api/entry/${teamID}/history/`);
    const response = await teamHistoryData.json();

    data["teamHistoryData"] = response;

    const gameWeekData = []

    

    for(let i=1;i<=response["current"].length; i++){
        let weekData = await fetch(`https://fantasy.premierleague.com/api/entry/${teamID}/event/${i}/picks/`);
        let responseData = await weekData.json();
        gameWeekData.push(responseData);
    }
    
    data["weeklyData"] = gameWeekData

    res.send(data)
})

app.listen(8000, () => {
    console.log(`Server Started at ${PORT}`)
})


