import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Sidebar from "@/components/Sidebar";

export const metadata: Metadata = {
  title: "Math Star Dashboard",
  description: "A fun learning platform for kids!",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const user = {
    name: "Emma",
    avatarUrl: "https://i.pravatar.cc/58?u=emma",
    stars: 1250,
    starStreak: "1 month Star",
  };

  return (
    <html lang="en">
      <body className="bg-[#F8F7FA]">
        <div className="flex">
          <Sidebar />
          <div className="flex-1 p-7">
            <Navbar user={user} />
            <main className="mt-6">{children}</main>
          </div>
        </div>
      </body>
    </html>
  );
}