/*this function retun all the sensor names that
exist in the database so you can use it later to 
call the HeatMapChart in a dynamic way*/
import { getDatabase, ref, onValue } from "firebase/database";
import { React, useState, useEffect } from 'react';
import './CSS/CSVExport.css';

const db = getDatabase();

const AllSensors= () => {

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
  Object.entries(data).forEach(([sensorName]) => {
    markers.push(sensorName);
  });
}

return (markers);
};

export default AllSensors