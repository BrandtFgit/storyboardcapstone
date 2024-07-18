import Image from "next/image";
import Link from 'next/link';

export default function Navbar({ title }) {
  return (
    <nav className="header">
      <Link href="./homepage">
        <Image src="/logov2.png" alt="logo" width={200} height={30} />
      </Link>
      <h1 className="nav-title">{title}</h1>
      <Link href="../../">
          <Image src="/logout.ico" alt="logout" width={50} height={30} />
      </Link>
    </nav>
  );
}
