// src/app/(app)/layout.tsx
import Navbar from "@/components/Navbar";
import Sidebar from "@/components/Sidebar";

export default function AppLayout({
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
    <div className="flex">
      <Sidebar />
      <div className="flex-1 p-7">
        <Navbar user={user} />
        <main className="mt-6">{children}</main>
      </div>
    </div>
  );
}