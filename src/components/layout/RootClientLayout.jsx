"use client";

import { useEffect } from "react";
import Providers from "@/app/providers";
import { ThemeProvider } from "@/components/ThemeProvider";
import Toaster from "@/components/shared/Toaster";
import RouteLoadingBar from "@/components/shared/RouteLoadingBar";
import BetaBadge from "@/components/BetaBadge";

export default function RootClientLayout({ children }) {
    useEffect(() => {
        const handler = (e) => {
            console.error("Global error caught:", e?.error ?? e);
        };
        window.addEventListener("error", handler);
        return () => window.removeEventListener("error", handler);
    }, []);

    return (
        <ThemeProvider>
            <BetaBadge />
            <Toaster />
            <RouteLoadingBar />
            <Providers>{children}</Providers>
        </ThemeProvider>
    );
}
