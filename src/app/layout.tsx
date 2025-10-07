// app/layout.tsx
import "./globals.css";
import { Provider } from "../Redux/Provider";
import { Toaster } from "sonner";

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="de">
      <body className="bg-[#F8F7FA]">
        <Provider>
          {children}
          <Toaster position="top-right" richColors />
        </Provider>
      </body>
    </html>
  );
}