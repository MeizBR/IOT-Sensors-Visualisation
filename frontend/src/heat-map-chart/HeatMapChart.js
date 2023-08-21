/*this function call the typescript templates
and the tables returned in Tables and
then returns the charts  */
import ReactApexChart from 'react-apexcharts';
import Tables from './Tables';


function HeatMapChart(sensorInfo) {

  const Co2 = require('../gazes/CO2.ts').default;
  const No2 = require('../gazes/NO2.ts').default
  const O2 = require('../gazes/O2.ts').default
 
  let colorRanges ;

  if (sensorInfo.gazName === "co2") {
    colorRanges = [
      { from: Co2.LowStart, to: Co2.LowEnd, name: 'low', color: '#87C1FF' },
      { from: Co2.GoodStart, to: Co2.GoodEnd, name: 'good', color: '#90EE90' },
      { from: Co2.ModerateStart, to: Co2.ModerateEnd, name: 'moderate', color: '#FFFF00' },
      { from: Co2.HighStart, to: Co2.HighEnd, name: 'High', color: '#FF0000' },
      { from: Co2.HazardousStart, to: Number.POSITIVE_INFINITY, name: 'Hazardous', color: '#800080' },
    ];
  } else if (sensorInfo.gazName === "no2") {
    colorRanges = [
      { from: No2.LowStart, to: No2.LowEnd, name: 'low', color: '#87C1FF' },
      { from: No2.GoodStart, to: No2.GoodEnd, name: 'good', color: '#90EE90' },
      { from: No2.ModerateStart, to: No2.ModerateEnd, name: 'moderate', color: '#FFFF00' },
      { from: No2.HighStart, to: No2.HighEnd, name: 'High', color: '#FF0000' },
      { from: No2.HazardousStart, to: Number.POSITIVE_INFINITY, name: 'Hazardous', color: '#800080' },
    ];
  }

  else if (sensorInfo.gazName === "o2") {
    colorRanges = [
      { from: O2.LowStart, to: O2.LowEnd, name: 'low', color: '#87C1FF' },
      { from: O2.HazardousStart ,to: O2.HazardousEnd , name: 'Hazardous', color: '#800080' },
      { from: O2.ModerateStart ,to: O2.ModerateEnd , name: 'moderate', color: '#FFFF00' },
      { from: O2.GoodStart,to: Number.POSITIVE_INFINITY,  name: 'good', color: '#90EE90' },
    ];
  }

  const params = {

    series: [
      { name: sensorInfo.gazName, data: Tables({ sensorsInformation: sensorInfo.sensorName, gaz: sensorInfo.gazName }) },
      ],
    
      options: {

        chart: {
          height: 10,
          type: 'heatmap',
        },
        plotOptions: {
          heatmap: {
            shadeIntensity: 0.5,
            radius: 0,
            useFillColorAsStroke: true,
          
            colorScale: {
              ranges: colorRanges,
            },
          },
        },
        dataLabels: { enabled: false },
        stroke: { width: 1 },
      
      },
  };
  

  return (
   <div id="chart">
      <ReactApexChart options={params.options} series={params.series} type="heatmap" height={100} />
    </div>
  );
}


export default HeatMapChart



