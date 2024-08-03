"use client";
import "./globals.css"; 
import Image from "next/image";
import Link from "next/link";
import { useUserAuth } from "./_utils/auth-context";
import { collection, addDoc } from "firebase/firestore";
import {db} from './_utils/firebase';
import "./globals.css";


 
export default function Login() {
  const { user, gitHubSignIn } = useUserAuth();
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
    const redirectUserToHomepage = () =>
    {
      window.location.href = '/pages/homepage'
    }
 

  return (
    <main className="main">
       <button onClick={addProject}>Add</button>

      <img src="/logov2.png" alt="logo" width={600} height={400}/>
      {user ? 
        redirectUserToHomepage() :
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