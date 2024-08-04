"use client";
import Navbar from "@/app/components/common/navbar";
import {collection, deleteDoc, getDocs, query, where, doc } from "firebase/firestore";
import { useState, useEffect } from "react";
import {db} from '@/app/_utils/firebase';
import { useUserAuth } from "@/app/_utils/auth-context"; 

export default function Homepage() {
  const { user } = useUserAuth();
  const [savedProjects, setSavedProjects] = useState([]);
  const fetchProjects = async () => {
  const projectQuery = query(collection(db, "projects"), where("id_user", "==", user.uid));

  await getDocs(projectQuery)
      .then((querySnapshot)=>{
          const newData = querySnapshot.docs.map((doc) => ({...doc.data(), id:doc.id }));
          setSavedProjects(newData);
          console.log(newData);
      })
  }
  const deleteDocument = async (event) => 
  {
    const idDoc = event.currentTarget.getAttribute('data-key');
    await deleteDoc(doc(db, "projects", idDoc));
    window.location.href = '/pages/homepage'

  }
  useEffect(() => {
    if(!savedProjects.length && user) 
      fetchProjects()
  }, user);


  return (
    <main className="main">
      <Navbar title="Homepage"></Navbar>
      <div className="main-cont">
        <div className="home-sidebar">
          <ul>
            <li><a className="new-button" href="./new-project">+ New Project</a></li>
            <h3>Saved Projects</h3>
            {savedProjects.map(project => <div className="saved-project"><a className="button" href={`./new-project?id=${project.id}`}>{project.projectName}</a><span className="button delete" data-key={project.id} onClick={deleteDocument}>Delete</span></div>)}
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
