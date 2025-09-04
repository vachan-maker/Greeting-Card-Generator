import "./globals.css";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Onam Greeting Cards",
  description: "Create and share beautiful Happy Onam greetings"
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="bg-yellow-50 text-gray-800">
        {children}
      </body>
    </html>
  );
}
