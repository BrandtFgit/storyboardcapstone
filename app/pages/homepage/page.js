"use client";
import Navbar from "@/app/components/common/navbar";
import {collection, getDocs } from "firebase/firestore";
import { useState, useEffect } from "react";
import {db} from '@/app/_utils/firebase';



export default function Homepage() {
  const [savedProjects, setSavedProjects] = useState([]);
  const fetchProjects = async () => {
    await getDocs(collection(db, "projects"))
        .then((querySnapshot)=>{
            const newData = querySnapshot.docs.map((doc) => ({...doc.data(), id:doc.id }));
            setSavedProjects(newData);
            console.log(newData);
        })
    }
  useEffect(() => {
    if(!savedProjects.length) 
      fetchProjects()
  });

  return (
    <main className="main">
      <Navbar title="Homepage"></Navbar>
      <div className="main-cont">
        <div className="home-sidebar">
          <ul>
            <li><a className="new-button" href="./new-project">+ New Project</a></li>
            <h3>Saved Projects</h3>
            {savedProjects.map(project => <div><a className="button" href={`./new-project?id=${project.id}`}>{project.projectName}</a></div>)}
            {/* <li><a className="button" href="./new-project">Load Project</a></li>
            <li><a className="button" href="./new-project">Recent Projects</a></li>
            <li><a className="button" href="./new-project">Collaborate</a></li>
            <li><a className="button" href="./new-project">Import</a></li>
            <li><a className="button" href="./new-project">Export</a></li>
            <li><a className="button" href="./new-project">Library</a></li>
            <li><a className="button" href="./new-project">Tutorials</a></li>
            <li><a className="button" href="./new-project">Settings</a></li>
            <li><a className="button" href="./new-project">Help</a></li> */}
          </ul>
        </div>
      </div>
    </main>
  );
}