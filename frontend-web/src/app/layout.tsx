// frontend-web/app/layout.tsx
import "./globals.css";
import { ReactNode } from "react";
import { AuthProvider } from "../components/AuthProvider";

export const metadata = {
  title: "CaughtUp",
  description: "Stay sharp. Stay informed.",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body className="bg-neutral-100">
        <AuthProvider>
          <main className="min-h-screen flex flex-col items-center justify-center px-6">
            {children}
          </main>
        </AuthProvider>
      </body>
    </html>
  );
}
