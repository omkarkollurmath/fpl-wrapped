const express = require('express');
const cors = require('cors');
const fetch = require('node-fetch');

const mongoose = require('mongoose');
const bodyParser = require("body-parser");

require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 8000;

app.use(express.static('public'));
app.use(express.urlencoded({extended: false}));
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.json());
app.use(cors());

try {
    // mongoose.connect("mongodb://localhost:27017/fplWrappedDB",{useNewUrlParser: true, useUnifiedTopology: true})
    if (!process.env.MONGO_URI) {
      console.error('Missing MONGO_URI environment variable.');
      process.exit(1);
    }
    
    // Connect to the MongoDB database using the MONGODB_URI environment variable
    mongoose.connect(`mongodb+srv://${process.env.username}:${process.env.password}@cluster0.n3axrs8.mongodb.net/?retryWrites=true&w=majority`, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    
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
    "FirstName" : {type : String},
    "LastName" : {type : String},
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

app.get("/get/:id", async (req, res) => {
  const teamID = req.params.id;
  const data = {};

  try {
    const doc = await Team.findOne({ TeamID: teamID });

    if (doc) {
      console.log("Fetching from the DB!!");
      return res.send(doc);
    } else {
      console.log("Fetching from FPL API");
      const ManagerData = await fetch(
        `https://fantasy.premierleague.com/api/entry/${teamID}/`
      )
        .then((response) => {
          if (!response.ok) {
            throw new Error("No record found");
          }
          return response.json();
        })
        .then((data) => data)
        .catch((error) => {
          res.status(404).send(error);
          return;
        });

        if(ManagerData !== undefined){
          const first_name = ManagerData["player_first_name"]
          const last_name = ManagerData["player_last_name"]
          data["manager_first_name"] = first_name
          data["manager_last_name"] = last_name
        }else{
          data["manager_first_name"] = 'User'
          data["manager_last_name"] = ''
        }

      const teamHistoryData = await fetch(
        `https://fantasy.premierleague.com/api/entry/${teamID}/history/`
      )
        .then((response) => {
          if (!response.ok) {
            throw new Error("No record found");
          }
          return response.json();
        })
        .then((data) => data)
        .catch((error) => {
          res.status(404).send(error);
          return;
        });

      if (teamHistoryData !== undefined) {
        const response = teamHistoryData;
        data["teamHistoryData"] = response;
        const gameWeekData = [];

        for (let i = 1; i <= response["current"].length; i++) {
          let weekData = await fetch(
            `https://fantasy.premierleague.com/api/entry/${teamID}/event/${i}/picks/`
          );
          let responseData = await weekData.json();
          gameWeekData.push(responseData);
        }

        data["weeklyData"] = gameWeekData;

        return res.send(data);
      }
    }
  } catch (err) {
    console.error(err);
    return res.status(503).send(err);
  }
});

app.post("/post/:id", async (req, res) => {
  const teamID = req.params.id;

  try {
    const doc = await Team.findOne({ TeamID: teamID });
    if (!doc) {
      const data = req.body;
      const newData = new Team({ TeamID: teamID, ...data[0] });
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

app.put("/post/teamchart/:id", async (req, res) => {
  const teamID = req.params.id;

  try {
    const existingDoc = await Team.findOne({ TeamID: teamID });

    if (existingDoc) {
      const data = req.body;

      if (Object.keys(existingDoc["TeamChart"]).length === 0) {
        await Team.findOneAndUpdate(
          { TeamID: teamID },
          { $set: { TeamChart: data } }
        );
      } else {
        return res.status(400).send("Data already exist!");
      }

      return res.status(200).send("Data updated successfully!");
    }

    return res.status(404).send("Data does not exist!");
  } catch (err) {
    console.error(err);
    return res.status(503).send(err);
  }
});

app.put("/post/rollingAverage/:id", async (req, res) => {
  const teamID = req.params.id;

  try {
    const existingDoc = await Team.findOne({ TeamID: teamID });

    if (existingDoc) {
      const data = req.body;

      if (Object.keys(existingDoc["RollingAverage"]).length === 0) {
        await Team.findOneAndUpdate(
          { TeamID: teamID },
          { $set: { RollingAverage: data } }
        );
      } else {
        return res.status(400).send("Data already exist!");
      }

      return res.status(200).send("Data updated successfully!");
    }

    return res.status(404).send("Data does not exist!");
  } catch (err) {
    console.error(err);
    return res.status(503).send(err);
  }
});

app.listen(PORT, () => {
  console.log(`Server Started at ${PORT}`);
});
