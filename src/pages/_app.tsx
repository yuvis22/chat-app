import "@/app/globals.css";
import { ClerkProvider } from "@clerk/nextjs";
import { ThemeProvider } from "@/src/components/providers/theme-provider";
import { Toaster } from "@/components/ui/sonner";
import { SocketProvider } from "@/src/components/providers/socket-provider";
import type { AppProps } from "next/app";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <ClerkProvider {...pageProps}>
      <ThemeProvider
        attribute="class"
        defaultTheme="system"
        enableSystem
        disableTransitionOnChange
      >
        <SocketProvider>
          <Component {...pageProps} />
          <Toaster position="top-center" />
        </SocketProvider>
      </ThemeProvider>
    </ClerkProvider>
  );
}
