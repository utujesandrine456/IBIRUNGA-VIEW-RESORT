import type { Metadata } from "next";
import { Afacad } from "next/font/google";
import "./globals.css";

const afacad = Afacad({
  variable: "--font-afacad",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Ibirunga View Resort | Luxury Stay in Musanze",
  description:
    "Your gateway to the volcanoes. Experience comfort, hospitality, and stunning views at Ibirunga View Resort in Musanze, Rwanda.",
  icons: {
    icon: "logo.png",
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className={`${afacad.variable} h-full antialiased`}>
      <body className={`${afacad.className} min-h-full flex flex-col`}>
        {children}
      </body>
    </html>
  );
}
