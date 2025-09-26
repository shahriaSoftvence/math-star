// src/app/layout.tsx
import type { Metadata } from "next";
import "./globals.css";
import { Provider } from "../Redux/Provider";
import { Toaster } from "sonner";

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
      <body className="bg-[#F8F7FA]" cz-shortcut-listen="true">

        <Provider>
          {children}
          <Toaster position="top-right" richColors />
        </Provider>
      </body>
    </html>
  );
}



