import { useMap } from 'react-leaflet';
import { useEffect } from 'react';
import L from 'leaflet';

export default function Credits() {
    const map = useMap();
  
    const legend = L.control({ position: 'bottomleft' });
  
    legend.onAdd = function () {
      const div = L.DomUtil.create('div', 'info legend');

      div.innerHTML = `
            <span class="badge rounded-pill text-bg-success">
              Linkedin Creators Profiles: 
              <a style="color: white; text-decoration: underline" href="https://www.linkedin.com/in/maiez-ben-romdhane-82b32a219/" target="blank">Meiez Ben Romdhane</a> 
              and 
              <a style="color: white; text-decoration: underline" href="https://www.linkedin.com/in/jday-hazem-80b72b18b/" target="blank">Hazem Jday</a>
               - Enterprise: 
              <a style="color: white; text-decoration: underline" href="https://www.linkedin.com/search/results/all/?fetchDeterministicClustersOnly=true&heroEntityKey=urn%3Ali%3Aorganization%3A3008432&keywords=imbus&origin=RICH_QUERY_SUGGESTION&position=1&searchId=6cdcab64-cab4-4e82-999d-0eea091f23f9&sid=_v8" target="blank">Imbus</a>
            </span>
      `;
  
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
