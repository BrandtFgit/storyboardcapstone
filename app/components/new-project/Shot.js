import React from "react";
import "./Shot.css";

const Shot = ({
  shot,
  index,
  onDragStart,
  onDragOver,
  onDrop,
  sceneIndex,
  scenes,
  setScenes,
}) => {
  const deleteShot = (index, sceneIndex, scenes, setScenes) => {
    const newScenes = [...scenes];
    newScenes[sceneIndex].shots.splice(index, 1);
    console.log(scenes);
    setScenes(newScenes);
  };
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

      <div className="shot-gizmos">
      <div
        className="scene-delete"
        onClick={() => deleteShot(index, sceneIndex, scenes, setScenes)}
      >
        .
      </div>

      {/* <div
        className="edit-shot"
        onClick={() => deleteShot(index, sceneIndex, scenes, setScenes)}
      >
        .
      </div> */}
      </div>
    </div>
  );
};

export default Shot;
