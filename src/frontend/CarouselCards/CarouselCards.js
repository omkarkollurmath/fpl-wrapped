import React  from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import BestCaptainPick from "./BestCaptainPick";
import MostCaptainedPlayer from "./MostCaptainedPlayer";
import CategoryAwards from "./CategoryAwards";
import MostValuablePlayer from "./MostValuablePlayer";
import BestXI from "./BestXI";
import playerData from "../../backend/internalData/data_with_points_and_pos.json";

import './Carousel.css';

const CarouselCards = (props) => {
  const settings = {
    dots: true,
    infinite: false,
    slidesToShow: 1,
    slidesToScroll: 1,
    responsive: [
      {
        breakpoint: 800,
        settings: {
          arrows: false,
        },
      },
    ],
  };
  
  
  const teamData = props.processed ? null : props.data


  function findMostFrequent(arr) {
    // Create an object to store counts for each element
    const counts = {};

    // Iterate over the array and update counts
    arr.forEach((elem) => {
      if (counts[elem]) {
        counts[elem]++;
      } else {
        counts[elem] = 1;
      }
    });

    // Find the element with the highest count
    let maxCount = 0;
    let mostFrequent;

    for (const elem in counts) {
      if (counts[elem] > maxCount) {
        maxCount = counts[elem];
        mostFrequent = elem;
      }
    }

    return {mostFrequent, maxCount};
  }

  const processData = () => {

    const weeklyCaptainData = [];
    
    for (let i = 0; i < teamData["weeklyData"].length; i++) {
      let captain = teamData["weeklyData"][i]["picks"]
        .filter((player) => player["is_captain"] === true)
        .map((player) => player["element"])[0];
      weeklyCaptainData.push(captain);
    }

    //best captain
    const captainIdPointsObjectForAllGameWeeks = []

    for (let i = 0; i < weeklyCaptainData.length; i++) {
      let getGameWeekPointsForCaptain = playerData
        .filter((player) => player["id"] === weeklyCaptainData[i])
        .map((player) => [{
           "id": player["id"],
           "Player_Name": player["Player_Name"],
           "Team_Name": player["Team_Name"],
           "Gameweek_Points": player["Gameweek_Points"][i]
            }]
        )[0];
        captainIdPointsObjectForAllGameWeeks.push(getGameWeekPointsForCaptain[0]);
    }

    //TODO: we might no need this below filter which filters out gameweek captains without gameweek points
    //This is temporary solution to inconsistency of data in data_with_points_and_pos.json
    const removeObjectsWithoutGameWeekPoints = captainIdPointsObjectForAllGameWeeks
    .filter((object) => object["Gameweek_Points"]);

    const bestCaptainPick = removeObjectsWithoutGameWeekPoints.reduce((retObj, obj, index) => {
      if (obj["Gameweek_Points"] > retObj.maxValue) {
        return {
          maxId: obj["id"],
          maxIdPlayerName: obj["Player_Name"],
          maxIdTeamName: obj["Team_Name"],
          maxValue: obj["Gameweek_Points"],
          //TODO: remove after 2022/23 season
          //Fix is needed because we have removed gw7 which makes gw8 data on index 6
          maxIdGameWeek: index >= 6 ? index + 2 : index + 1 
        };
      }
      return retObj;
    }, { maxId: null, maxIdPlayerName: null, maxIdTeamName: null, maxValue: -Infinity, maxIdGameWeek: null });

    //most captained player
    const {mostFrequent: MostCaptainedPlayerID, maxCount: FrequencyOfMostCaptainedPlayer} = 
      findMostFrequent(weeklyCaptainData);
    
    const MostCaptainedPlayerName = playerData
      .filter((player) => player["id"] === +MostCaptainedPlayerID)
      .map((player) => [{ "Player_Name": player["Player_Name"], "Team_Name": player["Team_Name"] }])[0];

    //best week, worst week
    const best_week_points = Math.max.apply(
      Math,
      teamData["teamHistoryData"]["current"].map((gameweek) => {
        return gameweek["points"];
      })
    );

    //TODO: Remove this for next season
    //Only for 2022/23 season we had GW7 without any games so skipping check on this GW
    const removedGW7ForWorstWeekTeamData = teamData["teamHistoryData"]["current"]
    .filter((gameweek) => gameweek["event"] !== 7);

    const worst_week_points = Math.min.apply(  
      Math,
      removedGW7ForWorstWeekTeamData.map((gameweek) => {
        return gameweek["points"];
      })
    );

    //best rank, worst rank and final rank
    const best_overall_rank = Math.min.apply(
      Math,
      teamData["teamHistoryData"]["current"].map((gameweek) => {
        return gameweek["overall_rank"];
      })
    );

    const worst_overall_rank = Math.max.apply(
      Math,
      teamData["teamHistoryData"]["current"].map((gameweek) => {
        return gameweek["overall_rank"];
      })
    );

    const final_overall_rank = teamData["teamHistoryData"]["current"]
      .filter((obj, index) => index === teamData["teamHistoryData"]["current"].length - 1)
      .map((gameweek) => {
        return gameweek["overall_rank"];
      });

    const best_week = teamData["teamHistoryData"]["current"]
      .filter((gameweek) => gameweek["points"] === best_week_points)
      .map((gw) => [{ "Game Week": gw.event, Points: gw.points }]);
    const worst_week = removedGW7ForWorstWeekTeamData
      .filter((gameweek) => gameweek["points"] === worst_week_points)
      .map((gw) => [{ "Game Week": gw.event, Points: gw.points }]);
    const best_rank = teamData["teamHistoryData"]["current"]
      .filter((gameweek) => gameweek["overall_rank"] === best_overall_rank)
      .map((gw) => [{ "Game Week": gw.event, Rank: gw.overall_rank }]);
    const worst_rank = teamData["teamHistoryData"]["current"]
      .filter((gameweek) => gameweek["overall_rank"] === worst_overall_rank)
      .map((gw) => [{ "Game Week": gw.event, Rank: gw.overall_rank }]);

    //preliminary data for category awards, mvp and best xi
    const uniquePlayerIdsAndGWForTeam = [];

    for (let i=0; i<teamData["weeklyData"].length; i++)
    {
      teamData["weeklyData"][i]["picks"].forEach((data) => 
      {
        const playerId = data["element"];
        const gameWeeks = i + 1; //storing game week in object, need to increment by 1
        const player = uniquePlayerIdsAndGWForTeam.filter((player) => player["id"] === playerId)
        .map((player) => player)

        if(player.length === 0)
        {
          uniquePlayerIdsAndGWForTeam.push({"id": playerId, "GameWeek": [gameWeeks]});
        }
        else
        {
          player[0]["GameWeek"] = [...player[0]["GameWeek"], gameWeeks];
        }
      });
    }

    const playerDetailsFromTeam = [];

    for(let i=0; i<uniquePlayerIdsAndGWForTeam.length; i++)
    {
      let getPointsAndPlayerDetailsForPlayer = playerData
        .filter((player) => player["id"] === uniquePlayerIdsAndGWForTeam[i]["id"])
        .map((player) => [{
           "id": player["id"],
           "Player_Name": player["Player_Name"],
           "Team_Name": player["Team_Name"],
           "Position": player["Position"],
           "Gameweek_Points": player["Gameweek_Points"],
           "Gameweek_Played_For_Team": uniquePlayerIdsAndGWForTeam[i]["GameWeek"]
            }]
        )[0];
      playerDetailsFromTeam.push(getPointsAndPlayerDetailsForPlayer[0]);
    }

    //compare gameweek_played-for_team and gameweek_points
    let playerDetailsWithTotalPointsFromTeam = [];
    for(let i=0 ; i<playerDetailsFromTeam.length; i++)
    {
      let totalPoints = 0;
      for(let j=0 ; j<playerDetailsFromTeam[i]["Gameweek_Played_For_Team"].length; j++) 
      {
        const index = playerDetailsFromTeam[i]["Gameweek_Played_For_Team"][j]-1;
        //Added a check due to incosistency of data
        if(playerDetailsFromTeam[i]["Gameweek_Points"][index]) 
        {
          totalPoints = totalPoints + playerDetailsFromTeam[i]["Gameweek_Points"][index];
        }
      }
      playerDetailsWithTotalPointsFromTeam[i] = {...playerDetailsFromTeam[i], "Total_Points": totalPoints}
    }
    
    //category awards
      //get top goalkeeper, defender, midfielder and attacker from above playerDetailsWithTotalPointsFromTeam
      const getAllGoalkeepersFromTeam = playerDetailsWithTotalPointsFromTeam
        .filter((player) => player["Position"] === "GK")
        .map((player) => [{
          "Player_Name": player["Player_Name"],
          "Team_Name": player["Team_Name"],
          "Position": player["Position"],
          "Total_Points": player["Total_Points"]
          }][0]
        );

      const topGoalkeeperAward = getAllGoalkeepersFromTeam.reduce((retPlayer, player) => {
        if (player["Total_Points"] > retPlayer.maxPoints) {
          return {
            maxIdPlayerName: player["Player_Name"],
            maxIdTeamName: player["Team_Name"],
            maxPoints: player["Total_Points"],
          };
        }
        return retPlayer;
      }, { maxIdPlayerName: null, maxIdTeamName: null, maxPoints: -Infinity});
      
      const getAllDefendersFromTeam = playerDetailsWithTotalPointsFromTeam
        .filter((player) => player["Position"] === "DEF")
        .map((player) => [{
          "Player_Name": player["Player_Name"],
          "Team_Name": player["Team_Name"],
          "Position": player["Position"],
          "Total_Points": player["Total_Points"]
          }][0]
        );
      
      const topDefenderAward = getAllDefendersFromTeam.reduce((retPlayer, player) => {
        if (player["Total_Points"] > retPlayer.maxPoints) {
          return {
            maxIdPlayerName: player["Player_Name"],
            maxIdTeamName: player["Team_Name"],
            maxPoints: player["Total_Points"],
          };
        }
        return retPlayer;
      }, { maxIdPlayerName: null, maxIdTeamName: null, maxPoints: -Infinity});

      const getAllMidfieldersFromTeam = playerDetailsWithTotalPointsFromTeam
        .filter((player) => player["Position"] === "MID")
        .map((player) => [{
          "Player_Name": player["Player_Name"],
          "Team_Name": player["Team_Name"],
          "Position": player["Position"],
          "Total_Points": player["Total_Points"]
          }][0]
        );

      const topMidfielderAward = getAllMidfieldersFromTeam.reduce((retPlayer, player) => {
        if (player["Total_Points"] > retPlayer.maxPoints) {
          return {
            maxIdPlayerName: player["Player_Name"],
            maxIdTeamName: player["Team_Name"],
            maxPoints: player["Total_Points"],
          };
        }
        return retPlayer;
      }, { maxIdPlayerName: null, maxIdTeamName: null, maxPoints: -Infinity});

      const getAllForwardsFromTeam = playerDetailsWithTotalPointsFromTeam
        .filter((player) => player["Position"] === "FWD")
        .map((player) => [{
          "Player_Name": player["Player_Name"],
          "Team_Name": player["Team_Name"],
          "Position": player["Position"],
          "Total_Points": player["Total_Points"]
          }][0]
        );

      const topForwardAward = getAllForwardsFromTeam.reduce((retPlayer, player) => {
        if (player["Total_Points"] > retPlayer.maxPoints) {
          return {
            maxIdPlayerName: player["Player_Name"],
            maxIdTeamName: player["Team_Name"],
            maxPoints: player["Total_Points"],
          };
        }
        return retPlayer;
      }, { maxIdPlayerName: null, maxIdTeamName: null, maxPoints: -Infinity});

    //mvp
    const mvp = playerDetailsWithTotalPointsFromTeam.reduce((retPlayer, player) => {
      if (player["Total_Points"] > retPlayer.maxPoints) {
        return {
          maxIdPlayerName: player["Player_Name"],
          maxIdTeamName: player["Team_Name"],
          maxPoints: player["Total_Points"],
        };
      }
      return retPlayer;
    }, { maxIdPlayerName: null, maxIdTeamName: null, maxPoints: -Infinity});

    //best xi

    const top2Goalkeepers = getAllGoalkeepersFromTeam
      .sort((a, b) => b["Total_Points"] - a["Total_Points"])
      .slice(0, 2) 
      .map((player) => [{
        "Player_Name": player["Player_Name"],
        "Team_Name": player["Team_Name"],
        "Position": player["Position"],
        "Total_Points": player["Total_Points"]
        }][0]
      );

    const top5Defenders = getAllDefendersFromTeam
      .sort((a, b) => b["Total_Points"] - a["Total_Points"])
      .slice(0, 5) 
      .map((player) => [{
        "Player_Name": player["Player_Name"],
        "Team_Name": player["Team_Name"],
        "Position": player["Position"],
        "Total_Points": player["Total_Points"]
        }][0]
      );

    const top5Midfielders = getAllMidfieldersFromTeam
      .sort((a, b) => b["Total_Points"] - a["Total_Points"])
      .slice(0, 5) 
      .map((player) => [{
        "Player_Name": player["Player_Name"],
        "Team_Name": player["Team_Name"],
        "Position": player["Position"],
        "Total_Points": player["Total_Points"]
        }][0]
      );

    const top3Forwards = getAllForwardsFromTeam
      .sort((a, b) => b["Total_Points"] - a["Total_Points"])
      .slice(0, 3) 
      .map((player) => [{
        "Player_Name": player["Player_Name"],
        "Team_Name": player["Team_Name"],
        "Position": player["Position"],
        "Total_Points": player["Total_Points"]
        }][0]
      );

    return {
      TeamID : +props.teamID,
      FirstName : props.data["manager_first_name"],
      LastName : props.data["manager_last_name"],  
      Best_Captain_Pick: bestCaptainPick["maxIdPlayerName"],
      Best_Captain_Pick_TeamName: bestCaptainPick["maxIdTeamName"],
      Best_Captain_Pick_GameWeek: bestCaptainPick["maxIdGameWeek"],
      Best_Captain_Pick_Points: bestCaptainPick["maxValue"],
      Most_Captained_Player: MostCaptainedPlayerName[0].Player_Name,
      Most_Captained_Player_Team_Name: MostCaptainedPlayerName[0].Team_Name,
      Frequency_Of_Most_Captained_Player: FrequencyOfMostCaptainedPlayer,
      Best_Week: best_week[0],
      Best_Week_Points : best_week[1],
      Worst_Week: worst_week[0],
      Worst_Week_Points : worst_week[1],
      Best_Overall_Rank: best_rank[0],
      Worst_Overall_Rank: worst_rank[0],
      Final_Overall_Rank: final_overall_rank,
      Top_Goalkeeper_Award: topGoalkeeperAward,
      Top_Defender_Award: topDefenderAward,
      Top_Midfielder_Award: topMidfielderAward,
      Top_Forward_Award: topForwardAward,
      Most_Valuable_Player: mvp,
      Top2_Goalkeepers: top2Goalkeepers,
      Top5_Defenders: top5Defenders,
      Top5_Midfielders: top5Midfielders,
      Top3_Forwards: top3Forwards
    };
  };

  async function postData(props, processedData) {
    if(!props.processed){
      try {
        await fetch(`http://localhost:8000/post/${props.teamID}`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify(processedData)
        });
      } catch(error) {
        console.error(error);
      }
    }
  }
  

  let processedData = [];

  if(props.processed){
    processedData.push({...props.data})
  }else{

    processedData.push(processData());
    postData(props, processedData);
  }

  return (
    <Slider {...settings} arrows>
      <div className='cards-padding'>
        <BestCaptainPick name={processedData[0]["Best_Captain_Pick"]}
            teamName={processedData[0]["Best_Captain_Pick_TeamName"]}
            gameWeek={processedData[0]["Best_Captain_Pick_GameWeek"]}
            points={processedData[0]["Best_Captain_Pick_Points"]}
        />
      </div>
      <div className='cards-padding'>
        <MostCaptainedPlayer name={processedData[0]["Most_Captained_Player"]} 
            teamName={processedData[0]["Most_Captained_Player_Team_Name"]} 
            frequency={processedData[0]["Frequency_Of_Most_Captained_Player"]}
        />
      </div>
      <div className='cards-padding'>
        <div style={{fontSize : 20, fontWeight: '500', paddingBottom : '0.5%'}}>Best Gameweek</div>
        <div style={{paddingBottom : '3%'}}>GW{processedData[0]["Best_Week"][0]["Game Week"]} - Points: {processedData[0]["Best_Week"][0]["Points"]}</div>

        <div style={{fontSize : 20, fontWeight: '500', paddingBottom : '0.5%'}}>Worst Gameweek</div>
        <span>GW{processedData[0]["Worst_Week"][0]["Game Week"]} - Points: {processedData[0]["Worst_Week"][0]["Points"]}</span>

      </div>
      <div className='cards-padding'>
        <div style={{fontSize : 20, fontWeight: '500', paddingBottom : '0.5%'}}>Best Rank</div>
        <div style={{paddingBottom : '3%'}}>{processedData[0]["Best_Overall_Rank"][0]["Rank"]} in GW: {processedData[0]["Best_Overall_Rank"][0]["Game Week"]}</div>

        <div style={{fontSize : 20, fontWeight: '500', paddingBottom : '0.5%'}}>Worst Rank</div>
        <div style={{paddingBottom : '3%'}}>{processedData[0]["Worst_Overall_Rank"][0]["Rank"]} in GW: {processedData[0]["Worst_Overall_Rank"][0]["Game Week"]}</div>

        <div style={{fontSize : 20, fontWeight: '500', paddingBottom : '0.5%'}}>Final Rank</div>
        <div style={{paddingBottom : '3%'}}>{processedData[0]["Final_Overall_Rank"]} after GW: 38</div>

      </div>
      <div>
        <CategoryAwards topGoalkeeperAward={processedData[0]["Top_Goalkeeper_Award"]}
          topDefenderAward={processedData[0]["Top_Defender_Award"]}
          topMidfielderAward={processedData[0]["Top_Midfielder_Award"]}
          topForwardAward={processedData[0]["Top_Forward_Award"]}
        />
      </div>
      <div className='cards-padding'>
        <MostValuablePlayer mvp={processedData[0]["Most_Valuable_Player"]}/>
      </div>
      <div>
        <BestXI top2Goalkeepers={processedData[0]["Top2_Goalkeepers"]}
          top5Defenders={processedData[0]["Top5_Defenders"]}
          top5Midfielders={processedData[0]["Top5_Midfielders"]}
          top3Forwards={processedData[0]["Top3_Forwards"]}/>
      </div>
    </Slider>
  );
};

export default CarouselCards;


// This code imports various components and packages including React, react-slick, slick-carousel/slick/slick.css, slick-carousel/slick/slick-theme.css, BestCaptainPick, MostCaptainedPlayer, CategoryAwards, MostValuablePlayer, BestXI, and playerData.


// The function 'findMostFrequent()' takes an array as an argument and finds the most frequent element within the array by assigning counts for each element and iterating over the array.


// The function 'processData()' retrieves data from the teamData object and calculates the best and worst weekly points and overall ranks, as well as the most captained player name. It then returns the processed data in an object.


// The 'processedData' array is then populated with the results of 'processData()'.


// Finally, the function returns a set of JSX components generated using the 'Slider' component from react-slick, with each component containing different data from the 'processedData' array or its imports.