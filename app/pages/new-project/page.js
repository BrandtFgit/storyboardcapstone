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
  const [projectId, setProjectId] = useState(null);
  const { user } = useUserAuth();
  const [mode, setMode] = useState("SCENES"); // DRAWING, SCENES, PRESENTATION
  const [scenes, setScenes] = useState([]);
  const [sceneCount, setSceneCount] = useState(scenes.length);
  const [selectedSceneId, setSelectedSceneId] = useState(1);
  const [projectName, setProjectName] = useState("");
  const [shotToEdit, setShotToEdit] = useState(null);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const id = window.location.href.split("?id=")[1];
      setProjectId(id);
    }
  }, []);

  useEffect(() => {
    if (projectId) loadScenes(projectId);
  }, [projectId]);

  const loadScenes = async (projectId) => {
    if (!projectId) {
      console.log("no project found");
      return;
    }

    try {
      const docRef = doc(db, "projects", projectId);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        console.log(docSnap.data().scenes);
        setScenes(docSnap.data().scenes);
        setMode("SCENES");
        setProjectName(docSnap.data().projectName);
        setSceneCount(docSnap.data().scenes.length+1);
        console.log("Scenes successfully loaded!");
        console.log(sceneCount);
      } else {
        console.log("No such document!");
      }
    } catch (e) {
      console.error("Error loading document: ", e);
    }
  };

  const toggleMode = () => {
    setMode((prevMode) => (prevMode === "DRAWING" ? "SCENES" : "DRAWING"));
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
          setSelectedSceneId(sceneCount);
          console.log(sceneCount);
          setScenes([
            ...scenes,
            { id: sceneCount, title: `Scene ${sceneCount}`, shots: [] },
          ]);
          setSceneCount(sceneCount+1);
        },
      },

      // PLAY PRESENTATION
      {
        src: "/tool_icons/play.ico",
        alt: "play",
        onClick: () => setMode("PRESENTATION"),
      },

      // SAVE PROJECT
      {
        src: "/tool_icons/save.ico",
        alt: "save",
        onClick: () => saveScenes(),
      },
    ]);
  } else if (mode === "PRESENTATION") {
    // Set tool to escape presentation.

    Tools.setTools([
      // EXIT PRESENTATION
      {
        src: "/tool_icons/back.ico",
        alt: "back",
        onClick: () => setMode("SCENES"),
      },
    ]);
  } else {
    Tools.clearTools();
  }

  const handleSaveDrawing = (imageDataUrl, description) => {
    setScenes(
        scenes.map((scene, sceneIndex) => {
            if (sceneIndex === selectedSceneId) { // Compare using sceneIndex
                if (shotToEdit != null) {
                    return {
                        ...scene,
                        shots: scene.shots.map((shot, index) => {
                            if (index === shotToEdit.index) {
                                return { ...shot, imageDataUrl, description };
                            }
                            return shot;
                        }),
                    };
                } else {
                    return {
                        ...scene,
                        shots: [...scene.shots, { imageDataUrl, description }],
                    };
                }
            }
            return scene;
        })
    );
    setMode("SCENES"); // Switch to Scene Mode after saving
    setShotToEdit(null);
};

  const saveScenes = async () => {
    if (!projectName) {
      alert("Please enter a project name.");
      return;
    }

    try {
      const docRef = projectId
        ? doc(collection(db, "projects"), projectId)
        : doc(collection(db, "projects"));
      await setDoc(docRef, { projectName, scenes, id_user: user.uid });
      console.log("Scenes successfully written!");
    } catch (e) {
      console.error("Error adding document: ", e);
    }
  };

  const onEditShot = (editShot) => {
    console.log(editShot);
    setShotToEdit(editShot);
    setSelectedSceneId(editShot.sceneIndex);
    console.log(editShot.sceneIndex);
    setMode("DRAWING"); // Switch to DRAWING mode
  };

  return (
    <main className="main">
      <Navbar
        title={projectName}
        editable={true}
        setTitle={setProjectName}
        saveScenes={saveScenes}
      />

      <div className="main-cont">
        <Toolbar />
        <div style={{ width: "100%", height: "100%" }}>
          {mode === "DRAWING" && (
            <DrawingCanvas onSaveDrawing={handleSaveDrawing} shotToEdit = {shotToEdit}/>
          )}
          {mode === "SCENES" && (
            <SceneContainer
              scenes={scenes}
              setScenes={setScenes}
              saveScenes={saveScenes}
              onShotEditPressed={onEditShot}
            />
          )}
          {mode === "PRESENTATION" && <PresentationMode scenes={scenes} />}
        </div>
      </div>
    </main>
  );
}
