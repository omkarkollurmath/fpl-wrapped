const express = require('express');
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

    const teamHistoryData = await fetch(`https://fantasy.premierleague.com/api/entry/${teamID}/history/`)
                                  .then(response => {
                                    if(!response.ok){
                                        throw new Error('No record found');
                                    }
                                    return response.json();
                                  })
                                  .then(data => data)
                                  .catch(error => {
                                    res.status(404).send(error);
                                    return;
                                  })
    
    if(teamHistoryData !== undefined){

        const response = teamHistoryData;

        data["teamHistoryData"] = response;

        

        const gameWeekData = []

        for(let i=1;i<=response["current"].length; i++){
            let weekData = await fetch(`https://fantasy.premierleague.com/api/entry/${teamID}/event/${i}/picks/`);
            let responseData = await weekData.json();
            gameWeekData.push(responseData);
        }
        
        data["weeklyData"] = gameWeekData

        res.send(data)
    }
})

app.listen(8000, () => {
    console.log(`Server Started at ${PORT}`)
})

