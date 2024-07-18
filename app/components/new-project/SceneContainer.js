// components/SceneContainer.js
import React, { useState } from "react";
import Scene from "./Scene";
import "./SceneContainer.css"; // Add your styles here

const initialScenes = [
  { id: "1", title: "Scene 1" },
  { id: "2", title: "Scene 2" },
  { id: "3", title: "Scene 3" },
];

const SceneContainer = () => {
  const [scenes, setScenes] = useState(initialScenes);
  const [draggedSceneIndex, setDraggedSceneIndex] = useState(null);

  const onDragStart = (e, index) => {
    setDraggedSceneIndex(index);
  };

  const onDrop = (e, index) => {
    const updatedScenes = [...scenes];
    const [draggedScene] = updatedScenes.splice(draggedSceneIndex, 1);
    updatedScenes.splice(index, 0, draggedScene);
    setScenes(updatedScenes);
    setDraggedSceneIndex(null);
  };

  return (
    <div className="scene-container">
      {scenes.map((scene, index) => (
        <Scene
          key={scene.id}
          scene={scene}
          index={index}
          onDragStart={onDragStart}
          onDragOver={(e) => e.preventDefault()}
          onDrop={onDrop}
        />
      ))}
    </div>
  );
};

export default SceneContainer;
