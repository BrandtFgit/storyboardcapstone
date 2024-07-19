import React from "react";
import "./Shot.css";

const Shot = ({ shot, index, onDragStart, onDragOver, onDrop }) => {
  return (
    <div
      className="shot"
      draggable
      onDragStart={(e) => onDragStart(e, index)}
      onDragOver={(e) => e.preventDefault()}
      onDrop={(e) => onDrop(e, index)}
    >
      <img src={shot.imageDataUrl} alt={`Shot ${index + 1}`} />
      <p>{shot.description}</p>
    </div>
  );
};

export default Shot;
