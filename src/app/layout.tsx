// app/[lang]/layout.tsx
import { Provider } from "@/Redux/Provider";
import "./globals.css";
import { Toaster } from "sonner";

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
  params: Promise<{ lang: string }>;
}) {

  return (
    <html lang="de" >
      <body className="bg-[#F8F7FA]" cz-shortcut-listen="true">
        <Provider>
          {children}
          <Toaster position="top-right" richColors />
        </Provider>
      </body>
    </html>

  );
}
