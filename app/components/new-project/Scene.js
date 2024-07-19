// components/new-project/Scene.js

import React, { useState } from "react";
import "./Scene.css";
import Shot from "./Shot";

const Scene = ({ scene, index, onDragStartScene, onDragOverScene, onDropScene }) => {
  const [draggedShotIndex, setDraggedShotIndex] = useState(null);

  const onDragStartShot = (e, shotIndex) => {
    setDraggedShotIndex(shotIndex);
  };

  const onDropShot = (e, shotIndex) => {
    const updatedShots = [...scene.shots];
    const [draggedShot] = updatedShots.splice(draggedShotIndex, 1);
    updatedShots.splice(shotIndex, 0, draggedShot);
    scene.shots = updatedShots; // Update the shots in the scene directly
    setDraggedShotIndex(null);
  };

  return (
    <div
      className="scene"
      draggable
      onDragStart={(e) => onDragStartScene(e, index)}
      onDragOver={onDragOverScene}
      onDrop={(e) => onDropScene(e, index)}
    >
      <h3>{scene.title}</h3>
      <div className="shots-container">
        {scene.shots.map((shot, idx) => (
          <Shot
            key={idx}
            shot={shot}
            index={idx}
            onDragStart={onDragStartShot}
            onDragOver={(e) => e.preventDefault()}
            onDrop={onDropShot}
          />
        ))}
      </div>
    </div>
  );
};

export default Scene;
