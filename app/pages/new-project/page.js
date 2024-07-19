"use client";
import React, { useState } from "react";
import Navbar from "@/app/components/common/navbar";
import Toolbar from "@/app/components/common/Toolbar";
import SceneContainer from "@/app/components/new-project/SceneContainer";
import DrawingCanvas from "@/app/components/canvas/DrawingCanvas";

const initialScenes = [
  { id: 'scene-1', title: 'Scene 1', shots: [] },
  { id: 'scene-2', title: 'Scene 2', shots: [] },
];

export default function NewProject() {
  const [isDrawingMode, setIsDrawingMode] = useState(true);
  const [scenes, setScenes] = useState(initialScenes);
  const [selectedSceneId, setSelectedSceneId] = useState(initialScenes[0].id);

  const tools_SceneContainer = [
    {
      src: "/tool_icons/new-shot.ico",
      alt: "new shot",
      onClick: () => console.log("New Shot clicked"),
      width: 50,
      height: 30,
    },
    {
      src: "/tool_icons/new-scene.ico",
      alt: "new scene",
      onClick: () => console.log("New Scene clicked"),
      width: 50,
      height: 30,
    },
    {
      src: "/tool_icons/play.ico",
      alt: "play",
      onClick: () => console.log("Play clicked"),
      width: 50,
      height: 30,
    },
  ];

  const tools_DrawingCanvas = [
    {
      src: "/tool_icons/pencil.png",
      alt: "brush",
      onClick: () => console.log("Brush clicked"),
      width: 50,
      height: 30,
    },
    {
      src: "/tool_icons/eraser.png",
      alt: "eraser",
      onClick: () => console.log("Eraser clicked"),
      width: 50,
      height: 30,
    },
    {
      src: "/tool_icons/undo.png",
      alt: "undo",
      onClick: () => console.log("Undo clicked"),
      width: 50,
      height: 30,
    },
    {
      src: "/tool_icons/redo.png",
      alt: "redo",
      onClick: () => console.log("Redo clicked"),
      width: 50,
      height: 30,
    },
    {
      src: "/tool_icons/save.png",
      alt: "save",
      onClick: () => console.log("Save clicked"),
      width: 50,
      height: 30,
    },
  ];

  const toggleMode = () => {
    setIsDrawingMode(!isDrawingMode);
  };

  const handleSaveDrawing = (imageDataUrl, description) => {
    setScenes(
      scenes.map((scene) => {
        if (scene.id === selectedSceneId) {
          return {
            ...scene,
            shots: [
              ...scene.shots,
              { id: `shot-${new Date().getTime()}`, imageDataUrl, description },
            ],
          };
        }
        return scene;
      })
    );
    setIsDrawingMode(false);
  };
  

  return (
    <main>
      <Navbar title="New Project" />
      <div className="main-cont">
        <Toolbar
          tools={isDrawingMode ? tools_DrawingCanvas : tools_SceneContainer}
        />
        <button onClick={toggleMode}>
          {isDrawingMode ? "Switch to Scene Mode" : "Switch to Drawing Mode"}
        </button>
        <div style={{ width: "100vw", height: "80vh" }}>
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
