import React from "react";
import "./Scene.css";
import Shot from "./Shot";

const Scene = ({
  scene,
  index,
  onDragStartScene,
  onDragOverScene,
  onDropScene,
  onDragStartShot,
  onDragOverShot,
  onDropShot,
  onShotDropToDifferentScene,
  isDraggingShot,
}) => {
  return (
    <div
      className="scene"
      draggable={!isDraggingShot}
      onDragStart={(e) => onDragStartScene(e, index)}
      onDragOver={onDragOverScene}
      onDrop={(e) => onDropScene(e, index)}
    >
      <h3>{scene.title}</h3>
      <div
        className="shots-container"
        onDragOver={(e) => e.preventDefault()}
        onDrop={(e) => onShotDropToDifferentScene(e, index)}
      >
        {scene.shots.map((shot, idx) => (
          <Shot
            key={idx}
            shot={shot}
            index={idx}
            onDragStart={(e) => onDragStartShot(e, idx, index)}
            onDragOver={(e) => e.preventDefault()}
            onDrop={(e) => onDropShot(e, idx, index)}
          />
        ))}
      </div>
    </div>
  );
};

export default Scene;
