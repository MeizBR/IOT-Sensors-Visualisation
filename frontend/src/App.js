import { React, useState, useEffect } from 'react';
import { MapContainer, TileLayer, Tooltip, Circle } from 'react-leaflet';
import { app } from './firebase/firebaseConfig';
import Legend from './components/Legend';
import { getDatabase, ref, onValue } from "firebase/database";
import"./App.css";
import moment from 'moment';
import AdaptColor from './components/AdaptColor';
import CheckAnomalies from './components/measures/CheckAnomalies';
import ToDashboard from './dashboard/ToDashboard';
import AdaptEachColor from './components/AdaptEachColor';
import AdaptImage from './measures/AdaptImage';
import Credits from './credits/Credits';
import ToHeatMap from './heat-map-chart/to-heat-map-chart/ToHeatMapChart';


const db = getDatabase();

function App() {


  const [data, setData] = useState(null);

  const [currentTime, setCurrentTime] = useState(moment());

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTime(moment());
    }, 1000);

    return () => clearInterval(interval);
  }, []);

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


  const [selectedMeasure, setSelectedMeasure] = useState("airquality");

  const handleButtonClick = (value) => {
    setSelectedMeasure(value);
  };

  const Measures = require('./typescript-enum/Measures.ts').default;

  const buttonData = [
    {
      value: Measures.Humidity,
      label: Measures.Humidity.charAt(0).toUpperCase() + Measures.Humidity.slice(1)
    },
    {
      value: Measures.Temperature,
      label: Measures.Temperature.charAt(0).toUpperCase() + Measures.Temperature.slice(1)
    },
    {
      value: Measures.CO2,
      label: Measures.CO2.charAt(0).toUpperCase() + Measures.CO2.slice(1)
    },
    {
      value: Measures.O2,
      label: Measures.O2.charAt(0).toUpperCase() + Measures.O2.slice(1)
    },
    {
      value: Measures.NO2,
      label: Measures.NO2.charAt(0).toUpperCase() + Measures.NO2.slice(1)
    },
    {
      value: "airquality",
      label: "Air Quality"
    },
  ];


  let markers = [];
  
  if (data) {
    if(selectedMeasure === "airquality") {
      Object.values(data).map((sensorData) => {
        let sensor = {
          geocode: [parseFloat(sensorData.location.latitude), parseFloat(sensorData.location.longitude)],
          o2: sensorData.o2,
          co2: sensorData.co2,
          no2: sensorData.no2,
          humidity: sensorData.humidity,
          temperature: sensorData.temperature,
          coverage: sensorData.coverage,
          lastUpdate: sensorData.last_update,
        }
        markers.push(sensor);
      });
    } else {
      Object.values(data).map((sensorData) => {
        let sensor = {
          geocode: [parseFloat(sensorData.location.latitude), parseFloat(sensorData.location.longitude)],
          selectedMeasure: sensorData[selectedMeasure],
          coverage: sensorData.coverage,
          lastUpdate: sensorData.last_update,
          colorIndex: <AdaptEachColor measure={selectedMeasure} value={sensorData[selectedMeasure]} />,
          image: <AdaptImage measure={selectedMeasure} />
        }
        markers.push(sensor);
      });
    }
  }

  return (

    <>
    
    <MapContainer className='map-container' center={[35.8258 , 10.6412]} zoom={13}>

    <TileLayer
      url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
    />

      <ToDashboard />

      <ToHeatMap />

      <Legend />

      {/* <Credits /> */}


      {buttonData.map((button, index) => (
              <button
                key={index}
                onClick={() => handleButtonClick(button.value)}
                className="custom-map-button"
                style={{
                  position: 'absolute',
                  top: index === 5 ? '120px' : '70px',
                  right: index === 5 ? '200px' : `${10 + index * 110}px`,
                  zIndex: 1000,
                  width: "100px",
                  height: "35px",
                  border: "2px solid gray",
                  color: selectedMeasure === button.value ? 'white' : 'black',
                  textAlign: "center",
                  borderRadius: "8px",
                  fontSize: "17px",
                  fontWeight: "bold",
                  marginRight: "15px",
                  backgroundColor: selectedMeasure === button.value ? 'gray' : 'lightgray',
                }}
              >
                {button.label}
              </button>
      ))}


      {selectedMeasure === "airquality" ? (
        markers.map((marker, index) => (

        <div key={index}>

          <Circle
            center={marker.geocode}
            radius={marker.coverage}
            pathOptions={{
              color: AdaptColor({
                x: parseFloat(marker.co2),
                y: parseFloat(marker.o2),
                z: parseFloat(marker.no2)
              }),
              weight:1
            }}
          >

          <Tooltip
              className="custom-tooltip"
              eventHandlers={{
                click: (event) => {
                  event.target.openTooltip();
                },
              }}
            >
              <div id='measure-details'>
                <h6 id='title'>Sensor Details</h6>
                <h6>
                  <span>Coordinates:</span>
                  <ul>
                    <li>
                      <img src={require("./images/coordinates.png")} />
                      <span>Latitude:</span> {marker.geocode[0]}
                    </li>
                    <li>
                      <img src={require("./images/coordinates.png")} />
                      <span>Longitude:</span> {marker.geocode[1]}
                    </li>
                  </ul>
                </h6>
                <h6><span>Measure Parameters:</span></h6>
                <h6 id='measure-vis'>
                      <p>
                        <img src={require("./images/o2.png")} />
                        <span>O2: </span>
                        {marker.o2} %
                      </p>
                      <p>
                        <img src={require("./images/co2.png")} />
                        <span>CO2: </span>
                        {marker.co2} ppm
                      </p>
                      <p>
                        <img src={require("./images/no2.png")} />
                        <span>NO2: </span>
                        {marker.no2} μg/m2
                      </p>
                      <p>
                        <img src={require("./images/temperature.png")} />
                        <span>Temperature: </span>
                        {marker.temperature} °C
                      </p>
                      <p>
                        <img src={require("./images/humidity.png")} />
                        <span>Humidity: </span>
                        {marker.humidity} g.kg-1
                      </p>
                </h6>
                <h5>
                Updated {moment(marker.lastUpdate).fromNow()}
                </h5>
                <h6><CheckAnomalies x={marker.co2} y={marker.o2} z={marker.no2} /></h6>
              </div>
            </Tooltip>

          </Circle>

        </div>

      ))) : (
        markers.map((marker, index) => (

          <div key={index}>
  
            <Circle
              center={marker.geocode}
              radius={marker.coverage}
              pathOptions={{
                color: AdaptEachColor({
                  measure: selectedMeasure,
                  value: parseFloat(marker.selectedMeasure)
                }),
                weight:1
              }}
            >

              <Tooltip
              className="custom-tooltip"
              eventHandlers={{
                click: (event) => {
                  event.target.openTooltip();
                },
              }}
            >
              <div id='measure-details'>
                <h6 id='title'>Sensor Details</h6>
                <h6>
                  <span>Coordinates:</span>
                  <ul>
                    <li>
                      <img src={require("./images/coordinates.png")} />
                      <span>Latitude:</span> {marker.geocode[0]}
                    </li>
                    <li>
                      <img src={require("./images/coordinates.png")} />
                      <span>Longitude:</span> {marker.geocode[1]}
                    </li>
                  </ul>
                </h6>
                <h6><span>Measure Parameters:</span></h6>
                <h6 id='measure-vis'>
                      <p>
                      <img src={require(`./images/${AdaptImage({ measure: selectedMeasure })}`)} />
                        <span>{selectedMeasure.charAt(0).toUpperCase() + selectedMeasure.slice(1)}: </span>
                        {marker.selectedMeasure}
                      </p>
                </h6>
                <h5>
                Updated {moment(marker.lastUpdate).fromNow()}
                </h5>
              </div>
            </Tooltip>

            </Circle>
  
          </div>
  
        ))
      )}

    </MapContainer>
    </>
  );
}

export default App;