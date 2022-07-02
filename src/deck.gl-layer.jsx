import { ColumnLayer } from "@deck.gl/layers";

const renderColours = (fall) => {
  if (fall !== "Fell") {
    return [40, 247, 106];
  } else {
    return [247, 237, 40];
  }
};

export const RenderLayers = (props) => {
  const layers = [
    new ColumnLayer({
      id: "meteorites",
      data: props.data,
      pickable: true,
      extruded: true,
      getPosition: (d) => d.coordinates, // GPS coordinates for each meteorite fall
      diskResolution: 100,
      radius: 25000,
      getFillColor: (d) => renderColours(d.fall),
      onHover: props.onHover,
    }),
  ];

  return layers;
};
