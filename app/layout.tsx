import type { Metadata } from "next";
import "./globals.css";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { FloatingWhatsApp } from "@/components/ui/FloatingWhatsApp";
import { ContactPopupModal } from "@/components/contact/ContactPopupModal";

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000"),
  title: {
    default: "Cross Motive Services — We Turn Ideas Into Digital Products",
    template: "%s | Cross Motive Services",
  },
  description:
    "We design, engineer, and launch digital experiences built for real-world impact. Full-stack web platforms, mobile applications, AI products, and enterprise systems.",
  keywords: [
    "digital product studio",
    "software engineering",
    "Next.js web development",
    "React Native mobile apps",
    "AI product development",
    "startup MVP development",
    "enterprise software development",
    "Cross Motive Services",
  ],
  authors: [{ name: "Cross Motive Services" }],
  creator: "Cross Motive Services",
  publisher: "Cross Motive Services",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://crossmotiveservices.com",
    title: "Cross Motive Services — We Turn Ideas Into Digital Products",
    description:
      "From early-stage startup concepts to enterprise-grade platforms, we design, engineer, and launch digital experiences built for real-world impact.",
    siteName: "Cross Motive Services",
  },
  twitter: {
    card: "summary_large_image",
    title: "Cross Motive Services — Digital Product Engineering",
    description:
      "From early-stage startup concepts to enterprise platforms, we design, engineer, and launch digital products.",
  },
  icons: {
    icon: [
      { url: '/favicon.png', type: 'image/png' },
      { url: '/favicon.ico' },
      { url: '/icon.png', type: 'image/png' },
    ],
    shortcut: '/favicon.png',
    apple: '/favicon.png',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "Cross Motive Services",
    url: "https://crossmotiveservices.com",
    logo: "https://crossmotiveservices.com/logo.svg",
    description:
      "Technology and digital product development company turning ideas into functional digital products.",
    email: "sahith@crossmotiveservices.com",
    sameAs: [
      "https://github.com",
      "https://linkedin.com",
      "https://x.com",
    ],
  };

  return (
    <html lang="en" className="h-full">
      <head>
        <link rel="icon" type="image/png" href="/favicon.png" />
        <link rel="shortcut icon" href="/favicon.ico" />
        <link rel="apple-touch-icon" href="/favicon.png" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&family=JetBrains+Mono:wght@400;500;600&family=Plus+Jakarta+Sans:wght@400;500;600;700;800&display=swap"
          rel="stylesheet"
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="flex flex-col min-h-screen">
        <Navbar />
        <main className="flex-1">{children}</main>
        <Footer />
        <FloatingWhatsApp />
        <ContactPopupModal />
      </body>
    </html>
  );
}
