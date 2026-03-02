import "./globals.css";
import React, { ReactNode } from 'react';
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";

interface RootLayoutProps {
  children: ReactNode; // Define the type for children
}

const RootLayout: React.FC<RootLayoutProps> = ({ children }) => {
  return (
    <html lang="en">
      <head>
          <meta charSet="UTF-8"></meta>
          <meta name="viewport" content="width=device-width, initial-scale=1.0"></meta>
          <title>Blog legend</title>
      </head>

      <body>
        <Nav></Nav>
        <main>
          {children}
        </main>
        <Footer></Footer>
      </body>
    </html>
  );
}
export default RootLayout