import { useEffect, useState } from "react";
import YMapComponent from "./map/ymapComponent";
import { mockData } from "./cluster-data";
import { LOCATION } from "./common";
import Papa from "papaparse";

function getGeoObjects(array) {
  const points = array.map((city, i) => ({
    population: city.population,
    type: "Feature",
    id: i,
    geometry: {
      coordinates: [Number(city.lng), Number(city.lat)],
      type: "Point",
    },
    properties: { name: city.city },
  }));

  return points;
}

export default function App() {
  const [data, setData] = useState(mockData.features);

  useEffect(() => {
    const getCountries = async () => {
      const response = await fetch(
        "https://gist.githubusercontent.com/curran/13d30e855d48cdd6f22acdf0afe27286/raw/0635f14817ec634833bb904a47594cc2f5f9dbf8/worldcities_clean.csv"
      );
      const data = await response.text();
      const parsedData = Papa.parse(data, { header: true });
      setData(getGeoObjects(parsedData.data));
    };
    getCountries();
  }, []);

  return (
    <YMapComponent
      styleProps={{ width: "100%", height: "500px", border: "1px solid red" }}
      locationData={LOCATION}
      featuresData={data}
    />
  );
}
