const Tooltip = (props) => {
  return (
    <div>
      {props.hover.object && (
        <div
          style={{
            position: "absolute",
            zIndex: 10000,
            background: "#ffffff",
            pointerEvents: "none",
            borderRadius: "5px",
            left: props.hover.x,
            top: props.hover.y,
          }}
        >
          <ul className="hoveredObjectData">
            <li>
              <h4>{props.hover.object.name}</h4>
            </li>
            <li>Year: {props.hover.object.year}</li>
            <li>Mass: {props.hover.object.mass}</li>
          </ul>
        </div>
      )}
    </div>
  );
};

export default Tooltip;
