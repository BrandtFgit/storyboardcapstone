"use client";
import React, { useEffect, useState } from "react";
import Navbar from "@/app/components/common/navbar";
import Toolbar from "@/app/components/common/Toolbar";
import SceneContainer from "@/app/components/new-project/SceneContainer";
import DrawingCanvas from "@/app/components/canvas/DrawingCanvas";
import Tools from "@/app/components/common/Tools";
import { collection, setDoc, doc, getDoc } from "firebase/firestore";
import { db } from "@/app/_utils/firebase"; // Ensure you have initialized Firebase and Firestore in this file
import { useUserAuth } from "../../_utils/auth-context";
import PresentationMode from "@/app/components/presentation-mode/PresentationMode";

export default function NewProject() {
  useEffect(() => {
    if (projectId) loadScenes(projectId);
  }, []);

  const loadScenes = async (projectId) => {
    if (!projectId) {
      console.log("no project found");
      return;
    }

    try {
      const docRef = doc(db, "projects", projectId);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        setScenes(docSnap.data().scenes);
        setMode("SCENES");
        setProjectName(docSnap.data().projectName);
        console.log("Scenes successfully loaded!");
      } else {
        console.log("No such document!");
      }
    } catch (e) {
      console.error("Error loading document: ", e);
    }
  };
  const projectId = window.location.href.split("?id=")[1];

  const { user } = useUserAuth();
  const [mode, setMode] = useState("DRAWING"); // DRAWING, SCENES, PRESENTATION
  const [scenes, setScenes] = useState([
    { id: 1, title: "Scene 1", shots: [] },
    { id: 2, title: "Scene 2", shots: [] },
  ]);
  const [sceneCount, setSceneCount] = useState(scenes.length + 1);
  const [selectedSceneId, setSelectedSceneId] = useState(1);
  const [projectName, setProjectName] = useState("");

  const toggleMode = () => {
    if (mode === "DRAWING") {
      setMode("SCENES");
    } else if (mode === "SCENES") {
      setMode("DRAWING");
    }
    // Clear toolbar.
    Tools.clearTools();
  };

  if (mode == "SCENES") {
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
  } else if (mode === "PRESENTATION") {
    // Set tool to escape presentation.

    Tools.setTools([
      {
        src: "/tool_icons/exit.ico",
        alt: "exit presentation",
        onClick: () => setMode("SCENES"),
      },
    ]);
  } else {
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
    setMode("SCENES"); // Switch to Scene Mode after saving
  };

  const saveScenes = async () => {
    if (!projectName) {
      alert("Please enter a project name.");
      return;
    }

    try {
      // Save the scenes object to Firestore with the project name
      if (projectId) {
        const docRef = doc(collection(db, "projects"), projectId);
        await setDoc(docRef, { projectName, scenes, id_user: user.uid });
      } else {
        const docRef = doc(collection(db, "projects"));
        await setDoc(docRef, { projectName, scenes, id_user: user.uid });
      }
      console.log("Scenes successfully written!");
      window.location.href = "/pages/homepage";
    } catch (e) {
      console.error("Error adding document: ", e);
    }
  };

  return (
    <main className="main">
      <Navbar title={projectName ? projectName : "New Project"} />

      <div className="main-cont">
        <Toolbar />
        <div style={{ width: "100%", height: "80%" }}>
          {mode === "DRAWING" && (
            <DrawingCanvas onSaveDrawing={handleSaveDrawing} />
          )}
          {mode === "SCENES" && (
            <SceneContainer scenes={scenes} setScenes={setScenes} />
          )}
          {mode === "PRESENTATION" && <PresentationMode scenes={scenes} />}
        </div>
        <div className="name-input-container">
          <input
            placeholder="Enter project name"
            className="name-input"
            value={projectName}
            onChange={(e) => setProjectName(e.target.value)}
          />
          <div className="button" onClick={saveScenes}>
            {projectId ? "Save Changes" : "Save Project"}
          </div>
        </div>
      </div>
    </main>
  );
}
