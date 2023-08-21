function AdaptEachColor({ measure, value }) {

    const Colors = require('../typescript-enum/Colors.ts').default;

    const Status = require('../typescript-enum/Status.ts').default;

    const Measures = require('../typescript-enum/Measures.ts').default;

    let color = "";

    function MeasureIndex(x, p) {

        let result = "";

        switch(x) {
            case Measures.O2:
                if (p < 16) result = Status.Hazardous;
                else if (p >= 16 && p < 19.5) result = Status.Low;
                else if (p >= 19.5 && p < 21) result = Status.Moderate;
                else if (p >= 21 && p < 25) result = Status.Good;
                else result = Status.Well;
            break;

            case Measures.CO2:
                if (p < 800) result = Status.Low;
                else if (p >= 800 && p < 1000) result = Status.Good;
                else if (p >= 1000 && p < 2000) result = Status.Moderate;
                else if (p >= 2000 && p < 5000) result = Status.High;
                else result = Status.Hazardous;
            break;

            case Measures.NO2:
                if (p < 20) result = Status.Low;
                else if (p >= 20 && p < 40) result = Status.Good;
                else if (p >= 40 && p < 100) result = Status.Moderate;
                else if (p >= 100 && p < 200) result = Status.High;
                else result = Status.Hazardous;
            break;

            case Measures.Temperature:
                if (p < 10) result = Status.Low;
                else if (p >= 10 && p < 15) result = Status.Good;
                else if (p >= 15 && p < 25) result = Status.Moderate;
                else if (p >= 25 && p < 30) result = Status.High;
                else result = Status.Hazardous;
            break;

            default:
                if (p < 20) result = Status.Low;
                else if (p >= 20 && p < 40) result = Status.Good;
                else if (p >= 40 && p < 60) result = Status.Moderate;
                else if (p >= 60 && p < 80) result = Status.High;
                else result = Status.Hazardous;
            break;
        }
        
        return result;
    }

    let m = MeasureIndex(measure, value);

    switch(measure) {
        case Measures.O2:
            if(m === Status.Hazardous) color = Colors.Purple;
            else if(m === Status.Low) color = Colors.Red;
            else if(m === Status.Moderate) color = Colors.Yellow;
            else if(m === Status.Good) color = Colors.LightGreen;
            else color = Colors.Green;
        break;
        default:
            if(m === Status.Low) color = Colors.Blue;
            else if(m === Status.Good) color = Colors.LightGreen;
            else if(m === Status.Moderate) color = Colors.Yellow;
            else if(m === Status.High) color = Colors.Red;
            else color = Colors.Purple;
        break;
    }

    return color;
}

export default AdaptEachColor;