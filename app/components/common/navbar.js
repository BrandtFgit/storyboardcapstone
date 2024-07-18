import Image from "next/image";

export default function Navbar({ title }) {
  return (
    <nav className="header">
      <a href="./homepage">
        <Image src="/logov2.png" alt="logo" width={200} height={30} />
      </a>
      <h1 className="nav-title">{title}</h1>
      <a href="../../">
        <Image src="/logout.ico" alt="logout" width={50} height={30} />
      </a>
    </nav>
  );
}
