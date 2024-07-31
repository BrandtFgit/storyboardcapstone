"use client";
import React, { useState } from "react";
import Navbar from "@/app/components/common/navbar";
import Toolbar from "@/app/components/common/Toolbar";
import SceneContainer from "@/app/components/new-project/SceneContainer";
import DrawingCanvas from "@/app/components/canvas/DrawingCanvas";
import Tools from "@/app/components/common/Tools"

export default function NewProject() {
  const [isDrawingMode, setIsDrawingMode] = useState(true);
  const [sceneCount, setSceneCount] = useState(2);
  const [scenes, setScenes] = useState([
    { id: 1, title: "Scene 1", shots: [] },
  ]);
  const [selectedSceneId, setSelectedSceneId] = useState(1);
  
  const toggleMode = () => {
    setIsDrawingMode(!isDrawingMode);

    // Clear toolbar.
    Tools.clearTools();

    if(isDrawingMode == true){
      // ADD CONFIRM BUTTON IF WE'RE IN DRAWING MODE.
      Tools.addTool({
        // CONFIRM
        src: "/tool_icons/check.ico",
        alt: "check",
        onClick: () => {
          toggleMode();
          console.log("Check clicked");
        },
      });

    }
  };

  const handleSaveDrawing = (imageDataUrl, description) => {
    setScenes(
      scenes.map((scene) => {
        if (scene.id === selectedSceneId) {
          return {
            ...scene,
            shots: [...scene.shots, { imageDataUrl, description }],
          };
        }
        return scene;
      })
    );
    setIsDrawingMode(false); // Switch to Scene Mode after saving
  };

  return (
    <main className="main">
      <Navbar title="New Project" />
      <div className="main-cont">
        <Toolbar/>
        <div style={{ width: "100%", height: "80%" }}>
          {isDrawingMode ? (
            <DrawingCanvas onSaveDrawing={handleSaveDrawing} />
          ) : (
            <SceneContainer scenes={scenes} setScenes={setScenes} />
          )}
        </div>
      </div>
    </main>
  );
}
