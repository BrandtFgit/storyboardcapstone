import Navbar from "@/app/components/common/navbar";

export default function Homepage() {
  return (
    <main className="main">
      <Navbar title="Homepage"></Navbar>
      <div className="main-cont">
        <div className="home-sidebar">
          <ul>
            <li>
              <a className="new-button" href="./new-project">
                + New Project
              </a>
            </li>
            <li>
              <a className="button" href="./new-project">
                Recent Projects
              </a>
            </li>
            <li>
              <a className="button" href="./new-project">
                Collaborate
              </a>
            </li>
            <li>
              <a className="button" href="./new-project">
                Import
              </a>
            </li>
            <li>
              <a className="button" href="./new-project">
                Export
              </a>
            </li>
            <li>
              <a className="button" href="./new-project">
                Library
              </a>
            </li>
            <li>
              <a className="button" href="./new-project">
                Tutorials
              </a>
            </li>
            <li>
              <a className="button" href="./new-project">
                Settings
              </a>
            </li>
            <li>
              <a className="button" href="./new-project">
                Help
              </a>
            </li>
          </ul>
        </div>
      </div>
    </main>
  );
}
