"use client";
import Image from "next/image";
import Link from "next/link";
import { useUserAuth } from "./_utils/auth-context";

export default function Login() {
  const { user, gitHubSignIn, firebaseSignOut } = useUserAuth();

  return (
    <main className="main">
      {/* Welcome, {user.displayName} ({user.email}) */}
      <button onClick={gitHubSignIn}>Sign In With Github</button>
      {user == null ? "" : <button onClick={firebaseSignOut}>Sign Out</button>}
      <Image src="/logov2.png" alt="logo" width={600} height={400} />
      {/* <Image src="/Sonic.gif" alt="logo" width={600} height={400} /> */}
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
