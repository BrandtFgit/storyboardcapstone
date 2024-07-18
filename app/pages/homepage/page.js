import Navbar from "@/app/components/common/navbar";

export default function Homepage() {
  return (
    <main>
      <Navbar title="Homepage"></Navbar>
      <div className="main-cont">
        <div className="home-sidebar">
          <ul>
            <li>
              <a className="button" href="./new-project">
                New Project
              </a>
            </li>
          </ul>
        </div>
      </div>
    </main>
  );
}
