import Navbar from "@/components/Navbar";

import "./globals.css";

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="bg-white text-blue-dark">
        <Navbar />

        <main>
          <div className="container px-2 mx-auto">
            {children}
          </div>
        </main>
      </body>
    </html>
  );
}
