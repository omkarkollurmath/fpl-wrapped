import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import BestCaptainPick from "./BestCaptainPick";
import MostCaptainedPlayer from "./MostCaptainedPlayer";
import CategoryAwards from "./CategoryAwards";
import MostValuablePlayer from "./MostValuablePlayer";
import BestXI from "./BestXI";
import playerData from "../internalData/data_with_points_and_pos.json";

import './Carousel.css';

export const CarouselCards = (props) => {
  const settings = {
    dots: true,
    infinite: false,
    slidesToShow: 1,
    slidesToScroll: 1,
  };

  const teamData = props.data;

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

    return mostFrequent;
  }

  const processData = () => {

    const weeklyCaptainData = [];
    
    for (let i = 0; i < teamData["weeklyData"].length; i++) {
      let captain = teamData["weeklyData"][i]["picks"]
        .filter((player) => player["is_captain"] === true)
        .map((player) => player["element"])[0];
      weeklyCaptainData.push(captain);
    }

    const MostCaptainedPlayerID = findMostFrequent(weeklyCaptainData);
    
    const MostCaptainedPlayerName = playerData
      .filter((player) => player["id"] === +MostCaptainedPlayerID)
      .map((player) => player["Player_Name"])[0];
    
    const best_week_points = Math.max.apply(
      Math,
      teamData["teamHistoryData"]["current"].map((gameweek) => {
        return gameweek["points"];
      })
    );

    const worst_week_points = Math.min.apply(
      Math,
      teamData["teamHistoryData"]["current"].map((gameweek) => {
        return gameweek["points"];
      })
    );

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

    const best_week = teamData["teamHistoryData"]["current"]
      .filter((gameweek) => gameweek["points"] === best_week_points)
      .map((gw) => [{ "Game Week": gw.event, Points: gw.points }]);
    const worst_week = teamData["teamHistoryData"]["current"]
      .filter((gameweek) => gameweek["points"] === worst_week_points)
      .map((gw) => [{ "Game Week": gw.event, Points: gw.points }]);
    const best_rank = teamData["teamHistoryData"]["current"]
      .filter((gameweek) => gameweek["overall_rank"] === best_overall_rank)
      .map((gw) => [{ "Game Week": gw.event, Rank: gw.overall_rank }]);
    const worst_rank = teamData["teamHistoryData"]["current"]
      .filter((gameweek) => gameweek["overall_rank"] === worst_overall_rank)
      .map((gw) => [{ "Game Week": gw.event, Rank: gw.overall_rank }]);

    return {
      Best_Week: best_week[0],
      Worst_Week: worst_week[0],
      Best_Overall_Rank: best_rank[0],
      Worst_Overall_Rank: worst_rank[0],
      Most_Captained_Player: MostCaptainedPlayerName,
    };
  };

  let processedData = [];
  processedData.push(processData());

  return (
    <Slider {...settings} arrows style={{ paddingTop: "75px" }}>
      <div>
        <BestCaptainPick />
      </div>
      <div>
        <MostCaptainedPlayer name={processedData[0]["Most_Captained_Player"]} />
      </div>
      <div>
        <span>Best Week: {processedData[0]["Best_Week"][0]["Game Week"]}</span>
        <br></br>
        <span>Points: {processedData[0]["Best_Week"][0]["Points"]}</span>
        <br></br>
        <span>
          Worst Week: {processedData[0]["Worst_Week"][0]["Game Week"]}
        </span>
        <br></br>
        <span>Points: {processedData[0]["Worst_Week"][0]["Points"]}</span>
        <br></br>
      </div>
      <div>
        <span>
          Best Rank: {processedData[0]["Best_Overall_Rank"][0]["Rank"]}
        </span>
        <br></br>
        <span>
          Worst Rank: {processedData[0]["Worst_Overall_Rank"][0]["Rank"]}
        </span>
        <br></br>
        <span>Final Rank: </span>
      </div>
      <div>
        <CategoryAwards />
      </div>
      <div>
        <MostValuablePlayer />
      </div>
      <div>
        <BestXI />
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