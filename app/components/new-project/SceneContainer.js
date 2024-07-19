// components/new-project/SceneContainer.js

import React from "react";
import Scene from "./Scene";
import "./SceneContainer.css"; // Add your styles here

const SceneContainer = ({ scenes, onDragStartScene, onDropScene, onDragOverScene }) => {
  return (
    <div className="scene-container">
      {scenes.map((scene, index) => (
        <Scene
          key={scene.id}
          scene={scene}
          index={index}
          onDragStartScene={onDragStartScene}
          onDragOverScene={onDragOverScene}
          onDropScene={onDropScene}
        />
      ))}
    </div>
  );
};

export default SceneContainer;
