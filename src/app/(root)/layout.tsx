// src/app/layout.tsx
import type { Metadata } from "next";
import Header from "@/components/landing/Header";
import Footer from "@/components/landing/Footer";

export const metadata: Metadata = {
  title: "Math Star",
  description: "A fun learning platform for kids!",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="bg-[#F8F7FA]">
            <Header />
          {children}
           <Footer />
      </body>
    </html>
  );
}