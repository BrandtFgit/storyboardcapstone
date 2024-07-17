import Image from "next/image";

export default function Navbar({ title }) {
  return (
    <nav className="header">
      <Image src="/logo.png" alt="logo" width={200} height={30} />
      <h1>{title}</h1>
    </nav>
  );
}
