function CheckAnomalies({ x, y, z }) {

  // carbon
    const isCarbonHigh = (p) => {
      return p >= 2000;
    };

    const isCarbonHazardous = (p) => {
      return p >= 5000
    }

  // carbon

  // oxygen

    const isOxygenLow = (p) => {
      return p <= 19.5;
    };

    const isOxygenVeryLow = (p) => {
      return p <= 16;
    };

  // oxygen

  // nitrogen

    const isNitrogenHigh = (p) => {
      return p >= 100;
    };

    const isNitrogenHazardous = (p) => {
      return p >= 200;
    };

  // nitrogen
  
    const anomalies = [];
  
    if (isCarbonHazardous(x) && isCarbonHigh(x)) {
      anomalies.push(
        <div key="carbon" className="badge rounded-pill text-bg-dark">
          <img style={{ width: "8%", marginRight: "10px" }} src={require("../../images/dark-risk.png")} alt="Alert" />
          CO2 Value Is Hazardous
        </div>
      );
    } else if(!(isCarbonHazardous(x)) && isCarbonHigh(x)) {
      anomalies.push(
        <div key="carbon" className="badge rounded-pill text-bg-danger">
          <img style={{ width: "8%", marginRight: "10px" }} src={require("../../images/alert.png")} alt="Alert" />
          CO2 Value Is High
        </div>
      );
    }
  
    if (isOxygenLow(y) && isOxygenVeryLow(y)) {
      anomalies.push(
        <div key="oxygen" className="badge rounded-pill text-bg-dark">
          <img style={{ width: "8%", marginRight: "10px" }} src={require("../../images/dark-risk.png")} alt="Alert" />
          O2 Value Is Very Low
        </div>
      );
    }
  
    if (isNitrogenHigh(z) && isNitrogenHazardous(z)) {
      anomalies.push(
        <div key="nitrogen" className="badge rounded-pill text-bg-dark">
          <img style={{ width: "8%", marginRight: "10px" }} src={require("../../images/dark-risk.png")} alt="Alert" />
          NO2 Value Is Hazardous
        </div>
      );
    } else if(isNitrogenHigh(z) && !(isNitrogenHazardous(z))) {
      anomalies.push(
        <div key="nitrogen" className="badge rounded-pill text-bg-danger">
          <img style={{ width: "8%", marginRight: "10px" }} src={require("../../images/alert.png")} alt="Alert" />
          NO2 Value Is High
        </div>
      );
    }
  
    if (anomalies.length > 0) {
      return (
        <h6>
            {anomalies.map((anomaly) => (
            <div style={{marginBottom: "5px"}} key={anomaly.key}>{anomaly}</div>
            ))}
        </h6>
      );
    } else {
      return (
        <h6>
          <div className="badge rounded-pill text-bg-success">
            <img style={{ width: "8%", marginRight: "10px" }} src={require("../../images/good.png")} alt="Good" />
            Everything Is Fine
          </div>
        </h6>
      );
    }
  }
  
  export default CheckAnomalies;
  