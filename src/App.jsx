import React, { useEffect, useState } from "react";
import DeckGL from "deck.gl";
import StaticMap from "react-map-gl";
import axios from "axios";
import { RenderLayers } from "./deck.gl-layer";
import Tooltip from "./components/tooltip/Tooltip";

const MAPBOX_ACCESS_TOKEN = process.env.REACT_APP_ACCESS_TOKEN;
const mapStyle = "mapbox://styles/jtorlesp/cl543g040000i14kdljcneyob";

const App = () => {
  const [data, setData] = useState([]);
  const [hover, setHover] = useState({
    x: 0,
    y: 0,
  });

  useEffect(() => {
    void fetchData();
  }, []);

  const getDate = (date) => {
    const d = new Date(date);
    return d.toDateString();
  };

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
              id: i.id,
              coordinates: i.geolocation.coordinates,
              mass: i.mass,
              mass: Number(i.mass),
              year: getDate(i.year),
              fall: i.fall,
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
