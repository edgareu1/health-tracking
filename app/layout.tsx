import { ReactNode } from "react";

import Navbar from "@/components/Navbar";

import "./globals.css";


export type Props = {
  children: ReactNode
}

export default function RootLayout({ children }: Props): ReactNode {
  return (
    <html lang="en">
      <body className="text-black min-h-screen bg-gradient-to-br from-blue via-green">
        <Navbar />

        <main>
          <div className="container md:py-16 py-8 px-4 mx-auto">
            {children}
          </div>
        </main>
      </body>
    </html>
  );
}
