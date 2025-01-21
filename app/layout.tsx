import {ReactNode} from "react";
import type {Metadata} from "next";
import {Open_Sans} from "next/font/google";
import "./globals.css";
import Navbar from "@/app/Navbar";

const openSans = Open_Sans({
    subsets: ["latin"],
    weight: ["400", "500"],
});

export const metadata: Metadata = {
    title: "Issue Tracker",
    description: "Issue Tracker. Manage your issues with ease.",
};

export default function RootLayout({children}: Readonly<{ children: ReactNode; }>) {
    return (
        <html lang="en">
        <body className={openSans.className}>
        <Navbar/>
        <main>{children}</main>
        </body>
        </html>
    );
}
