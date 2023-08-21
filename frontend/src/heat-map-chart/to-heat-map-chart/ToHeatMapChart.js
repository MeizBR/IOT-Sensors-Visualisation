import { useMap } from 'react-leaflet';
import { useEffect } from 'react';
import L from 'leaflet';
import '../../dashboard/ToDashboard.css';
import HeatMapImage from '../../images/heatmap.png';
import arrow from '../../images/arrow.png';

export default function ToHeatMap() {
    const map = useMap();
  
    const legend = L.control({ position: 'topright' });
  
    legend.onAdd = function () {
      const div = L.DomUtil.create('div', 'info legend');

      div.style.margin = "-42px 320px 20px 0";

      div.innerHTML = `
            <div class="box-1">
                <div class="btn btn-one" id="dashboard-button">
                    <span>
                        <img src="${HeatMapImage}" alt="Dashboard" />
                        <h6><img src="${arrow}" alt="Dashboard" /></h6>
                        <a><h6>View Heat Map</h6></a>
                    </span>
                </div>
            </div>
      `;

        const dashboardButton = div.querySelector('#dashboard-button');
        dashboardButton.addEventListener('click', () => {
            const newTab = window.open('/heatmap', '_blank');
            newTab.focus();
        });
  
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
