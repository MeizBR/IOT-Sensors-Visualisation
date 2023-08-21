import { useMap } from 'react-leaflet';
import { useEffect } from 'react';
import L from 'leaflet';
import './CSS/Legend.css';

function Legend() {

  function capitalizeWords(str) {
    return str
      .split(' ')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');
  }

  const Colors = require('../typescript-enum/Colors.ts').default;

  const Status = require('../typescript-enum/Status.ts').default;

  const map = useMap();

  const getColor = (status) => {
    if (status === capitalizeWords(Status.Low)) return Colors.Blue;
    else if (status === capitalizeWords(Status.Good)) return Colors.LightGreen;
    else if (status === capitalizeWords(Status.Moderate)) return Colors.Yellow;
    else if (status === capitalizeWords(Status.High)) return Colors.Red;
    else if(status === capitalizeWords(Status.Hazardous)) return Colors.Purple;
    else return '#FFFFFF';
  };

  const legend = L.control({ position: 'bottomright' });

  legend.onAdd = function () {
    const div = L.DomUtil.create('div', 'info legend');
    const status = [
      capitalizeWords(Status.Low),
      capitalizeWords(Status.Good),
      capitalizeWords(Status.Moderate),
      capitalizeWords(Status.High),
      capitalizeWords(Status.Hazardous)
    ];

    div.innerHTML = '<div class="title">Air Quality Index</div><i class="shape"></i>';

    for (let i = 0; i < status.length; i++) {
      div.innerHTML +=
        '<i style="background:' +
        getColor(status[i]) +
        '"><span>' + status[i] + '</span></i>';
    }

    return div;
  };

  useEffect(() => {
    legend.addTo(map);

    return () => {
      legend.remove();
    };
  }, [map]);

  return null;
}

export default Legend;