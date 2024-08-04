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
   
    const redirectUserToHomepage = () =>
    {
      window.location.href = '/pages/homepage'
    }
 

  return (
    <main className="main">
      <img src="/logov2.png" alt="logo" width={600} height={400}/>
      {user ? 
        redirectUserToHomepage() :
        <div>
        <div onClick={gitHubSignIn}   className="button">Sign in with Github</div>
        <ul>
        <li>
          {/* <Link href="pages/canvas">Canvas</Link> */}
        </li>
      </ul>
        </div>}
    </main>
  );
}