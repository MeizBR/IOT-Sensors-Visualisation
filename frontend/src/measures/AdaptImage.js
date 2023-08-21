function AdaptImage({ measure }) {
    let image = "";

    switch(measure) {
        case "o2":
            image = "o2.png";
        break;

        case "co2":
            image = "co2.png";
        break;

        case "no2":
            image = "no2.png";
        break;

        case "temperature":
            image = "temperature.png";
        break;

        default:
            image = "humidity.png";
        break;
    }
    
    return image;
}

export default AdaptImage;