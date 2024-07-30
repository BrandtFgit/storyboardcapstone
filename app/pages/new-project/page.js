"use client";
import React, { useState } from "react";
import Navbar from "@/app/components/common/navbar";
import Toolbar from "@/app/components/common/Toolbar";
import SceneContainer from "@/app/components/new-project/SceneContainer";
import DrawingCanvas from "@/app/components/canvas/DrawingCanvas";

export default function NewProject() {
  const [isDrawingMode, setIsDrawingMode] = useState(true);
  const [sceneCount, setSceneCount] = useState(2);
  const [scenes, setScenes] = useState([
    { id: 1, title: "Scene 1", shots: [] },
  ]);
  const [selectedSceneId, setSelectedSceneId] = useState(1);

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
    {
      src: "/tool_icons/play.ico",
      alt: "play",
      onClick: () => console.log("Play clicked"),
      width: 50,
      height: 30,
    },
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
  ];

  const tools_DrawingCanvas = [
    {
      src: "/tool_icons/penciltool.png",
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
    {
      src: "/tool_icons/check.ico",
      alt: "check",
      onClick: () => {
        toggleMode();
        console.log("Check clicked");
      },
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
        <Toolbar
          tools={isDrawingMode ? tools_DrawingCanvas : tools_SceneContainer}
        />
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
