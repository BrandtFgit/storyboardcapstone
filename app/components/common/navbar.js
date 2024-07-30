import Image from "next/image";
import Link from "next/link";

export default function Navbar({ title }) {
  return (
    <nav className="header">
      <Link href="./homepage">
        <img src="/logov2.png" className="logo" />
      </Link>
      <h1 className="nav-title">{title}</h1>
      <Link href="../../">
        <img src="/logout.ico" className="logout" />
      </Link>
    </nav>
  );
}
