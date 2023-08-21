import ReactApexChart from 'react-apexcharts';
import { React, useState, useEffect } from 'react';
import { app } from '../firebase/firebaseConfig';
import { getDatabase, ref, onValue } from "firebase/database";
import './NewDashboard.css';
import SetRegion from './setRegion/SetRegion';
import SetCoordinates from './setRegion/SetCoordinates';

const db = getDatabase();

function NewDashboard() {

    const Measures = require('../typescript-enum/Measures.ts').default;

    const [data, setData] = useState(null);

    const [selectedDate, setSelectedDate] = useState("");

    const [selectedMeasureType, setSelectedMeasureType] = useState("");

    const [sensor, setSensor] = useState("");

    const [results, setResults] = useState(null);

    const [times, setTimes] = useState(null);


    useEffect(() => {
        const sensorDataRef = ref(db, 'history1/');
    
        const onDataUpdate = (snapshot) => {
          const data = snapshot.val();
          setData(data);
        };
    
        onValue(sensorDataRef, onDataUpdate);
    
        return () => {
          onValue(sensorDataRef, onDataUpdate);
        };
    }, []);

    // sensors
    let sensors = []

    if(data) {
      Object.keys(data).map((sensor) => {
        sensors.push(sensor);
      });
    }

    function FilterByDateAndMeasure(p_sensor, p_date, p_measure) {
      let records = [];
      if (data) {
        for (const sensorLabel in data) {
          if (sensorLabel === p_sensor) {
            for (const date in data[sensorLabel]) {
              if (date === p_date) {
                for (const time in data[sensorLabel][date]) {
                  for (const measure in data[sensorLabel][date][time]) {
                    if (measure === p_measure) {
                      records.push(data[sensorLabel][date][time][measure]);
                    }
                  }
                }
              }
            }
          }
        }
      }
      return records;
    }
    

    function showTimes(p_date) {
      let times = [];
      if(data) {
          Object.values(data).map((sensor) => {
              Object.keys(sensor).map((date) => {
                  if(date === p_date) {
                    Object.keys(sensor[date]).map((time) => {
                      times.push(time);
                    });
                  }
              });
          });
      }
      return times;
    }


    const handleDateChange = (event) => {
        setSelectedDate(event.target.value);
    }

    const handleMeasureTypeChange =(event) => {
        setSelectedMeasureType(event.target.value);
    }

    const handleSensorChange =(event) => {
      setSensor(event.target.value);
    }

    let output = FilterByDateAndMeasure(sensor, selectedDate, selectedMeasureType);

    const filterData = () => {

      let times = showTimes(selectedDate);

      setResults(output);
      setTimes(times);
    }

    let measuresArray, timesArray = [];

    if(results && times) {
      measuresArray = results;
      timesArray = times;
    }

    function setUnity(m) {
      let u = "";
      if(m === Measures.O2) u = "%";
      else if(m === Measures.CO2) u = "ppm";
      else if (m === Measures.NO2) u = "μg/m2";
      else if(m === Measures.Humidity) u = "g.kg-1";
      else u = "°C";
  
      return u;
    }

    const params = {
          
        series: [{
            name: selectedMeasureType,
            data: measuresArray,
        }],
        options: {
          chart: {
            height: 350,
            type: 'line',
            zoom: {
              enabled: true
            },
            dropShadow: {
              enabled: true,
              color: '#000',
              top: 18,
              left: 7,
              blur: 10,
              opacity: 0.2
            },
          },
          dataLabels: {
            enabled: true
          },
          stroke: {
            curve: 'smooth'
          },
          title: {
            text: "Measure Type: " + selectedMeasureType,
            align: 'center'
          },
          grid: {
            row: {
              colors: ['#f3f3f3', 'transparent'],
              opacity: 0.5
            },
          },
          xaxis: {
            categories: timesArray,
            title: {
              text: 'Time'
            }
          },
          yaxis: {
            title: {
              text: 'Values In: ' + setUnity(selectedMeasureType)
            },
            min: 0,
            max: 1000
          },
          legend: {
            position: 'top',
            horizontalAlign: 'right',
            floating: true,
            offsetY: -25,
            offsetX: -5
          }
        },
      
      
      };


  return (
    <div className="App">
            <h1>Dashboard Charts in Sousse</h1>
              <div className='flexbox'>
                <div>
                  <h6>Select a sensor:</h6>
                  <select id='measure' onChange={handleSensorChange}>
                    <option value="Choose a sensor" selected disabled>Choose a sensor</option>
                    {
                      sensors.map((sensor) => {
                        return <option value={sensor}>{sensor}</option>
                      })
                    }
                  </select>
                </div>

                <div>
                  <h6>Select a date:</h6>
                  <input id='date' type='date' onChange={handleDateChange} />
                </div>

                <div>
                  <h6>Select a measure:</h6>
                  <select id='measure' onChange={handleMeasureTypeChange}>
                    <option value="Choose a measure type" selected disabled>Choose a measure type</option>
                    <option value="o2">O2</option>
                    <option value="co2">CO2</option>
                    <option value="no2">NO2</option>
                    <option value="temperature">Temperature</option>
                    <option value="humidity">Humidity</option>
                  </select>
                </div>

                {/* <div>
                  <h6>Select a region:</h6>
                  <select onChange={handleRegionChange}>
                    <option value="Choose a region" selected disabled>Choose a region</option>
                    <option value="sousse">Sousse</option>
                    <option value="tunis">Tunis</option>
                    <option value="monastir">Monastir</option>
                    <option value="mahdia">Mahdia</option>
                    <option value="sfax">Sfax</option>
                  </select>
                </div> */}
              </div>

              <hr />
              <input id='filter-button' type='button' value="Filter Data" onClick={filterData} />

              <ReactApexChart options={params.options} series={params.series} type="line" height={350} />

              <SetCoordinates />
          </div>
  )
}

export default NewDashboard