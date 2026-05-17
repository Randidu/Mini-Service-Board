import { Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import { Toaster } from "react-hot-toast";

const inter = Inter({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "ServiceBoard — Service Request Management",
  description:
    "A modern service request board for managing and tracking maintenance jobs, repairs, and tasks.",
};

export default function RootLayout({ children }) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${jetbrainsMono.variable} h-full antialiased`}
      style={{ colorScheme: 'light' }}
    >
      <body className="min-h-full flex flex-col bg-slate-50" style={{ backgroundColor: '#f8fafc', color: '#0f172a' }}>
        <Toaster
          position="top-right"
          toastOptions={{
            duration: 3000,
            style: {
              background: "#ffffff",
              color: "#0f172a",
              border: "1px solid #e2e8f0",
              borderRadius: "12px",
              fontSize: "14px",
              boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.05), 0 2px 4px -1px rgba(0, 0, 0, 0.03)"
            },
            success: {
              iconTheme: { primary: "#6366f1", secondary: "#fff" },
            },
            error: {
              iconTheme: { primary: "#f43f5e", secondary: "#fff" },
            },
          }}
        />
        <Navbar />
        <main className="flex-1">{children}</main>
      </body>
    </html>
  );
}
