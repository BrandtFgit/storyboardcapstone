"use client";
import Link from "next/link";
import { useUserAuth } from "../../_utils/auth-context";
import { useState } from "react";

export default function Navbar({
  title,
  editable = false,
  setTitle,
  saveScenes,
}) {
  const { firebaseSignOut } = useUserAuth();
  const [edit, setEdit] = useState(false);
  const signOutAndRedirect = () => {
    firebaseSignOut();
    if (typeof window !== "undefined") {
    window.location.href = "/";
    }
  };
  const renderTitle = () => {
    if (edit && editable) {
      return (
        <>
          <div className="nav-title-container">
            <input
              className="name-input"
              value={title}
              onChange={(e) => {
                setTitle(e.target.value);
              }}
            />
          </div>
          <div className="navbar-buttons">
            <button
              className="button"
              onClick={() => {
                setEdit(!edit);
                saveScenes();
              }}
            >
              Save
            </button>
            <div onClick={signOutAndRedirect} className="button">
              Sign out
            </div>
          </div>
        </>
      );
    } else {
      return (
        <>
          <div className="nav-title-container">
            <h1 className="nav-title">{title ? title : "New Project"}</h1>
          </div>
          <div className="navbar-buttons">
            {editable && (
              <button
                className="button"
                onClick={() => {
                  setEdit(!edit);
                }}
              >
                Edit Title
              </button>
            )}
            <div onClick={signOutAndRedirect} className="button">
              Sign out
            </div>
          </div>
        </>
      );
    }
  };
  // wrap h1 and button in a div and have that div be absolute and center it and take absolute off of h1
  return (
    <nav className="header">
      <Link href="./homepage">
        <img src="/logov2.png" className="logo" />
      </Link>
      {renderTitle()}
    </nav>
  );
}
