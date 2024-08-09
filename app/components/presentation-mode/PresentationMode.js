import "./PresentationMode.css";
import React, { useState } from "react";

const PresentationMode = ({ scenes }) => {
  const [currentSceneIndex, setCurrentSceneIndex] = useState(0);
  const [currentShotIndex, setCurrentShotIndex] = useState(0);

  const currentScene = scenes[currentSceneIndex];
  const currentShot = currentScene.shots[currentShotIndex];

  const handleNextShot = () => {
    if (currentShotIndex < currentScene.shots.length - 1) {
      setCurrentShotIndex(currentShotIndex + 1);
    } else if (currentSceneIndex < scenes.length - 1) {
      setCurrentSceneIndex(currentSceneIndex + 1);
      setCurrentShotIndex(0);
    }
  };

  const handlePreviousShot = () => {
    if (currentShotIndex > 0) {
      setCurrentShotIndex(currentShotIndex - 1);
    } else if (currentSceneIndex > 0) {
      const prevSceneIndex = currentSceneIndex - 1;
      setCurrentSceneIndex(prevSceneIndex);
      setCurrentShotIndex(scenes[prevSceneIndex].shots.length - 1);
    }
  };

  return (
    <div className="presentation-mode">
      <h2 className="scene-name">{currentScene.title}</h2>
      {currentShot ? (
        <div className="shot">
          <img
            src={currentShot.imageDataUrl}
            alt={`Shot ${currentShotIndex + 1}`}
          />
          <p>{currentShot.description}</p>
        </div>
      ) : (
        <p>No shots in this scene.</p>
      )}
      <div className="pres-controls">
        <button
          className="button"
          onClick={handlePreviousShot}
          disabled={currentSceneIndex === 0 && currentShotIndex === 0}
        >
          Previous
        </button>
        <button
          className="button"
          onClick={handleNextShot}
          disabled={
            currentSceneIndex === scenes.length - 1 &&
            currentShotIndex === currentScene.shots.length - 1
          }
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default PresentationMode;
