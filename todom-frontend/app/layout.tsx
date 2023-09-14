import './globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import { ThemeProvider } from "@/components/theme-provider"

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'MA TODO',
  description: 'A simple todo app',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={`${inter.className} flex flex-col min-h-screen`}>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <div className="flex-grow">
            {children}
          </div>
          <footer className="container flex flex-wrap items-center justify-center px-1 py-3 mx-auto lg:justify-between">
            <p>Created by Manik</p>
          </footer>
        </ThemeProvider>
      </body>
    </html>
  )  
}
