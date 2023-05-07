import React, { useEffect, useRef, useCallback } from "react";
import Chart from "chart.js/auto";
import "./Chart.css";

const RollingAverage = (props) => {
  const canvasRef = useRef(null);

  let rollingData;

  const putData = useCallback(
    async (processed, ChartData) => {
      if (!processed) {
        try {
          await fetch(
            `https://fpl-wrapped.onrender.com/post/rollingAverage/${props.teamID}`,
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

    const chartData = props.data;

    rollingData = chartData.current.map((event) => event.points);

  } else {
    rollingData = { ...props.data };
    console.log("Fetched from DB");
  }

  useEffect(() => {
    if (canvasRef && canvasRef.current) {
      const canvas = canvasRef.current;
       // Check if a chart is already using the canvas
       if (canvas.chart) {
        canvas.chart.destroy();
      }
      const chartConfig = {
        type: 'line',
        data: {
          labels: Array.from({length: rollingData.length}, (_, i) => (i + 1).toString()),
          datasets: [
          {
            label: "Manager Weekly Points",
            data:  rollingData,
            fill: false,
            borderColor: 'rgb(255, 99, 132)',
            tension: 0.1
          },{
            label: "FPL Average Points",
            data:  [57,57,48,62,62,45,0,50,68,58,46,39,51,59,53,43,72,48,49,59,65,48,66,44,74,43,63,33,80,54,55,42,55,0,0,0,0,0],
            fill: false,
            borderColor: 'rgb(54, 162, 235)',
            tension: 0.1,
            borderWidth: 2,
            borderDash: [10, 5]
          }]
        },
        options: {
          responsive: true,
          maintainAspectRatio: false, // set this to false to allow custom sizing
          plugins: {
            legend: {
              display : true,
              position: 'bottom',
              labels: {
                fontColor: 'black', // font color of legend labels
                fontSize: 14 // font size of legend labels
              }
            },
            title: {
              display: true,
              text: 'Comparison Chart'
            }
          },
          scales: {
            y: {
              ticks: {
                beginAtZero: true
              }
            }
          },animation: {
            duration: 3000, // animation duration in milliseconds
            easing : 'easeInOutCirc',
            
          },
        }
      };
      const chart = new Chart(canvas, chartConfig);
      canvas.chart = chart;
    }

    if (!props.processed) {
      putData(props.processed, rollingData);
    }
  }, [canvasRef, rollingData, props.processed, putData]);

  return (
    <div className="chart-container">
      <canvas ref={canvasRef} />
    </div>
  );
};

export default RollingAverage;
