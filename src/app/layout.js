import { Inter } from "next/font/google";
import "./globals.css";
import TransitionProvider from "@/components/transitionProvider";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Keyun Portfolio App",
  description: "React native portfolio app",
  
  // =========================================
  // APPLE (iOS) CONFIGURATION
  // =========================================
  appleWebApp: {
    capable: true,
    statusBarStyle: 'black-translucent',
    title: 'Keyun Portfolio',
  },
  
  // =========================================
  // ANDROID & PWA CONFIGURATION
  // =========================================
  manifest: '/manifest.json', // Optional: for PWA support
  
  // Other metadata
  applicationName: 'Keyun Portfolio',
  formatDetection: {
    telephone: false,
  },
};

// =========================================
// VIEWPORT - CRITICAL FOR BOTH iOS & ANDROID
// =========================================
export const viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
  userScalable: true,
  viewportFit: 'cover', // iOS: extends into safe areas
  
  // Theme color for status bar (works on both iOS Safari & Android Chrome)
  themeColor: '#020208',
  
  // Color scheme preference
  colorScheme: 'dark',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="bg-[#020208]">
      <head>
        {/* =========================================
            iOS STATUS BAR
            ========================================= */}
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
        <meta name="apple-mobile-web-app-title" content="Keyun Portfolio" />
        
        {/* =========================================
            ANDROID STATUS BAR & NAVIGATION BAR
            Theme-color controls status bar on Android Chrome
            ========================================= */}
        <meta name="theme-color" content="#020208" />
        <meta name="color-scheme" content="dark" />
        
        {/* Android specific - helps with PWA status bar */}
        <meta name="mobile-web-app-capable" content="yes" />
        
        {/* =========================================
            MICROSOFT / WINDOWS
            ========================================= */}
        <meta name="msapplication-navbutton-color" content="#020208" />
        <meta name="msapplication-TileColor" content="#020208" />
        <meta name="msapplication-TileImage" content="/icon-192.png" />
        
        {/* =========================================
            UNIVERSAL DARK MODE SUPPORT
            ========================================= */}
        <meta name="supported-color-schemes" content="dark" />
        
        {/* Prevent white flash while loading */}
        <style dangerouslySetInnerHTML={{ __html: `
          html, body { 
            background-color: #020208 !important; 
          }
        `}} />
      </head>
      <body className={`${inter.className} bg-[#020208] antialiased`}>
        <TransitionProvider>{children}</TransitionProvider>
      </body>
    </html>
  );
}