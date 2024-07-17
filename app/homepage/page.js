export default function Homepage() {
  return (
    <main>
      <header className="header">
        <a href="./">
          <img src="/logo.png" alt="logo" height="200" width="200" />
        </a>
        <h1>Overview</h1>
      </header>
      <div className="main-cont">
        <div className="home-sidebar">
          <ul>
            <li className="button">
              <a href="./new-project">New Project</a>
            </li>
          </ul>
        </div>
      </div>
    </main>
  );
}
