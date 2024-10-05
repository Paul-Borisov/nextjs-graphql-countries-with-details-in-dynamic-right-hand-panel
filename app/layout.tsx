import localFont from "next/font/local";
import "./globals.css";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
});

//export const dynamic = "force-dynamic"; // This works in layout.tsx as well as in page.tsx
// This is a more elegant solution for PROD builds as any page.tsx that uses this layout will be cached for 15 seconds.
// To cache only specific pages, move this code snippet into corresponding page.tsx
export const revalidate = /^\d+$/.test(process.env.pagecachetimeout || "")
  ? Number(process.env.pagecachetimeout)
  : false;

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable}`}>
        {children}
      </body>
    </html>
  );
}
