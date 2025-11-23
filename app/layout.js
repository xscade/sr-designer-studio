import { Playfair_Display, Plus_Jakarta_Sans, Cormorant_Garamond } from "next/font/google";
import Navigation from "@/components/Navigation";
import "./globals.css";

// Playfair Display for the Hero H1 - Elegant, tall, and curvy
const playfair = Playfair_Display({
  variable: "--font-serif-hero",
  subsets: ["latin"],
  display: "swap",
});

// Cormorant Garamond for other headings
const cormorant = Cormorant_Garamond({
  variable: "--font-serif-thin",
  subsets: ["latin"],
  display: "swap",
  weight: ["300", "400", "500", "600"],
});

// Plus Jakarta Sans for UI/Body text
const jakarta = Plus_Jakarta_Sans({
  variable: "--font-sans",
  subsets: ["latin"],
  display: "swap",
});

export const metadata = {
  title: "SR Designer Studio | Premium Interior Design in Visakhapatnam",
  description: "Leading interior designers in Visakhapatnam. Experience Apple-level precision, luxury warmth, and AI-powered visualization.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${jakarta.variable} ${playfair.variable} ${cormorant.variable} font-sans antialiased bg-white text-sr-black`}
      >
        <Navigation />
        {children}
      </body>
    </html>
  );
}
