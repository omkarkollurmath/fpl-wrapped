import React, { useEffect, useRef, useCallback } from "react";
import Chart from "chart.js/auto";
import playerData from "../../backend/internalData/data_with_points_and_pos.json";
import "./Chart.css";

const HorizontalBarChart = (props) => {
  const canvasRef = useRef(null);

  let sortedDict;

  const putData = useCallback(
    async (processed, ChartData) => {
      if (!processed) {
        try {
          await fetch(
            `https://fpl-wrapped.onrender.com/post/teamchart/${props.teamID}`,
            {
              method: "PUT",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify(ChartData),
            }
          );
        } catch (error) {
          console.error(error);
        }
      }
    },
    [props.teamID]
  );

  if (!props.processed) {
    sortedDict = {};
    const chartData = props.data;

    const playerID = [];

    const teamData = {};

    for (let i = 0; i < chartData.length; i++) {
      chartData[i]["picks"].forEach((gameweek) => {
        if (playerID.indexOf(gameweek["element"]) === -1) {
          playerID.push(gameweek["element"]);
        }
      });
    }

    for (let i = 0; i < playerID.length; i++) {
      let team = playerData
        .filter((player) => player.id === playerID[i])
        .map((player) => player["Team_Name"]);
      if (team in teamData) {
        teamData[team] += 1;
      } else {
        teamData[team] = 1;
      }
    }

    Object.entries(teamData)
      .sort((a, b) => b[1] - a[1])
      .forEach((entry) => {
        sortedDict[entry[0]] = entry[1];
      });

    const values = [];

    for (const key in teamData) {
      if (teamData.hasOwnProperty(key)) {
        values.push(teamData[key]);
      }
    }
  } else {
    sortedDict = { ...props.data };
  }

  if (!props.processed) {
    console.log(props);
    sortedDict = {};
    const chartData = props.data;

    const playerID = [];

    const teamData = {};

    for (let i = 0; i < chartData.length; i++) {
      chartData[i]["picks"].forEach((gameweek) => {
        if (playerID.indexOf(gameweek["element"]) === -1) {
          playerID.push(gameweek["element"]);
        }
      });
    }

    for (let i = 0; i < playerID.length; i++) {
      let team = playerData
        .filter((player) => player.id === playerID[i])
        .map((player) => player["Team_Name"]);
      if (team in teamData) {
        teamData[team] += 1;
      } else {
        teamData[team] = 1;
      }
    }

    Object.entries(teamData)
      .sort((a, b) => b[1] - a[1])
      .forEach((entry) => {
        sortedDict[entry[0]] = entry[1];
      });

    const values = [];

    for (const key in teamData) {
      if (teamData.hasOwnProperty(key)) {
        values.push(teamData[key]);
      }
    }
  } else {
    console.log("Fetched from DB");

    sortedDict = { ...props.data };
    console.log(sortedDict);
  }

  useEffect(() => {
    if (canvasRef && canvasRef.current) {
      const canvas = canvasRef.current;
      // Check if a chart is already using the canvas
      if (canvas.chart) {
        canvas.chart.destroy();
      }
      const chartConfig = {
        type: "bar",
        data: {
          labels: Object.keys(sortedDict),
          datasets: [
            {
              label: "Team Wise Player Count",
              data: Object.values(sortedDict),
            },
          ],
        },
        options: {
          scales: {
            x: {
              min: 0, //Minimum value for x axis
              ticks: {
                stepSize: 1, //Diff between x axis values
              },
            },
            y: {
              min: 0, //Minimum value for x axis
              ticks: {
                autoSkip: false,
              },
            }
          },
          indexAxis: "y",
          // Elements options apply to all of the options unless overridden in a dataset
          // In this case, we are setting the border of each horizontal bar to be 2px wide
          elements: {
            bar: {
              borderWidth: 1,
            },
          },
          responsive: true,
          maintainAspectRatio: false, // set this to false to allow custom sizing
          // update the width and height properties below:
          plugins: {
            legend: {
              display: true,
              position: "top",
              labels: {
                fontColor: "black", // font color of legend labels
                fontSize: 14, // font size of legend labels
              },
            },
            title: {
              display: true,
              text: "Team name and player selected count",
            },
          },
        },
      };
      const chart = new Chart(canvas, chartConfig);
      canvas.chart = chart;
    }

    if (!props.processed) {
      putData(props.processed, sortedDict);
    }
  }, [canvasRef, sortedDict, props.processed, putData]);

  return (
    <div className="chart-container">
      <canvas ref={canvasRef} />
    </div>
  );
};

export default HorizontalBarChart;
