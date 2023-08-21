import HeatMapChart from './HeatMapChart'; 
import CSV from './CSV';
import AllSensors from './AllSensors';
import './CSS/Button.css';

export default function DisplayHeat() {

  let data=AllSensors()

  return (
  
    <div>
        
        <h1 style={{textAlign:'center'}}>Sensors History in Sousse</h1>
        <CSV /> 
        <h3 style={{color:'#87C1FF'}}>Your Daily Statistics</h3>

        {data.map(sensorName => (
            <div>
                {sensorName}
                <HeatMapChart  sensorName={sensorName} gazName="no2" />
                <HeatMapChart  sensorName={sensorName} gazName="co2" />
                <HeatMapChart  sensorName={sensorName} gazName="o2" />
            </div>
        ))}
    
        <div className="buttons">
            <button className='low'>Low</button>
            <button className='good'>Good</button>
            <button className='moderate'>Moderate</button>
            <button className='High'>High</button>
            <button className='Hazardous'>Hazardous</button>
        </div>

    </div>

  );
}