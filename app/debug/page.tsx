'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'

export default function DebugPage() {
    const router = useRouter()
    const [localStorageData, setLocalStorageData] = useState<any>({})

    useEffect(() => {
        const data = {
            displayName: localStorage.getItem('displayName'),
            walletAddress: localStorage.getItem('walletAddress'),
            ensName: localStorage.getItem('ensName'),
            cameFromModal: localStorage.getItem('cameFromModal'),
            currentRoomCode: localStorage.getItem('currentRoomCode'),
            roomSettings: localStorage.getItem('roomSettings')
        }
        setLocalStorageData(data)
    }, [])

    const clearAll = () => {
        localStorage.clear()
        setLocalStorageData({})
    }

    const clearWallet = () => {
        localStorage.removeItem('walletAddress')
        localStorage.removeItem('ensName')
        localStorage.removeItem('cameFromModal')
        setLocalStorageData({
            ...localStorageData,
            walletAddress: null,
            ensName: null,
            cameFromModal: null
        })
    }

    return (
        <div className="min-h-screen bg-white p-8">
            <div className="max-w-4xl mx-auto">
                <h1 className="text-3xl font-bold mb-8">Debug Page</h1>

                <div className="mb-8">
                    <h2 className="text-xl font-bold mb-4">LocalStorage Data:</h2>
                    <pre className="bg-gray-100 p-4 rounded-lg overflow-auto">
                        {JSON.stringify(localStorageData, null, 2)}
                    </pre>
                </div>

                <div className="flex gap-4 mb-8">
                    <button
                        onClick={clearAll}
                        className="bg-red-500 text-white px-4 py-2 rounded"
                    >
                        Clear All
                    </button>
                    <button
                        onClick={clearWallet}
                        className="bg-orange-500 text-white px-4 py-2 rounded"
                    >
                        Clear Wallet Data
                    </button>
                    <button
                        onClick={() => router.push('/')}
                        className="bg-blue-500 text-white px-4 py-2 rounded"
                    >
                        Go Home
                    </button>
                </div>

                <div className="grid grid-cols-2 gap-4">
                    <div>
                        <h3 className="text-lg font-bold mb-2">Test Links:</h3>
                        <div className="space-y-2">
                            <a href="/" className="block text-blue-500 hover:underline">Home</a>
                            <a href="/room/create" className="block text-blue-500 hover:underline">Try It Free</a>
                            <a href="/auth/wallet" className="block text-blue-500 hover:underline">Connect Wallet</a>
                            <a href="/room/create?mode=wallet" className="block text-blue-500 hover:underline">Room Create (Wallet Mode)</a>
                        </div>
                    </div>

                    <div>
                        <h3 className="text-lg font-bold mb-2">Expected Flows:</h3>
                        <div className="text-sm space-y-1">
                            <p><strong>Try It Free:</strong> Home → /room/create</p>
                            <p><strong>Connect Wallet:</strong> Home → /auth/wallet → /room/create?mode=wallet</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
} 