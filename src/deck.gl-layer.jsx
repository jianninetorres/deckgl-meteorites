import { ColumnLayer } from "@deck.gl/layers";

export const RenderLayers = (props) => {
  const layers = [
    new ColumnLayer({
      id: "meteorites",
      data: props.data,
      pickable: true,
      extruded: true,
      getPosition: (d) => d.coordinates, // GPS coordinates for each meteorite fall
      diskResolution: 10,
      radius: 25000,
      getFillColor: [195, 11, 82],
    }),
  ];

  return layers;
};
