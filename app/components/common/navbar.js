"use client";
import Image from "next/image";
import Link from "next/link";
import { useUserAuth } from "../../_utils/auth-context";


export default function Navbar({ title }) {
  const {firebaseSignOut } = useUserAuth();
  const signOutAndRedirect = () => {
    firebaseSignOut()
    window.location.href = '/';
  }
  return (
    <nav className="header">
      <Link href="./homepage">
        <img src="/logov2.png" className="logo" />
      </Link>
      <h1 className="nav-title">{title}</h1>

    <div>  
        <Link href="../../">
          <img src="/logout.ico" className="logout" />
        </Link>   
      <button type="submit" onClick={(signOutAndRedirect)} className="hover:underline">Sign out</button>
    </div>

    </nav>
  );
}
