import React, { useState } from "react";
import "./Scene.css";
import Shot from "./Shot";

const Scene = ({
  scene,
  scenes,
  setScenes,
  index,
  onDragStartScene,
  onDragOverScene,
  onDropScene,
  onDragStartShot,
  onDragOverShot,
  onDropShot,
  onShotDropToDifferentScene,
  isDraggingShot,
  saveScenes,
  onShotEditPressed,
}) => {
  const [newSceneTitle, setNewSceneTitle] = useState(scene.title);
  const show_save_button = (scenes, newSceneTitle) =>
    newSceneTitle?.length > 0 && newSceneTitle !== scenes[index].title;

  return (
    <div
      className="scene-whole"
      draggable={!isDraggingShot}
      onDragStart={(e) => onDragStartScene(e, index)}
      onDragOver={onDragOverScene}
      onDrop={(e) => onDropScene(e, index)}
    >
      <div className="scene-tag"></div>
      <div className="scene">
        <div className="scene-header">
          <div className="scene-title">
            <input
              value={newSceneTitle}
              onChange={(e) => {
                setNewSceneTitle(e.target.value);
              }}
            />
            {show_save_button(scenes, newSceneTitle) ? (
              <button
                className="change-name"
                onClick={() => {
                  scenes[index].title = newSceneTitle;
                  try {
                    setScenes([...scenes]);
                  } finally {
                    saveScenes();
                  }
                  console.log(newSceneTitle);
                  console.log(scenes[index].title);
                }}
              >
                Save
              </button>
            ) : (
              ""
            )}
          </div>
          <div
            className="scene-delete"
            onClick={() =>
              setScenes(scenes.filter((scene) => scene.id !== scenes[index].id))
            }
          >
            .
          </div>
        </div>
        <div
          className="shots-container"
          onDragOver={(e) => e.preventDefault()}
          onDrop={(e) => onShotDropToDifferentScene(e, index)}
        >
          {scene.shots?.map((shot, idx) => (
            <Shot
            key={idx}
            shot={shot}
            index={idx}
            onDragStart={(e) => onDragStartShot(e, idx, index)}
            onDragOver={(e) => e.preventDefault()}
            onDrop={(e) => onDropShot(e, idx, index)}
            scenes={scenes}
            setScenes={setScenes}
            sceneIndex={index}
            onShotEditPressed={onShotEditPressed}
          />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Scene;
