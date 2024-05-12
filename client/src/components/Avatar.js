import React, { useState } from "react";
import { styles } from "./ChatEngineStyles";
import "./styles/ChatEngine.css";

const Avatar = (props) => {
  const [hovered, setHoverd] = useState(false);
  return (
    <div style={props.style}>
      <div
        className="transition-3"
        style={{
          ...styles.avatarHello,
          ...{ opacity: hovered ? "1" : "0" },
        }}
      >
        hey it's me!!
      </div>

      <div
        className="transition-3"
        onMouseEnter={() => setHoverd(true)}
        onMouseLeave={() => setHoverd(false)}
        onClick={() => props.onClick && props.onClick()}
        style={{
          ...styles.chatWithMeButton,
          ...{ border: hovered ? "1px solid #ffff" : "4px solid #3a7d90" },
        }}
      />
    </div>
  );
};
export default Avatar;
