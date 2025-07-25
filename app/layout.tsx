import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { Toaster } from 'react-hot-toast'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
    title: 'Web3 Scrum Poker',
    description: 'Lightweight, transparent and accessible planning poker experience built with Web3 in mind',
}

export default function RootLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <html lang="en">
            <body className={inter.className}>
                {children}
                <Toaster
                    position="top-right"
                    toastOptions={{
                        duration: 4000,
                        style: {
                            background: '#333',
                            color: 'white',
                            borderRadius: '8px',
                            padding: '12px 16px',
                            fontSize: '14px',
                            fontWeight: '500',
                            boxShadow: '0 4px 12px rgba(0, 0, 0, 0.3)',
                            zIndex: 9999,
                        },
                        success: {
                            style: {
                                background: '#10b981',
                                color: 'white',
                            },
                        },
                        error: {
                            style: {
                                background: '#ef4444',
                                color: 'white',
                            },
                        },
                    }}
                />
            </body>
        </html>
    )
} 