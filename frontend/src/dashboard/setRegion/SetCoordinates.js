import { React, useState, useEffect } from 'react';
import { app } from "../../firebase/firebaseConfig";
import { getDatabase, ref, onValue } from "firebase/database";
import SetRegion from './SetRegion';

const db = getDatabase();

function SetCoordinates() {

  const [data, setData] = useState(null);

  useEffect(() => {
    const sensorDataRef = ref(db, 'instantaneous/');

    const onDataUpdate = (snapshot) => {
      const data = snapshot.val();
      setData(data);
    };

    onValue(sensorDataRef, onDataUpdate);

    return () => {
      onValue(sensorDataRef, onDataUpdate);
    };
  }, []);
  
  const checkRegion = () => {
    if(data) {
      Object.keys(data).map((id) => {
        console.log(id);
        Object.keys(data[id]).map((param) => {
          if(param === "location") {
            const latitude = data[id][param].latitude;
            const longitude = data[id][param].longitude;
            const city = SetRegion({lat: latitude, lon: longitude});

            console.log("latitude: " + latitude);
            console.log("longitude: " + longitude);
            console.log("city: " + city);
          }
        });
      });
    }
  };

  return 
}

export default SetCoordinates