'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { User, X, Sparkles, Wallet, Users } from 'lucide-react'
import { User as UserType } from '@/types'

interface DisplayNameModalProps {
    isOpen: boolean
    onClose: () => void
    onSubmit: (name: string) => void
    user?: UserType | null
    isGuest: boolean
    ensName?: string
    walletAddress?: string
}

export function DisplayNameModal({ isOpen, onClose, onSubmit, user, isGuest, ensName, walletAddress }: DisplayNameModalProps) {
    const [displayName, setDisplayName] = useState('')
    const [isSubmitting, setIsSubmitting] = useState(false)
    const [useAnonymous, setUseAnonymous] = useState(false)

    const generateRandomName = () => {
        const adjectives = ['Swift', 'Bright', 'Clever', 'Bold', 'Wise', 'Quick', 'Smart', 'Sharp', 'Agile', 'Nimble', 'Dynamic', 'Vibrant']
        const animals = ['Fox', 'Wolf', 'Eagle', 'Lion', 'Bear', 'Tiger', 'Hawk', 'Owl', 'Koala', 'Panda', 'Dragon', 'Phoenix']
        const randomNum = Math.floor(Math.random() * 100)

        const adjective = adjectives[Math.floor(Math.random() * adjectives.length)]
        const animal = animals[Math.floor(Math.random() * animals.length)]

        return `${adjective}${animal}${randomNum}`
    }

    useEffect(() => {
        if (user?.name) {
            setDisplayName(user.name)
        } else if (ensName && !isGuest) {
            // Auto-fill ENS name for wallet users
            setDisplayName(ensName)
        } else if (isGuest) {
            // Auto-generate random name for guests
            setDisplayName(generateRandomName())
        }
    }, [user, ensName, isGuest])

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()

        if (useAnonymous) {
            onSubmit('Anonymous')
            return
        }

        if (!displayName.trim()) return

        setIsSubmitting(true)
        try {
            await onSubmit(displayName.trim())
        } finally {
            setIsSubmitting(false)
        }
    }

    const handleAnonymous = () => {
        setUseAnonymous(true)
        onSubmit('Anonymous')
    }

    const getWalletDisplayInfo = () => {
        if (ensName) {
            return {
                title: 'Your ENS Name',
                subtitle: `Found: ${ensName}`,
                icon: <Sparkles className="w-4 h-4" />,
                color: 'text-green-400'
            }
        } else if (walletAddress) {
            return {
                title: 'Your Wallet Address',
                subtitle: `${walletAddress.slice(0, 6)}...${walletAddress.slice(-4)}`,
                icon: <Wallet className="w-4 h-4" />,
                color: 'text-blue-400'
            }
        }
        return null
    }

    const walletInfo = getWalletDisplayInfo()

    return (
        <AnimatePresence>
            {isOpen && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
                >
                    <motion.div
                        initial={{ scale: 0.9, opacity: 0, rotateX: -10 }}
                        animate={{ scale: 1, opacity: 1, rotateX: 0 }}
                        exit={{ scale: 0.9, opacity: 0, rotateX: -10 }}
                        className="bg-white border border-black rounded-lg p-8 max-w-md w-full shadow-xl relative overflow-hidden chani-card"
                        style={{
                            boxShadow: '6px 6px 0 rgba(0, 0, 0, 0.15), 12px 12px 0 rgba(0, 0, 0, 0.1)',
                            transform: 'rotate(var(--rotation, 1deg))'
                        }}
                    >
                        {/* Distressed background pattern */}
                        <div className="absolute inset-0 bg-gradient-to-br from-gray-50 to-white opacity-30"></div>
                        <div className="absolute inset-0" style={{
                            backgroundImage: `repeating-linear-gradient(45deg, transparent, transparent 2px, rgba(0,0,0,0.01) 2px, rgba(0,0,0,0.01) 4px)`
                        }}></div>
                        <div className="absolute top-4 right-4 w-8 h-8 text-black/10 font-bold text-lg transform rotate-12">👤</div>
                        <div className="absolute bottom-4 left-4 w-8 h-8 text-black/10 font-bold text-lg transform -rotate-12">✨</div>

                        <div className="relative z-10">
                            {/* Header */}
                            <div className="flex items-center justify-between mb-6">
                                <h2 className="text-2xl font-bold text-black font-brand transform -rotate-1">
                                    {isGuest ? 'Welcome, Guest!' : 'Set Your Display Name'}
                                </h2>
                                <button
                                    onClick={onClose}
                                    className="text-gray-600 hover:text-black transition-colors transform hover:scale-110"
                                >
                                    <X className="w-6 h-6" />
                                </button>
                            </div>

                            {/* Explanation */}
                            <p className="text-gray-600 mb-6 font-distressed transform rotate-1">
                                {isGuest
                                    ? "Let's give you a fun name for this planning session!"
                                    : "Choose how you'd like to appear to your team during planning sessions."
                                }
                            </p>

                            {/* Wallet Info Display */}
                            {walletInfo && (
                                <div className="mb-6 p-4 bg-gray-50 rounded-lg border border-gray-200 vintage-paper transform hover:rotate-1 transition-transform">
                                    <div className="flex items-center gap-2 mb-2">
                                        <span className={`${walletInfo.color}`}>{walletInfo.icon}</span>
                                        <span className="text-sm font-medium text-black font-brand">{walletInfo.title}</span>
                                    </div>
                                    <p className="text-sm text-gray-600 font-distressed">{walletInfo.subtitle}</p>
                                </div>
                            )}

                            <form onSubmit={handleSubmit} className="space-y-6">
                                {/* Display Name Input */}
                                <div className="group">
                                    <label className="block text-black mb-3 text-lg font-medium font-brand transform -rotate-1">
                                        Display Name
                                    </label>
                                    <div className="relative">
                                        <input
                                            type="text"
                                            value={displayName}
                                            onChange={(e) => {
                                                setDisplayName(e.target.value)
                                                setUseAnonymous(false)
                                            }}
                                            placeholder="Enter your display name"
                                            className="w-full px-4 py-3 border border-black rounded-lg focus:outline-none focus:ring-2 focus:ring-green-200 focus:border-green-500 font-distressed vintage-paper"
                                            maxLength={30}
                                            disabled={useAnonymous}
                                        />
                                        {/* Hover Tooltip */}
                                        <div className="absolute left-1/2 top-full transform -translate-x-1/2 mt-2 px-3 py-2 bg-black text-white text-xs rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none whitespace-nowrap z-20">
                                            This is how your team will see you
                                            <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-b-4 border-transparent border-t-black"></div>
                                        </div>
                                    </div>
                                </div>

                                {/* ENS Info */}
                                {ensName && (
                                    <div className="p-3 bg-green-50 border border-green-200 rounded-lg vintage-paper transform hover:-rotate-1 transition-transform">
                                        <p className="text-sm text-green-800 font-distressed">
                                            <span className="font-medium">Detected ENS name:</span> {ensName}.
                                            We'll use this automatically, but you can change it above if you prefer.
                                        </p>
                                    </div>
                                )}

                                {/* Buttons */}
                                <div className="flex flex-col gap-3">
                                    <button
                                        type="submit"
                                        disabled={isSubmitting || (!displayName.trim() && !useAnonymous)}
                                        className="w-full bg-black text-white font-semibold py-3 px-6 rounded-lg hover:bg-gray-800 transition-colors disabled:opacity-50 disabled:cursor-not-allowed transform hover:scale-105 vintage-btn"
                                    >
                                        {isSubmitting ? 'Setting up...' : 'Continue'}
                                    </button>

                                    <button
                                        type="button"
                                        onClick={handleAnonymous}
                                        className="w-full bg-white text-black font-semibold py-3 px-6 border border-black rounded-lg hover:bg-gray-50 transition-colors transform hover:scale-105"
                                    >
                                        Continue Anonymously
                                    </button>
                                </div>
                            </form>
                        </div>
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    )
} 