// app/[lang]/layout.tsx
import { Provider } from "@/Redux/Provider";
import "../globals.css";
import { Toaster } from "sonner";

export default async function RootLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params:Promise< { lang: string }>;
}) {
  const { lang } =await params;

  return (
    <html lang={lang}>
      <body className="bg-[#F8F7FA]">
        <Provider>
          {children}
          <Toaster position="top-right" richColors />
        </Provider>
      </body>
    </html>
  );
}
