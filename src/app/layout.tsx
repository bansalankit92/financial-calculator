import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import Script from "next/script";
import "./globals.css";
import AppLayout from "../components/AppLayout";

const inter = Inter({ subsets: ["latin"] });

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  themeColor: "#2563eb"
};

export const metadata: Metadata = {
  title: "My Financial Calculator",
  description: "Calculate SIP, EMI, Income Tax, and more",
  manifest: "/manifest.json",
  icons: {
    icon: [
      { url: "/assets/icons/icon-72x72.png", sizes: "72x72", type: "image/png" },
      { url: "/assets/icons/icon-96x96.png", sizes: "96x96", type: "image/png" },
      { url: "/assets/icons/icon-128x128.png", sizes: "128x128", type: "image/png" },
      { url: "/assets/icons/icon-144x144.png", sizes: "144x144", type: "image/png" },
      { url: "/assets/icons/icon-152x152.png", sizes: "152x152", type: "image/png" },
      { url: "/assets/icons/icon-192x192.png", sizes: "192x192", type: "image/png" },
      { url: "/assets/icons/icon-384x384.png", sizes: "384x384", type: "image/png" },
      { url: "/assets/icons/icon-512x512.png", sizes: "512x512", type: "image/png" }
    ],
    apple: [
      { url: "/assets/icons/icon-152x152.png" }
    ],
    shortcut: ["/favicon.ico"]
  },
  appleWebApp: {
    capable: true,
    statusBarStyle: "default",
    title: "Financial Calculator"
  }
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <AppLayout>{children}</AppLayout>
        {/* Load third-party scripts properly */}
        <Script
          strategy="afterInteractive"
          src="https://www.googletagmanager.com/gtag/js?id=G-D0QRFN4X4Z"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-D0QRFN4X4Z');
          `}
        </Script>
      </body>
    </html>
  );
}
