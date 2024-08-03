"use client";
import React, { useState } from "react";
import Navbar from "@/app/components/common/navbar";
import Toolbar from "@/app/components/common/Toolbar";
import SceneContainer from "@/app/components/new-project/SceneContainer";
import DrawingCanvas from "@/app/components/canvas/DrawingCanvas";
import Tools from "@/app/components/common/Tools"
import PresentationMode from "@/app/components/presentation-mode/PresentationMode";

export default function NewProject() {
  const [mode, setMode] = useState("DRAWING"); // DRAWING, SCENES, PRESENTATION

  const [scenes, setScenes] = useState([
    { id: 1, title: "Scene 1", shots: [] },
    { id: 2, title: "Scene 2", shots: [] }
  ]);
  const [sceneCount, setSceneCount] = useState(scenes.length+1);

  const [selectedSceneId, setSelectedSceneId] = useState(1);


  const toggleMode = () => {
    if (mode === "DRAWING") {
      setMode("SCENES");
    } else if (mode === "SCENES") {
      setMode("DRAWING");
    }
    // Clear toolbar.
    Tools.clearTools();
  };

  if(mode == "SCENES"){
      Tools.setTools([
        // NEW SHOT TOOL
        {
          src: "/tool_icons/new-shot.ico",
          alt: "new shot",
          onClick: () => {
            toggleMode();
            console.log("New Shot clicked");
          },
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
        },
    
        // PLAY PRESENTATION
        {
          src: "/tool_icons/play.ico",
          alt: "play",
          onClick: () => setMode("PRESENTATION"),
        },
      ]);

    }else if (mode === "PRESENTATION"){
      // Set tool to escape presentation.

      Tools.setTools([
        {
          src: "/tool_icons/exit.ico",
          alt: "exit presentation",
          onClick: () => setMode("SCENES"),
        },
      ]);
    }else{
      Tools.clearTools();
    }


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
    setMode("SCENES");
  };

  return (
    <main className="main">
      <Navbar title="New Project" />
      <div className="main-cont">
        <Toolbar/>
        <div style={{ width: "100%", height: "80%" }}>
          {mode === "DRAWING" && <DrawingCanvas onSaveDrawing={handleSaveDrawing} />}
          {mode === "SCENES" && <SceneContainer scenes={scenes} setScenes={setScenes} />}
          {mode === "PRESENTATION" && <PresentationMode scenes={scenes} />}
        </div>
      </div>
    </main>
  );
}
