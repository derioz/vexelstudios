import { ReactNode } from "react";
import { AnimatedNavbar } from "./Navbar";
import { Footer } from "./Footer";

interface LayoutProps {
    children: ReactNode;
}

export function Layout({ children }: LayoutProps) {
    return (
        <div className="flex min-h-screen flex-col bg-brand-black text-white selection:bg-brand-accent selection:text-black">
            <AnimatedNavbar />
            <main className="flex-1 pt-20">
                {children}
            </main>
            <Footer />
        </div>
    );
}
