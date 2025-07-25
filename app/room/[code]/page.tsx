'use client'

import { useState, useEffect } from 'react'
import { useParams, useRouter } from 'next/navigation'
import { motion } from 'framer-motion'
import { Room } from '@/components/room/Room'
import { createUser, createRoom, createStory } from '@/utils'
import { User, Room as RoomType } from '@/types'
import toast from 'react-hot-toast'

export default function RoomPage() {
    const params = useParams()
    const router = useRouter()
    const roomCode = params.code as string

    const [currentUser, setCurrentUser] = useState<User | null>(null)
    const [currentRoom, setCurrentRoom] = useState<RoomType | null>(null)
    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {
        // Simulate loading room data
        const loadRoom = async () => {
            setIsLoading(true)

            // Get user info from localStorage
            const storedDisplayName = localStorage.getItem('displayName')
            const storedCameFromModal = localStorage.getItem('cameFromModal') === 'true'

            // Store current room code in localStorage
            localStorage.setItem('currentRoomCode', roomCode)

            // Create user with stored display name or default
            const userName = storedDisplayName || 'Demo User'
            const isWalletUser = storedCameFromModal

            const user = createUser(userName, isWalletUser ? '0x742d35Cc6634C0532925a3b8D4C9db96C4b4d8b6' : undefined)
            setCurrentUser(user)

            // Create mock room with sample data
            const room = createRoom(
                'Demo Planning Session',
                'fibonacci',
                8,
                user.id
            )

            // Add some sample participants (5 total including current user)
            const participants = [
                createUser('Alice'),
                createUser('Bob'),
                createUser('Charlie'),
                createUser('Diana')
            ]
            room.participants = [user, ...participants]

            // Add sample stories with votes
            const stories = [
                createStory('Implement user authentication', 'Add login/logout functionality with JWT tokens'),
                createStory('Design responsive dashboard', 'Create mobile-friendly dashboard layout'),
                createStory('Setup CI/CD pipeline', 'Configure automated testing and deployment')
            ]

            // Start with no votes - clean voting state
            const firstStory = stories[0]
            firstStory.votes = [] // No votes initially
            firstStory.isRevealed = false // Not revealed initially

            room.stories = stories

            setCurrentRoom(room)
            setIsLoading(false)

            toast.success(`Joined room ${roomCode}`)
        }

        loadRoom()
    }, [roomCode])

    const handleLeaveRoom = () => {
        // Clear localStorage when leaving room
        localStorage.removeItem('cameFromModal')
        localStorage.removeItem('displayName')
        localStorage.removeItem('currentRoomCode')
        toast.success('Left the room')
        router.push('/')
    }

    const handleEndSession = () => {
        toast.success('Session ended')
        router.push('/room/end')
    }

    if (isLoading) {
        return (
            <div className="min-h-screen bg-white flex items-center justify-center">
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="text-center"
                >
                    <div className="w-16 h-16 border-4 border-black border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
                    <p className="text-gray-600">Joining room...</p>
                </motion.div>
            </div>
        )
    }

    if (!currentRoom || !currentUser) {
        return (
            <div className="min-h-screen bg-white flex items-center justify-center">
                <div className="text-center">
                    <h1 className="text-2xl font-bold text-black mb-4">Room Not Found</h1>
                    <p className="text-gray-600 mb-6">The room you're looking for doesn't exist or has been closed.</p>
                    <button
                        onClick={() => router.push('/')}
                        className="vintage-btn"
                    >
                        Go Home
                    </button>
                </div>
            </div>
        )
    }

    return (
        <Room
            room={currentRoom}
            currentUser={currentUser}
            onLeaveRoom={handleLeaveRoom}
            onEndSession={handleEndSession}
        />
    )
} 