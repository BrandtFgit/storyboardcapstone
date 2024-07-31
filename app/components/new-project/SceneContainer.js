import React, { useState } from "react";
import Scene from "./Scene";
import "./SceneContainer.css";
import Tools from "../common/Tools";

const SceneContainer = ({ scenes, setScenes }) => {
  const [draggedSceneIndex, setDraggedSceneIndex] = useState(null);
  const [draggedShot, setDraggedShot] = useState(null);

  Tools.setTools([
    // NEW SHOT TOOL
    {
      src: "/tool_icons/new-shot.ico",
      alt: "new shot",
      onClick: () => console.log("New Shot clicked"),
      width: 50,
      height: 30,
    },

    // NEW SCENE TOOL
    {
      src: "/tool_icons/new-scene.ico",
      alt: "new scene",
      onClick: () => {
        setSceneCount(sceneCount + 1);
        setSelectedSceneId(sceneCount);
        setScenes([
          ...scenes,
          { id: sceneCount, title: `Scene ${sceneCount}`, shots: [] },
        ]);
      },
      width: 50,
      height: 30,
    },

    // PLAY PRESENTATION
    {
      src: "/tool_icons/play.ico",
      alt: "play",
      onClick: () => console.log("Play clicked"),
      width: 50,
      height: 30,
    },

    // DRAW????
    {
      src: "/tool_icons/draw.ico",
      alt: "draw",
      onClick: () => {
        toggleMode();
        console.log("Draw clicked");
      },
      width: 50,
      height: 30,
    },
  ]);

  

  const onDragStartScene = (e, index) => {
    if (!draggedShot) {
      setDraggedSceneIndex(index);
      console.log("Dragging scene:", index);
    }
  };

  const onDropScene = (e, index) => {
    if (draggedSceneIndex !== null && !draggedShot) {
      const updatedScenes = [...scenes];
      const [draggedScene] = updatedScenes.splice(draggedSceneIndex, 1);
      updatedScenes.splice(index, 0, draggedScene);
      setScenes(updatedScenes);
      setDraggedSceneIndex(null);
      console.log("Dropped scene:", index);
    }
  };

  const onDragOverScene = (e) => {
    e.preventDefault();
  };

  const onDragStartShot = (e, shotIndex, sceneIndex) => {
    setDraggedShot({ shotIndex, sceneIndex });
    console.log("Dragging shot:", shotIndex, "from scene:", sceneIndex);
  };

  const onDropShot = (e, shotIndex, sceneIndex) => {
    if (!draggedShot) return;

    const updatedScenes = [...scenes];
    const { shotIndex: fromShotIndex, sceneIndex: fromSceneIndex } = draggedShot;

    if (fromSceneIndex === sceneIndex) {
      const shots = updatedScenes[sceneIndex].shots;
      const [draggedShotItem] = shots.splice(fromShotIndex, 1);
      shots.splice(shotIndex, 0, draggedShotItem);
    } else {
      const fromShots = updatedScenes[fromSceneIndex].shots;
      const toShots = updatedScenes[sceneIndex].shots;
      const [draggedShotItem] = fromShots.splice(fromShotIndex, 1);
      toShots.splice(shotIndex, 0, draggedShotItem);
    }

    setScenes(updatedScenes);
    setDraggedShot(null);
    console.log("Dropped shot:", shotIndex, "to scene:", sceneIndex);
  };

  const onShotDropToDifferentScene = (e, toSceneIndex) => {
    if (!draggedShot) return;

    const updatedScenes = [...scenes];
    const { shotIndex, sceneIndex: fromSceneIndex } = draggedShot;
    const fromShots = updatedScenes[fromSceneIndex].shots;
    const toShots = updatedScenes[toSceneIndex].shots;
    const [draggedShotItem] = fromShots.splice(shotIndex, 1);
    toShots.push(draggedShotItem);

    setScenes(updatedScenes);
    setDraggedShot(null);
    console.log("Moved shot:", shotIndex, "to different scene:", toSceneIndex);
  };

  return (
    <div className="scene-container">
      {scenes.map((scene, index) => (
        <Scene
          key={scene.id}
          scene={scene}
          scenes={scenes}
          setScenes={setScenes}
          index={index}
          onDragStartScene={onDragStartScene}
          onDragOverScene={onDragOverScene}
          onDropScene={onDropScene}
          onDragStartShot={onDragStartShot}
          onDragOverShot={(e) => e.preventDefault()}
          onDropShot={onDropShot}
          onShotDropToDifferentScene={onShotDropToDifferentScene}
          isDraggingShot={!!draggedShot}
        />
      ))}
    </div>
  );
};

export default SceneContainer;