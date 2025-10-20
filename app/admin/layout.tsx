"use client";
import AdminNavbar from "@/components/navbar/AdminNavbar";
import LeftSideNav from "@/components/navbar/LeftSideNav";
import RightSideNav from "@/components/navbar/RightSideNav";
import { AuthProvider } from "../context/Authcontext";
import { LayoutProvider } from "../context/LayoutProvider";
import { usePathname } from "next/navigation";
import { Inter, Montserrat, Poiret_One, Poller_One } from "next/font/google";
import './globals.css'

const inter = Inter({ variable: "--font-inter", subsets: ["latin"] });
const poiretOne = Poiret_One({ variable: "--font-poiretOne", subsets: ["latin"], weight: "400" });
const montserrat = Montserrat({ variable: "--font-montserrat", subsets: ["latin"] });
const pollerOne = Poller_One({ variable: "--font-pollerOne", subsets: ["latin"], weight: "400" });

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const showNavs = !pathname.startsWith("/admin/login") && !pathname.startsWith("/admin/signup");

  return (
    <AuthProvider>
      <LayoutProvider>
        <div className={`${inter.variable} ${poiretOne.variable} ${montserrat.variable} ${pollerOne.variable} container`}>
          {showNavs && <AdminNavbar />}

          <div className="main-layout">
            {showNavs && <LeftSideNav />}
            <main className="content">{children}</main>
            {showNavs && <RightSideNav />}
          </div>
        </div>
      </LayoutProvider>
    </AuthProvider>
  );
}
