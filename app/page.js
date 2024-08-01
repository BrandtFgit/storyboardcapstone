"use client";
import Image from "next/image";
import Link from "next/link";
import { useUserAuth } from "./_utils/auth-context";
import { collection, getDocs, addDoc } from "firebase/firestore";
import {db} from './_utils/firebase';

 
export default function Login() {
  const { user, gitHubSignIn, firebaseSignOut } = useUserAuth();

  const fetchProjects = async () => {
    await getDocs(collection(db, "projects"))
        .then((querySnapshot)=>{
            const newData = querySnapshot.docs.map((doc) => ({...doc.data(), id:doc.id }));

            console.log(newData);
        })
    }

    const addProject = async (e) => {
      e.preventDefault();
      try {
          const docRef = await addDoc(collection(db, "projects"), {
            project: "TEST",
          });
          console.log("Document written with ID: ", docRef.id);
        } catch (e) {
          console.error("Error adding document: ", e);
        }
  }

  return (
    <main className="main">
      
      <button onClick={fetchProjects}>Fetch</button>
      <button onClick={addProject}>Add</button>

      <Image src="/logov2.png" alt="logo" width={600} height={400} />
      {user ? 
        <div>
        <button type="submit" onClick={firebaseSignOut} className="hover:underline">Sign out</button>
        <ul>
        <li>
          {" "}
          <Link href="pages/new-project">New Project</Link>{" "}
        </li>
        <li>
          {" "}
          <Link href="pages/canvas">Canvas</Link>{" "}
        </li>
        <li>
          {" "}
          <Link href="pages/homepage">Homepage</Link>{" "}
        </li>
        </ul>
        </div> :
        <div>
        <button type="submit" onClick={gitHubSignIn}   className="hover:underline">Sign in with Github to continue</button>
        <ul>
        <li>
          {" "}
          <Link href="pages/canvas">Canvas</Link>{" "}
        </li>
      </ul>
        </div>}
    </main>
  );
}