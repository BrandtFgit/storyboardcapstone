import Image from "next/image";
import Link from "next/link";

export default function Login() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
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
