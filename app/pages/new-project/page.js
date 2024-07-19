"use client";
import Image from "next/image";
import Navbar from "@/app/components/common/navbar";
import Toolbar from "@/app/components/common/Toolbar";
import SceneContainer from "../../components/new-project/SceneContainer";

export default function NewProject() {
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



  return (
    <main>
      <Navbar title="New Project"></Navbar>{" "}
      {/* later I want to add a title prop so that the name changes to the new name of the project */}
      <div className="main-cont">
        <Toolbar tools={tools_SceneContainer} />

        <div style={{ width: "100vw", height: "80vh" }}>
          <SceneContainer />
        </div>
      </div>
    </main>
  );
}
