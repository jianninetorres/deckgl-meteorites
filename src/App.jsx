import React, { useEffect, useState } from "react";
import DeckGL from "deck.gl";
import StaticMap from "react-map-gl";
import axios from "axios";
import { RenderLayers } from "./deck.gl-layer";

const MAPBOX_ACCESS_TOKEN =
  "pk.eyJ1IjoianRvcmxlc3AiLCJhIjoiY2w1MXFqbWd1MDg3bTNxcWhsc280enY3diJ9.3RMRu6jqB3aKNXtkJGD6hg";
const mapStyle = "mapbox://styles/jtorlesp/cl51tnhls004b14qfsua2jxy2";

const App = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    void fetchData();
  }, []);

  const fetchData = async () => {
    try {
      return await axios
        .get("https://data.nasa.gov/resource/y77d-th95.json")
        .then((res) => {
          let d = res.data;

          d = d.filter((i) => i.geolocation); // not all points have a geolocation

          d = d.map((i) => {
            return {
              name: i.name,
              coordinates: i.geolocation.coordinates,
              mass: i.mass,
            };
          });

          setData(d);
        });
    } catch (error) {
      console.log(error);
    }
  };

  const INITIAL_VIEW_STATE = {
    longitude: 0,
    latitude: 20.8333,
    zoom: 2,
    maxZoom: 16,
    minZoom: 2,
    pitch: 20, // map angle; 0 = top-down view
    bearing: 5, // direction it. North = 0
  };

  return (
    <div>
      <DeckGL
        layers={RenderLayers({ data })}
        controller={true}
        initialViewState={INITIAL_VIEW_STATE}
      >
        <StaticMap
          mapStyle={mapStyle}
          mapboxAccessToken={MAPBOX_ACCESS_TOKEN}
        />
      </DeckGL>
    </div>
  );
};

export default App;
