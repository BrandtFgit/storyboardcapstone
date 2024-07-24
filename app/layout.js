import { Inter } from "next/font/google";
import "./globals.css";
import { AuthContextProvider } from "./_utils/auth-context";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "SceneSeam",
  description: "Create Storyboards Seamlessly",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
     <AuthContextProvider> <body className={inter.className}>{children}</body></AuthContextProvider>
    </html>
  );
}