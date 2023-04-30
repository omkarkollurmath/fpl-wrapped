const express = require('express');
const cors = require('cors');
const fetch = require('node-fetch');

const mongoose = require('mongoose');
const bodyParser = require("body-parser");

const app = express();
const PORT = process.env.PORT || 8000;

app.use(express.static('public'));
app.use(express.urlencoded({extended: false}));
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.json());
app.use(cors());

try {
    // mongoose.connect("mongodb://localhost:27017/fplWrappedDB",{useNewUrlParser: true, useUnifiedTopology: true})
    const options = {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    };
  
  mongoose.connect('mongodb+srv://zingadeaditya24:MWSR5HGatCkIFXfI@cluster0.n3axrs8.mongodb.net/?retryWrites=true&w=majority', options);
}catch(error){
    if(error){
        console.log(error)
        process.exit();
    }else{
        console.log("Connected to DB successfully!!")
    }
}
// mongoose.connect("mongodb://localhost:27017/fplWrappedDB",{useNewUrlParser: true}, err => err ? console.log(err) : console.log("Connected to DB successfully!!"))

const teamSchema = new mongoose.Schema({
    "TeamID" : {type : Number, unique : true},
    "Best_Captain_Pick" : {type : String},
    "Best_Captain_Pick_TeamName" : {type : String},
    "Best_Captain_Pick_GameWeek":{type : Number},
    "Best_Captain_Pick_Points":{type : Number},
    "Most_Captained_Player":{type : String},
    "Most_Captained_Player_Team_Name":{type : String},
    "Frequency_Of_Most_Captained_Player":{type : Number},
    "Best_Week":{type : Object,default: {}},
    "Worst_Week":{type : Object,default: {}},
    "Best_Overall_Rank":{type : Object,default: {}},
    "Worst_Overall_Rank":{type : Object,default: {}},
    "Final_Overall_Rank":{type : Object,default: {}},
    "Top_Goalkeeper_Award":{type : Object,default: {}},
    "Top_Defender_Award": {type : Object,default: {}},
    "Top_Midfielder_Award":{type : Object,default: {}},
    "Top_Forward_Award":{type : Object,default: {}},
    "Most_Valuable_Player":{type : Object,default: {}},
    "Top2_Goalkeepers": {type : Object,default: {}},
    "Top5_Defenders": {type : Object,default: {}},
    "Top5_Midfielders":{type : Object,default: {}},
    "Top3_Forwards" : {type : Object,default: {}},
    "TeamChart" : {type : Object,default: {}},
    "RollingAverage":{type : Object,default: {}}
},{ background: true })

const Team = mongoose.model("Team", teamSchema);


app.get("/get/:id", async(req,res) => {

    const teamID = req.params.id;

    const data = {}

    try {

        const doc = await Team.findOne({TeamID : teamID});

        if(doc){
            console.log("Fetching from the DB!!");
            // console.log(doc);
            return res.send(doc)
        }
        else{
        console.log("Fetching from FPL API");
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
            
            data["weeklyData"] = gameWeekData;

            //console.log(data)

            // const newTeamData = new Team({
            //     teamID,
            //     data
            //   });
          
            //   await newTeamData.save();

              return res.send(data);

        }
    }
    }catch(err){
        console.error(err);
        return res.status(503).send(err);
    }
}
)

app.post("/post/:id", async (req, res) => {
  const teamID = req.params.id;

  try {
      const doc = await Team.findOne({ TeamID: teamID });
      if (!doc) {
          const data = req.body;
          console.log(data);
          const newData = new Team({TeamID: teamID, ...data[0]});
          await newData.validate();
          await newData.save();
          return res.status(200).send("Data added successfully!");
      }
      return res.status(400).send("Data already exists!");
  } catch (err) {
      console.error(err);
      return res.status(503).send(err);
  }
});


// app.put("/post/teamchart/:id", async(req,res) => {
//   const teamID = req.params.id;

//   try {
//     const doc = await Team.findOneAndUpdate({ TeamID: teamID });
//     if (doc) {
//         const data = req.body;
//         console.log(data);
//         doc["TeamChart"] = data;
//         await doc.validate();
//         await doc.save();
//         return res.status(200).send("Data updated successfully!");
//     }
//     return res.status(400).send("Data does not exist!");
// } catch (err) {
//     console.error(err);
//     return res.status(503).send(err);
// }

// })

app.put("/post/teamchart/:id", async (req, res) => {
  const teamID = req.params.id;

  try {
    const existingDoc = await Team.findOne({ TeamID: teamID });

    if (existingDoc) {
      console.log(req.body)
      const data = req.body;
      
      if(Object.keys(existingDoc["TeamChart"]).length === 0){
        await Team.findOneAndUpdate(
          { TeamID: teamID },
          { $set: { TeamChart: data} }
        );
      }else{
        return res.status(400).send("Data already exist!");
      }

      return res.status(200).send("Data updated successfully!");
    }

    return res.status(400).send("Data does not exist!");
  } catch (err) {
    console.error(err);
    return res.status(503).send(err);
  }
});






// Team.create({"teamID": 123456,
// "bestxi": ["Player1", "Player2", "Player3"],
// "category_awards": ["Category1", "Category2"],
// "mvp": ["Player1"],
// "rolling_average": [1.23, 3.45, 2.31],
// "players_from_which_club": ["Club1", "Club2", "Club3"],
// "most_captained_player": ["Player1"],
// "best_cap_pick": ["Player1"],
// "best_gw": [1, 2, 3],
// "worst_week": [10, 12, 15],
// "best_rank": [1, 2, 3],
// "worst_rank": [100, 200, 300],
// "final_rank": [4, 5, 6]
// })

app.listen(8000, () => {
    console.log(`Server Started at ${PORT}`)
})

