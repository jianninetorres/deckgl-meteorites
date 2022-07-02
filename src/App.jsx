import React, { useEffect, useState } from "react";
import DeckGL from "deck.gl";
import StaticMap from "react-map-gl";
import axios from "axios";
import { RenderLayers } from "./deck.gl-layer";
import Tooltip from "./components/tooltip/Tooltip";

const MAPBOX_ACCESS_TOKEN =
  "pk.eyJ1IjoianRvcmxlc3AiLCJhIjoiY2w1Mmx2NnBiMGd1MjNqbXJmdnlwdzM1YyJ9.oIOV9Hwi8q9rb8cpsqDhWw";
const mapStyle = "mapbox://styles/jtorlesp/cl543g040000i14kdljcneyob";

const App = () => {
  const [data, setData] = useState([]);
  const [hover, setHover] = useState({
    x: 0,
    y: 0,
    hoveredObject: null,
  });

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

  const renderToolTip = ({ x, y, object, layer }) => {
    setHover({ x, y, object, layer });
    console.log({ x, y, object, layer });
  };

  return (
    <div>
      <DeckGL
        layers={RenderLayers({
          data,
          onHover: (hover) => renderToolTip(hover),
        })}
        controller={true}
        initialViewState={INITIAL_VIEW_STATE}
      >
        {hover && <Tooltip hover={hover} />}
        <StaticMap
          mapStyle={mapStyle}
          mapboxAccessToken={MAPBOX_ACCESS_TOKEN}
        />
      </DeckGL>
    </div>
  );
};

export default App;
