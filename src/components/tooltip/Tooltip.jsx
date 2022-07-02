import styles from "./styles.css";

const Tooltip = (props) => {
  return (
    <div style={styles}>
      {props.hover.object && (
        <div
          style={{
            position: "absolute",
            zIndex: 10000,
            background: "rgba(255, 255, 255, 0.75)",
            pointerEvents: "none",
            borderRadius: "10px",
            left: props.hover.x,
            top: props.hover.y,
            width: 250,
            lineHeight: 1.5,
          }}
        >
          <ul className="hovered-object-data">
            <li>
              <h4>{props.hover.object.name}</h4>
            </li>
            <li>
              <b>id</b>: {props.hover.object.id}
            </li>
            <li>
              <b>Observation</b>: {props.hover.object.fall}
            </li>
            <li>
              <b>Year</b>: {props.hover.object.year}
            </li>
            <li>
              <b>Mass</b>: {props.hover.object.mass} grams
            </li>
          </ul>
        </div>
      )}
      {/* <div
        style={{
          position: "absolute",
          zIndex: 10000,
          background: "rgba(255, 255, 255, 0.75)",
          pointerEvents: "none",
          borderRadius: "10px",
          left: props.hover.x,
          top: props.hover.y,
          width: 250,
          lineHeight: 1.5,
        }}
      >
        <ul className="hovered-object-data">
          <li>
            <h4>Toronto</h4>
          </li>
          <li>
            <b>id</b>: 123
          </li>
          <li>
            <b>Observation</b>: Fell
          </li>
          <li>
            <b>Year</b>: 1990
          </li>
          <li>
            <b>Mass</b>: 245 grams
          </li>
        </ul>
      </div> */}
    </div>
  );
};

export default Tooltip;
