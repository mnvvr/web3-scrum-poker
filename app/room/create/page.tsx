'use client'

import { useState, useEffect } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { motion } from 'framer-motion'
import { ArrowLeft, Copy, X, Check } from 'lucide-react'
import { RoomCreation } from '@/components/room/RoomCreation'
import { DisplayNameModal } from '@/components/auth/DisplayNameModal'
import { createRoom, createUser } from '@/utils'
import { nanoid } from 'nanoid'
import toast from 'react-hot-toast'
import { CardType } from '@/types'

interface RoomSettings {
    revealMode: 'auto' | 'manual'
    initialTask?: {
        title: string
        description: string
    }
    autoGenerateLink: boolean
    showQRCode: boolean
}

export default function CreateRoomPage() {
    const router = useRouter()
    const searchParams = useSearchParams()
    const mode = searchParams.get('mode') || 'guest'

    const [isCreating, setIsCreating] = useState(false)
    const [showModal, setShowModal] = useState(false)
    const [displayName, setDisplayName] = useState('')
    const [cameFromModal, setCameFromModal] = useState(false)
    const [roomCode, setRoomCode] = useState('')
    const [createdRoom, setCreatedRoom] = useState<any>(null)
    const [isCopied, setIsCopied] = useState(false)

    // Mock wallet address for demo
    const mockWalletAddress = '0x1234567890abcdef1234567890abcdef12345678'

    useEffect(() => {
        // Check if user came from modal (wallet mode, name not set)
        const storedCameFromModal = localStorage.getItem('cameFromModal') === 'true'
        const storedDisplayName = localStorage.getItem('displayName')

        if (mode === 'wallet' && !storedDisplayName && !storedCameFromModal) {
            setShowModal(true)
            setCameFromModal(true)
            localStorage.setItem('cameFromModal', 'true')
        } else if (storedDisplayName) {
            setDisplayName(storedDisplayName)
        }
    }, [mode])

    const handleCreateRoom = async (roomName: string, cardType: CardType, settings: RoomSettings) => {
        setIsCreating(true)

        try {
            // Create user if needed
            let user
            if (mode === 'wallet') {
                user = createUser(displayName, mockWalletAddress)
            } else {
                user = createUser(displayName || 'Anonymous')
            }

            // Create room
            const room = createRoom(roomName, cardType, 10, user.id)

            // Apply room settings
            if (settings.initialTask) {
                // Add initial task to room
                const { createStory } = await import('@/utils')
                const initialStory = createStory(settings.initialTask.title, settings.initialTask.description)
                room.stories = [initialStory]
                room.currentStoryIndex = 0
            }

            // Store room settings for later use
            localStorage.setItem('roomSettings', JSON.stringify({
                revealMode: settings.revealMode,
                autoGenerateLink: settings.autoGenerateLink,
                showQRCode: settings.showQRCode
            }))

            setCreatedRoom(room)
            setRoomCode(room.code)

            // Store room code for persistence
            localStorage.setItem('currentRoomCode', room.code)

            // Show success message with settings info
            let successMessage = 'Room created successfully!'
            if (settings.revealMode === 'manual') {
                successMessage += ' Manual reveal mode enabled.'
            }
            if (settings.initialTask) {
                successMessage += ' Initial task added.'
            }

            toast.success(successMessage, {
                icon: '🎉',
                style: {
                    borderRadius: '10px',
                    background: '#333',
                    color: '#fff',
                },
            })

        } catch (error) {
            console.error('Error creating room:', error)
            toast.error('Failed to create room', {
                icon: '❌',
                style: {
                    borderRadius: '10px',
                    background: '#ef4444',
                    color: '#fff',
                },
            })
        } finally {
            setIsCreating(false)
        }
    }

    const handleJoinRoom = (roomCode: string) => {
        // Store room code for persistence
        localStorage.setItem('currentRoomCode', roomCode)
        router.push(`/room/${roomCode}`)
    }

    const handleModalClose = () => {
        setShowModal(false)
        setCameFromModal(false)
        localStorage.removeItem('cameFromModal')
    }

    const handleModalSubmit = (name: string) => {
        setDisplayName(name)
        localStorage.setItem('displayName', name)
        setShowModal(false)
        setCameFromModal(false)
        localStorage.removeItem('cameFromModal')
    }

    const handleBackClick = () => {
        if (cameFromModal && mode === 'wallet') {
            // Return to modal if user came from there
            setShowModal(true)
            setCameFromModal(true)
            localStorage.setItem('cameFromModal', 'true')
        } else {
            // Navigate to home
            router.push('/')
        }
    }

    const handleCopyCode = async () => {
        try {
            await navigator.clipboard.writeText(roomCode)
            setIsCopied(true)
            toast.success('Room code copied to clipboard!', {
                icon: '📋',
                style: {
                    borderRadius: '10px',
                    background: '#333',
                    color: '#fff',
                },
            })

            // Reset copied state after 2 seconds
            setTimeout(() => setIsCopied(false), 2000)
        } catch (error) {
            toast.error('Failed to copy room code', {
                icon: '❌',
                style: {
                    borderRadius: '10px',
                    background: '#ef4444',
                    color: '#fff',
                },
            })
        }
    }

    const handleCloseRoomModal = () => {
        setCreatedRoom(null)
        setRoomCode('')
        setIsCopied(false)
    }

    const handleJoinRoomFromModal = () => {
        router.push(`/room/${roomCode}`)
    }

    return (
        <div className="min-h-screen bg-white relative">
            {/* Back Button - Top Left Corner */}
            <div className="absolute top-6 left-6 z-10">
                <button
                    onClick={handleBackClick}
                    className="flex items-center gap-2 text-gray-600 hover:text-black transition-colors"
                >
                    <ArrowLeft className="w-4 h-4" />
                    {cameFromModal && mode === 'wallet' ? 'Back to Setup' : 'Back to Home'}
                </button>
            </div>

            {/* Wallet Info - Top Right Corner */}
            {mode === 'wallet' && displayName && (
                <div className="absolute top-6 right-6 z-10">
                    <div className="flex items-center gap-2 bg-white border border-black rounded-lg px-3 py-1.5 shadow-sm">
                        <div className="w-1.5 h-1.5 bg-green-500 rounded-full"></div>
                        <span className="text-xs text-gray-600 font-medium">Connected</span>
                        <span className="text-xs font-bold text-black">{displayName}</span>
                    </div>
                </div>
            )}

            {/* Main Content - Centered */}
            <div className="flex items-center justify-center min-h-screen p-4">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="w-full max-w-2xl"
                >
                    <RoomCreation
                        onCreateRoom={handleCreateRoom}
                        onJoinRoom={handleJoinRoom}
                        isCreating={isCreating}
                        userMode={mode}
                        displayName={displayName}
                    />
                </motion.div>
            </div>

            {/* Display Name Modal */}
            {showModal && (
                <DisplayNameModal
                    isOpen={showModal}
                    onClose={handleModalClose}
                    onSubmit={handleModalSubmit}
                    isGuest={false}
                    walletAddress={mockWalletAddress}
                />
            )}

            {/* Room Code Display (if room created) */}
            {createdRoom && (
                <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
                >
                    <div className="bg-white border border-black rounded-lg p-8 max-w-md w-full shadow-xl relative overflow-hidden chani-card">
                        {/* Distressed background pattern */}
                        <div className="absolute inset-0 bg-gradient-to-br from-gray-50 to-white opacity-30"></div>
                        <div className="absolute top-4 right-4 w-8 h-8 text-black/10 font-bold text-lg transform rotate-12">🎉</div>

                        {/* Close Button */}
                        <button
                            onClick={handleCloseRoomModal}
                            className="absolute top-4 right-4 z-20 text-gray-500 hover:text-black transition-colors"
                        >
                            <X className="w-6 h-6" />
                        </button>

                        <div className="relative z-10 text-center">
                            <h2 className="text-2xl font-bold text-black mb-4 font-brand">Room Created!</h2>
                            <p className="text-gray-600 mb-6 font-distressed">
                                Share this code with your team to join the planning session
                            </p>

                            {/* Room Code Display */}
                            <div className="bg-gray-50 border border-black rounded-lg p-6 mb-6">
                                <div className="flex items-center justify-between mb-3">
                                    <span className="text-sm text-gray-600 font-distressed">Room Code</span>
                                    <button
                                        onClick={handleCopyCode}
                                        className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-sm font-medium transition-all duration-300 ${isCopied
                                            ? 'bg-black text-white'
                                            : 'bg-white text-black border border-black hover:bg-black hover:text-white'
                                            }`}
                                    >
                                        {isCopied ? (
                                            <>
                                                <Check className="w-4 h-4" />
                                                Copied!
                                            </>
                                        ) : (
                                            <>
                                                <Copy className="w-4 h-4" />
                                                Copy Code
                                            </>
                                        )}
                                    </button>
                                </div>
                                <div className="text-3xl font-mono font-bold text-black tracking-wider">
                                    {roomCode}
                                </div>
                            </div>

                            {/* Action Buttons */}
                            <div className="flex flex-col sm:flex-row gap-3">
                                <button
                                    onClick={handleJoinRoomFromModal}
                                    className="flex-1 bg-black text-white font-bold py-3 px-6 rounded-lg hover:bg-gray-800 transition-colors vintage-btn"
                                >
                                    Join Room Now
                                </button>
                                <button
                                    onClick={handleCloseRoomModal}
                                    className="flex-1 bg-white text-black font-bold py-3 px-6 rounded-lg border-2 border-black hover:bg-gray-50 transition-colors vintage-btn"
                                >
                                    Create Another Room
                                </button>
                            </div>

                            <p className="text-gray-500 text-sm mt-4 font-distressed">
                                You can close this modal and join later using the room code
                            </p>
                        </div>
                    </div>
                </motion.div>
            )}
        </div>
    )
} 