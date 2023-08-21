function AdaptColor({ x, y, z }) {

    const Colors = require('../typescript-enum/Colors.ts').default;

    const Status = require('../typescript-enum/Status.ts').default;

    function o2Index(p) {
        let result = "";
        if (p < 16) result = Status.Hazardous;
        else if (p >= 16 && p < 19.5) result = Status.Low;
        else if (p >= 19.5 && p < 21) result = Status.Moderate;
        else if (p >= 21 && p < 25) result = Status.Good;
        else result = Status.High;
        return result;
    }
    
    function co2Index(p) {
        let result = "";
        if (p < 800) result = Status.Low;
        else if (p >= 800 && p < 1000) result = Status.Good;
        else if (p >= 1000 && p < 2000) result = Status.Moderate;
        else if (p >= 2000 && p < 5000) result = Status.High;
        else result = Status.Hazardous;
        return result;
    }
    
    function no2Index(p) {
        let result = "";
        if (p < 20) result = Status.Low;
        else if (p >= 20 && p < 40) result = Status.Good;
        else if (p >= 40 && p < 100) result = Status.Moderate;
        else if (p >= 100 && p < 200) result = Status.High;
        else result = Status.Hazardous;
        return result;
    }

    const funAdaptColor = (a, b, c) => {

        let color = ""

        let pollutionIndex = {
            co2: co2Index(a),
            o2: o2Index(b),
            no2: no2Index(c)
        };

        if(pollutionIndex.co2 === Status.Hazardous || pollutionIndex.no2 === Status.Hazardous) color = Colors.Purple;

        if(pollutionIndex.co2 === Status.High || pollutionIndex.no2 === Status.High) color = Colors.Red;

        if(pollutionIndex.o2 === Status.Hazardous) color = Colors.Purple;

        if(pollutionIndex.co2 === Status.Low) color = Colors.Red;

        if(pollutionIndex.co2 === Status.Moderate || pollutionIndex.no2 === Status.Moderate) color = Colors.Yellow;

        if(pollutionIndex.co2 === Status.Good || pollutionIndex.no2 === Status.Good) color = Colors.Green;

        return color;
    };

  return funAdaptColor(x, y, z);
}

export default AdaptColor