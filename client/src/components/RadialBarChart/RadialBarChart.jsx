import React, { useState } from 'react';
import ReactApexChart from 'react-apexcharts';
import { useEffect } from 'react';
const RadialBarChart = ({rating,label}) => {
  console.log("reting",rating)
  const [options, setOptions] = useState({
    chart: {
      height: 220,
      type: 'radialBar',
    },
    series: [0],
    plotOptions: {
      radialBar: {
        hollow: {
          margin: 5,
          size: '50%',
        },
        dataLabels: {
          showOn: 'always',
          name: {
            offsetY: -10,
            show: true,
            color: '#888',
            fontSize: '13px'
          },
          value: {
            color: '#111',
            fontSize: '30px',
            show: true
          }
        }
      }
    },
    stroke: {
      lineCap: 'round',
    },
    labels: [label]
  });

  useEffect(() => {
    if(rating&&label){
setOptions(
    {
        chart: {
          height: 220,
          type: 'radialBar',
        },
        series: [rating.toFixed(0)],
        plotOptions: {
          radialBar: {
            hollow: {
              margin: 15,
              size: '70%',
            },
            dataLabels: {
              showOn: 'always',
              name: {
                offsetY: -10,
                show: true,
                color: '#888',
                fontSize: '13px'
              },
              value: {
                color: '#111',
                fontSize: '30px',
                show: true
              }
            }
          }
        },
        stroke: {
          lineCap: 'round',
        },
        labels: [label]
      }
)}
  }, [rating,label])
  

  return (
    <div id="chart">
      <ReactApexChart options={options} series={options.series} type="radialBar" height={220} />
    </div>
  );
}

export default RadialBarChart;
