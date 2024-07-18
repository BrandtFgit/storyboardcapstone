"use client";
import Image from "next/image";
import Navbar from "@/app/components/common/navbar";
import SceneContainer from "../../components/new-project/SceneContainer";

export default function NewProject() {
  return (
    <main>
      <Navbar title="New Project"></Navbar>{" "}
      {/* later I want to add a title prop so that the name changes to the new name of the project */}
      <div className="main-cont">
        <div className="sidebar">
          <Image src="/new-shot.ico" alt="new shot" width={50} height={30} />
          <Image src="/new-scene.ico" alt="new scene" width={50} height={30} />
          <Image src="/play.ico" alt="play" width={50} height={30} />
        </div>

        <div style={{ width: "100vw", height: "80vh" }}>
          <SceneContainer />
        </div>
      </div>
    </main>
  );
}
