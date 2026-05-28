import { Inter } from "next/font/google";

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
    // <html lang="en" className={`${inter.variable} h-full antialiased`}>
    //   <body className="flex min-h-full flex-col">{children}</body>
    // </html>
    <html lang="da">
      <body
        suppressHydrationWarning
        className={`${inter.variable} antialiased`}
      >
        <main className="flex-1">{children}</main>
      </body>
    </html>
  );
}
