import { getDatabase, ref, onValue } from "firebase/database";
import { React, useState, useEffect } from 'react';
import './CSS/CSVExport.css'

const db = getDatabase();

const Tables = (sensorsInfo) => {
 

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


let datas=[]


if (data) {

Object.entries(data).forEach(([sensorName, sensor]) => {
  if ( sensorsInfo.sensorsInformation==sensorName){
    Object.entries(sensor).forEach(([date, sensorDate]) => {
     
  let total=0;
  let divisor =0;

  Object.entries (sensorDate).forEach(([time, updateTime]) => {
    
      if (sensorName ) {
        divisor++
        let gaz = sensorsInfo.gaz
        total=total+(updateTime[gaz])
      }

    }) ;
    
  datas.push({
      x:date,
      y:total/divisor 
  })

    });
}
  });

}

  return datas;
};

export default Tables;