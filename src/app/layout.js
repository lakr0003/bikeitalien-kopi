import { Inter } from "next/font/google";
import PageLoader from "./components/PageLoader";

// import "./reset.css";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export const metadata = {
  title: "BikeItalien",
  description: "By Lærke, Helene & Klara",
  robots: {
    index: false,
    follow: false,
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="da">
      <body
        suppressHydrationWarning
        className={`${inter.variable} antialiased`}
      >
        {/* <PageLoader /> */}
        <main className="flex-1">{children}</main>
      </body>
    </html>
  );
}
