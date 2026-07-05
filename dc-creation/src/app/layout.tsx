import type { Metadata } from "next";
import { Playfair_Display, Poppins } from "next/font/google";
import "./globals.css";
import LoadingScreen from "@/components/LoadingScreen";
import { Toaster } from "sonner";

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
});
const poppins = Poppins({
  weight: ["300", "400", "500", "600", "700"],
  subsets: ["latin"],
  variable: "--font-poppins",
});

export const metadata: Metadata = {
  title: {
    default: "DC Creation – Where Art Meets Emotion",
    template: "%s | DC Creation",
  },
  description:
    "Premium Photography & Videography studio in Viluppuram. Wedding, candid, drone, and design services.",
  openGraph: {
    type: "website",
    siteName: "DC Creation",
    images: ["/og-image.jpg"],
  },
  twitter: { card: "summary_large_image" },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${playfair.variable} ${poppins.variable}`}
    >
      <body>
        <LoadingScreen />
        {children}
         <Toaster
    position="top-right"
    richColors
    closeButton
    duration={3000}
  />
      </body>
    </html>
  );
}