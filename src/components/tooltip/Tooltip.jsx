import styles from "./styles.css";

const Tooltip = (props) => {
  return (
    <div style={styles}>
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
            width: 250,
          }}
        >
          <ul className="hovered-object-data">
            <li>
              <h4>{props.hover.object.name}</h4>
            </li>
            <li>id: {props.hover.object.id}</li>
            <li>Observation: {props.hover.object.fall}</li>
            <li>Year: {props.hover.object.year}</li>
            <li>Mass: {props.hover.object.mass} grams</li>
          </ul>
        </div>
      )}
    </div>
  );
};

export default Tooltip;
