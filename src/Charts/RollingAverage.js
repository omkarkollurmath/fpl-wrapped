import React , { useRef, useEffect }from "react";
import Chart from 'chart.js/auto';
import './TeamChart.css';

const RollingAverage = (props) => {

    const {data} = props;

    const canvasRef = useRef(null);

    console.log(data)
    
    // Extract the total_points values from the performance history data
    const points = data.current.map((event) => event.points);

    // // Calculate the rolling average for each window of `windowSize` game weeks
    // const rollingAverage = [];
    // let windowSize = 3;
    // for (let i = 0; i < points.length - windowSize + 1; i++) {
    //     const window = points.slice(i, i + windowSize);
    //     const average = window.reduce((a, b) => a + b) / windowSize;
    //     rollingAverage.push(average);
    // }

    // // The `rollingAverage` array now contains the rolling averages, which you can use as needed
    // console.log(rollingAverage);

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
              labels: Array.from({length: points.length}, (_, i) => (i + 1).toString()),
              datasets: [
              {
                label: "Manager Weekly Points",
                data:  points,
                fill: false,
                borderColor: 'rgb(255, 99, 132)',
                tension: 0.1
              },{
                label: "FPL Average Points",
                data:  [57,57,48,62,62,45,0,50,68,58,46,39,51,59,53,43,72,48,49,59,65,48,66,44,74,43,63,33,80,54],
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
      }, [canvasRef, points]);

    return (
   
      <div className='chart-container'>
      <canvas ref={canvasRef} />
      </div>

      
    )
    
}

export default RollingAverage;
