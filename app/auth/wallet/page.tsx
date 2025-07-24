'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { motion } from 'framer-motion'
import { ArrowLeft, Wallet, Sparkles, Shield, Zap } from 'lucide-react'
import { DisplayNameModal } from '@/components/auth/DisplayNameModal'
import { createUser } from '@/utils'
import toast from 'react-hot-toast'

export default function WalletAuthPage() {
    const router = useRouter()
    const [isConnecting, setIsConnecting] = useState(false)
    const [showModal, setShowModal] = useState(false)
    const [displayName, setDisplayName] = useState('')
    const [walletAddress, setWalletAddress] = useState('')
    const [ensName, setEnsName] = useState('')

    useEffect(() => {
        // Clear any old data first
        localStorage.removeItem('cameFromModal')

        // Check if user already has a display name
        const storedDisplayName = localStorage.getItem('displayName')
        const storedWalletAddress = localStorage.getItem('walletAddress')

        if (storedDisplayName && storedWalletAddress) {
            setDisplayName(storedDisplayName)
            // Redirect to room creation if already authenticated
            router.push('/room/create?mode=wallet')
        }
    }, [router])

    const handleConnectWallet = async () => {
        setIsConnecting(true)

        try {
            // Simulate wallet connection for now
            await new Promise(resolve => setTimeout(resolve, 2000))

            // Mock wallet data
            const mockAddress = '0x742d35Cc6634C0532925a3b8D4C9db96C4b4d8b6'
            const mockEnsName = 'alice.eth'

            setWalletAddress(mockAddress)
            setEnsName(mockEnsName)

            // Show display name modal
            setShowModal(true)

            toast.success('Wallet connected successfully!')
        } catch (error) {
            toast.error('Failed to connect wallet')
        } finally {
            setIsConnecting(false)
        }
    }

    const handleModalSubmit = (name: string) => {
        setDisplayName(name)
        setShowModal(false)

        // Store user data
        localStorage.setItem('displayName', name)
        localStorage.setItem('walletAddress', walletAddress)
        localStorage.setItem('ensName', ensName)
        localStorage.setItem('cameFromModal', 'true')

        toast.success('Welcome to Web3 Scrum Poker!')

        // Redirect to room creation
        router.push('/room/create?mode=wallet')
    }

    const handleModalClose = () => {
        setShowModal(false)
        router.push('/')
    }

    return (
        <div className="min-h-screen bg-white relative overflow-hidden">
            {/* Background Texture */}
            <div className="absolute inset-0 bg-gradient-to-br from-gray-50 to-white opacity-30"></div>
            <div className="absolute inset-0" style={{
                backgroundImage: `repeating-linear-gradient(45deg, transparent, transparent 2px, rgba(0,0,0,0.01) 2px, rgba(0,0,0,0.01) 4px)`
            }}></div>

            {/* Header */}
            <div className="relative z-10 p-6">
                <button
                    onClick={() => router.push('/')}
                    className="flex items-center gap-2 text-gray-600 hover:text-black transition-colors mb-8"
                >
                    <ArrowLeft className="w-5 h-5" />
                    <span>Back to Home</span>
                </button>
            </div>

            {/* Main Content */}
            <div className="relative z-10 max-w-2xl mx-auto px-6 py-12">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-center"
                >
                    <div className="mb-8">
                        <div className="w-20 h-20 bg-gradient-to-br from-blue-400 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-6">
                            <Wallet className="w-10 h-10 text-white" />
                        </div>
                        <h1 className="text-4xl font-bold text-black mb-4 font-brand">Connect Your Wallet</h1>
                        <p className="text-xl text-gray-600 font-distressed">
                            Connect your Web3 wallet to start planning with your team
                        </p>
                    </div>

                    {/* Wallet Benefits */}
                    <div className="grid md:grid-cols-3 gap-6 mb-12">
                        <div className="p-6 bg-white border border-black rounded-lg shadow-lg relative overflow-hidden vintage-paper">
                            <div className="absolute inset-0 bg-gradient-to-br from-gray-50 to-white opacity-30"></div>
                            <div className="relative z-10">
                                <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                                    <Shield className="w-6 h-6 text-green-600" />
                                </div>
                                <h3 className="text-lg font-bold text-black mb-2 font-brand">Secure Identity</h3>
                                <p className="text-gray-600 text-sm font-distressed">
                                    Your wallet provides a secure, decentralized identity
                                </p>
                            </div>
                        </div>

                        <div className="p-6 bg-white border border-black rounded-lg shadow-lg relative overflow-hidden vintage-paper">
                            <div className="absolute inset-0 bg-gradient-to-br from-gray-50 to-white opacity-30"></div>
                            <div className="relative z-10">
                                <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                                    <Sparkles className="w-6 h-6 text-blue-600" />
                                </div>
                                <h3 className="text-lg font-bold text-black mb-2 font-brand">ENS Support</h3>
                                <p className="text-gray-600 text-sm font-distressed">
                                    Use your ENS name for a personalized experience
                                </p>
                            </div>
                        </div>

                        <div className="p-6 bg-white border border-black rounded-lg shadow-lg relative overflow-hidden vintage-paper">
                            <div className="absolute inset-0 bg-gradient-to-br from-gray-50 to-white opacity-30"></div>
                            <div className="relative z-10">
                                <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                                    <Zap className="w-6 h-6 text-purple-600" />
                                </div>
                                <h3 className="text-lg font-bold text-black mb-2 font-brand">Web3 Ready</h3>
                                <p className="text-gray-600 text-sm font-distressed">
                                    Future-ready for blockchain-powered features
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Connect Button */}
                    <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={handleConnectWallet}
                        disabled={isConnecting}
                        className="bg-gradient-to-r from-blue-500 to-purple-600 text-white font-bold py-4 px-8 rounded-lg text-lg flex items-center gap-2 mx-auto hover:from-blue-600 hover:to-purple-700 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed vintage-btn"
                    >
                        {isConnecting ? (
                            <>
                                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                                Connecting...
                            </>
                        ) : (
                            <>
                                <Wallet className="w-5 h-5" />
                                Connect Wallet
                            </>
                        )}
                    </motion.button>

                    <p className="text-sm text-gray-500 mt-4 font-distressed">
                        We'll never ask for your private keys
                    </p>
                </motion.div>
            </div>

            {/* Display Name Modal */}
            <DisplayNameModal
                isOpen={showModal}
                onClose={handleModalClose}
                onSubmit={handleModalSubmit}
                isGuest={false}
                ensName={ensName}
                walletAddress={walletAddress}
            />
        </div>
    )
} 