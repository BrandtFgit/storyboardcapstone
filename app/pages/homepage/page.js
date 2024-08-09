"use client";
import Navbar from "@/app/components/common/navbar";
import {
  collection,
  deleteDoc,
  getDocs,
  query,
  where,
  doc,
} from "firebase/firestore";
import { useState, useEffect } from "react";
import { db } from "@/app/_utils/firebase";
import { useUserAuth } from "@/app/_utils/auth-context";

export default function Homepage() {
  const { user } = useUserAuth();
  const [savedProjects, setSavedProjects] = useState([]);
  const fetchProjects = async () => {
    const projectQuery = query(
      collection(db, "projects"),
      where("id_user", "==", user.uid)
    );

    await getDocs(projectQuery).then((querySnapshot) => {
      const newData = querySnapshot.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      }));
      setSavedProjects(newData);
      console.log(newData);
    });
  };
  const deleteDocument = async (event) => {
    const idDoc = event.currentTarget.getAttribute("data-key");
    await deleteDoc(doc(db, "projects", idDoc));
    if (typeof window !== "undefined") {
      window.location.href = "/pages/homepage";
    }
  };
  useEffect(() => {
    if (!savedProjects.length && user) fetchProjects();
  }, [user, savedProjects.length, fetchProjects]);

  return (
    <main className="main">
      <Navbar title="Homepage"></Navbar>
      <div className="main-cont">
        <div className="home-sidebar">
          <ul className="sidebar-elements">
            <li>
              <a className="new-button" href="./new-project">
                + New Project
              </a>
            </li>
            <h3>Saved Projects</h3>
            {savedProjects.map((project) => (
              <div key={project.id} className="saved-project card">
                <div className="card-header">
                  <h3>{project.projectName}</h3>
                  <span
                    className="delete"
                    data-key={project.id}
                    onClick={deleteDocument}
                  >
                    X
                  </span>
                </div>
                <div className="card-content">
                  <a className="button" href={`./new-project?id=${project.id}`}>
                    Open
                  </a>
                </div>
              </div>
            ))}
          </ul>
        </div>
        <div className="home-main">
          <h1>Welcome To SceneSeam!</h1>
          <p>
            SceneSeam is a platform for creating storyboards for your next
            project. Get started by creating a new project or opening a saved
            one.
          </p>
          <h2>Some Key Features:</h2>
          <div className="features">
            <div className="feature">
              <img src="/drawing.png" alt="SceneSeam Drawing" />
              <p>Draw your Shots with ease!</p>
            </div>
            <div className="feature">
              <img src="/scene-man.png" alt="SceneSeam Scene Management" />
              <p>Arrange and Sort out your Scenes and Shots!</p>
            </div>
            <div className="feature">
              <img src="/present.png" alt="SceneSeam Presentation Mode" />
              <p>Present your Storyboard in a clean and organized way!</p>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
