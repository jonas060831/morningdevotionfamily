
import type { Metadata } from "next";
import { Inter, Poiret_One, Montserrat, Poller_One } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/navbar/Navbar";
import { SystemMessageProvider } from "@/components/modals/notification/systemMessage/SystemMessageManager";
import LeftSideNav from "@/components/navbar/LeftSideNav";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"]
})

const poiretOne = Poiret_One({
  variable: "--font-poiretOne",
  subsets: ["latin"],
  weight: '400'
})

const montserrat = Montserrat({
  variable: "--font-montserrat",
  subsets: ["latin"]
})

const pollerOne = Poller_One({
  variable: "--font-pollerOne",
  subsets: ["latin"],
  weight: '400'
})

export const metadata: Metadata = {
  title: "Morning Devotion Family",
  description: "Morning Devotion Family is a welcoming non-denominational church dedicated to helping people grow in faith, experience God’s love, and build strong community. Through inspiring worship, prayer, and outreach, we unite believers of all backgrounds to live out daily devotion and make a positive impact.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <meta name="theme-color" content="#262626"/>
      </head>

      <body
       className={`${inter.variable} ${poiretOne.variable} ${montserrat.variable} ${pollerOne.variable} container`}
      >
        
        <SystemMessageProvider>

          <Navbar />

          <div className="container">
            
            {children}

          </div>

          

        </SystemMessageProvider>
      </body>
    </html>
  );
}
