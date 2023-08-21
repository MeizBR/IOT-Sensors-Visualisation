/*this function is responsible of the 
implementation of the csv file using
the tables taken from database */ 

import { CSVLink } from 'react-csv';
import { getDatabase, ref, onValue } from "firebase/database";
import { React, useState, useEffect } from 'react';
import './CSS/CSVExport.css';

const db = getDatabase();

const CSV = () => {
 

  const headers = [
    { label: 'Sensor_Name', key: 'sensorName' },
    { label: 'Date', key: 'date' },
    { label: 'Time', key: 'time' },
    { label: 'CO2(ppm)', key: 'CO2' },
    { label: 'NO2(μg/m2)', key: 'NO2' },
    { label: 'Temperature(°C)', key: 'temperature' },
    { label: 'Humidity(g.Kg-1)', key: 'humidity' },
    { label: 'O2(%)', key: 'O2' }
  ];
  


const [data, setData] = useState(null);

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

let markers = [];



if (data) {
  Object.entries(data).forEach(([sensorName, sensor]) => {
   
    Object.entries(sensor).forEach(([date, sensorDate]) => {
     
   Object.entries (sensorDate).forEach(([time, updateTime]) => {
    
     if (sensorName) {
        markers.push({
          date: date,
          time: time,
          sensorName: sensorName,
          CO2: updateTime.co2,
          NO2: updateTime.no2,
          temperature: updateTime.temperature,
          humidity: updateTime.humidity,
          O2: updateTime.o2
        });
      }

    } ) ;
    
    });
  
  });
 
}

  return (
  <div>
      
      
      <CSVLink data={markers} headers={headers} filename="data.csv">
        <button    className='button'>Download  history CSV</button>
      </CSVLink>
    </div> 
    
  );
};

export default CSV