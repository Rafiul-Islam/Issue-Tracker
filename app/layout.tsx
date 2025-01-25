import {ReactNode} from "react";
import type {Metadata} from "next";
import {Open_Sans} from "next/font/google";
import {Theme} from "@radix-ui/themes";
import Navbar from "@/app/Navbar";
import "@radix-ui/themes/styles.css";
import "./theme-config.css"
import "./globals.css";

const openSans = Open_Sans({
    subsets: ["latin"],
    weight: ["400", "500"],
    display: "swap",
    variable: "--font-openSans",
});

export const metadata: Metadata = {
    title: "Issue Tracker",
    description: "Issue Tracker. Manage your issues with ease.",
};

export default function RootLayout({children}: Readonly<{ children: ReactNode; }>) {
    return (
        <html lang="en">
        <body className={openSans.variable}>
        <Theme accentColor="purple">
            <Navbar/>
            <main className='p-5'>{children}</main>
        </Theme>
        </body>
        </html>
    );
}
