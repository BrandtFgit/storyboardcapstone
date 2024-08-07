"use client";
import Link from "next/link";
import { useUserAuth } from "../../_utils/auth-context";

export default function Navbar({ title }) {
  const { firebaseSignOut } = useUserAuth();
  const signOutAndRedirect = () => {
    firebaseSignOut();
    window.location.href = "/";
  };
  return (
    <nav className="header">
      <Link href="./homepage">
        <img src="/logov2.png" className="logo" />
      </Link>
      <h1 className="nav-title">{title}</h1>
      <div className="navbar-buttons">
        <div onClick={signOutAndRedirect} className="button">
          Sign out
        </div>
      </div>
    </nav>
  );
}
