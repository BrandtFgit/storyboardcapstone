"use client"
import SceneContainer from './components/SceneContainer';

export default function NewProject() {
  return (
    <main>
      <header className="header">
        <a href="./homepage">
          <img src="/logo.png" alt="logo" height="200" width="200" />
        </a>
        <h1>New Project</h1>
      </header>
      <div className="main-cont">
        <div className="sidebar"></div>
        <SceneContainer />
      </div>
    </main>
  );
}
