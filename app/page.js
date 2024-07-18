import Image from "next/image";
import Link from "next/link";

export default function Login() {
  return (
    <main className="login-cont">
      <Image src="/logov2.png" alt="logo" width={600} height={400} />
      <ul>
        <li>
          {" "}
          <Link href="pages/new-project">New Project</Link>{" "}
        </li>
        <li>
          {" "}
          <Link href="pages/canvas">Canvas</Link>{" "}
        </li>
        <li>
          {" "}
          <Link href="pages/homepage">Homepage</Link>{" "}
        </li>
      </ul>
    </main>
  );
}
