import React, { useEffect, useState } from 'react';
import 'apexcharts/dist/apexcharts.css';
import ApexCharts from 'apexcharts'

const ProgressChart = () => {
  const [chart, setChart] = useState(null);
useEffect(() => {
    const options  = {
        series: [{
            name: 'Income',
            type: 'column',
            data: [1.4,2,2.5,1.5,2.5,2.8,3.8,4.6,3.8 ,4.1,3.5,5.6]
          }, {
            name: 'Cashflow',
            type: 'column',
            data: [1.1,3,3.1,4,4.1,4.9,5.5,6.5,8.5,6.7,5.4,4.9]
          }, {
            name: 'Revenue',
            type: 'line',
            data: [20,29,37,36,44,45,50,58,45,33,42,59]
          }],
            chart: {
            height: 550,
            type: 'line',
            stacked: false
          },
          dataLabels: {
            enabled: false
          },
          stroke: {
            width: [1, 1, 4]
          },
          title: {
            text: 'Income-Expenditure Analysis Overall',
            align: 'center',
            offsetX: 150
          },
          xaxis: {
            categories: ["Jan", "Feb", "March", "April", "May", "June", "July", "Aug", "Sept","Oct", "Nov", "Dec"],
          },
          yaxis: [
            {
              axisTicks: {
                show: true,
              },
              axisBorder: {
                show: true,
                color: '#008FFB'
              },
              labels: {
                style: {
                  colors: '#008FFB',
                }
              },
              title: {
                text: "Income ",
                style: {
                  color: '#008FFB',
                }
              },
              tooltip: {
                enabled: true
              }
            },
            {
              seriesName: 'Income',
              opposite: true,
              axisTicks: {
                show: true,
              },
              axisBorder: {
                show: true,
                color: '#00E396'
              },
              labels: {
                style: {
                  colors: '#00E396',
                }
              },
              title: {
                text: "Cashflow ",
                style: {
                  color: '#00E396',
                }
              },
            },
            {
              seriesName: 'Revenue',
              opposite: true,
              axisTicks: {
                show: true,
              },
              axisBorder: {
                show: true,
                color: '#FEB019'
              },
              labels: {
                style: {
                  colors: '#FEB019',
                },
              },
              title: {
                text: "Revenue ",
                style: {
                  color: '#FEB019',
                }
              }
            },
          ],
          tooltip: {
            fixed: {
              enabled: true,
              position: 'topLeft', // topRight, topLeft, bottomRight, bottomLeft
              offsetY: 30,
              offsetX: 60
            },
          },
          legend: {
            horizontalAlign: 'left',
            offsetX: 40
          }
          };
  
          const chart = new ApexCharts(document.querySelector("#chart"), options);
          chart.render();











        return () => {
            if (chart) {
              chart.destroy();
            }
          };
        }, []);
      return (
          <div id="chart"></div>
          
        );
      };
        
      
      
      
      
      export default ProgressChart;
      