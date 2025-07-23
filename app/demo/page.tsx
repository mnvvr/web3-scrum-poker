'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Room } from '@/components/room/Room'
import { EndSession } from '@/components/room/EndSession'
import { createUser, createRoom, createStory } from '@/utils'
import { User, Room as RoomType } from '@/types'
import toast from 'react-hot-toast'

export default function DemoPage() {
    const [currentUser, setCurrentUser] = useState<User | null>(null)
    const [currentRoom, setCurrentRoom] = useState<RoomType | null>(null)
    const [sessionEnded, setSessionEnded] = useState(false)
    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {
        // Initialize demo data
        const initializeDemo = async () => {
            setIsLoading(true)

            // Create demo user
            const user = createUser('Demo User')
            setCurrentUser(user)

            // Create demo room with sample data
            const room = createRoom(
                'Web3 Scrum Poker Demo',
                'fibonacci',
                8,
                user.id
            )

            // Add sample participants
            const participants = [
                createUser('Alice'),
                createUser('Bob'),
                createUser('Charlie'),
                createUser('Diana'),
                createUser('Eve')
            ]
            room.participants = [user, ...participants]

            // Add sample stories
            const stories = [
                createStory('Implement user authentication', 'Add login/logout functionality with JWT tokens'),
                createStory('Design responsive dashboard', 'Create mobile-friendly dashboard layout'),
                createStory('Setup CI/CD pipeline', 'Configure automated testing and deployment'),
                createStory('Add real-time notifications', 'Implement WebSocket-based notifications'),
                createStory('Optimize database queries', 'Improve performance with query optimization')
            ]
            room.stories = stories

            setCurrentRoom(room)
            setIsLoading(false)

            toast.success('Welcome to the Web3 Scrum Poker demo!')
        }

        initializeDemo()
    }, [])

    const handleLeaveRoom = () => {
        toast.success('Demo session ended')
        // You could redirect to home or show a demo completion message
    }

    const handleEndSession = () => {
        setSessionEnded(true)
        toast.success('Session completed!')
    }

    const handleStartNewSession = () => {
        setSessionEnded(false)
        // Reinitialize demo data
        const user = createUser('Demo User')
        const room = createRoom(
            'New Demo Session',
            'fibonacci',
            8,
            user.id
        )

        const participants = [
            createUser('Alice'),
            createUser('Bob'),
            createUser('Charlie')
        ]
        room.participants = [user, ...participants]

        const stories = [
            createStory('New Feature A', 'Implement the first new feature'),
            createStory('New Feature B', 'Implement the second new feature')
        ]
        room.stories = stories

        setCurrentUser(user)
        setCurrentRoom(room)
        toast.success('New demo session started!')
    }

    const handleReturnToRoom = () => {
        setSessionEnded(false)
        toast.success('Returned to room')
    }

    const handleExitToHome = () => {
        toast.success('Thanks for trying the demo!')
        // You could redirect to home page here
    }

    const handleDisconnectWallet = () => {
        toast.success('Wallet disconnected')
        // You could redirect to home page here
    }

    if (isLoading) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="text-center"
                >
                    <div className="w-16 h-16 border-4 border-primary-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
                    <p className="text-white/70">Loading demo...</p>
                </motion.div>
            </div>
        )
    }

    if (sessionEnded && currentRoom && currentUser) {
        return (
            <EndSession
                room={currentRoom}
                onStartNewSession={handleStartNewSession}
                onReturnToRoom={handleReturnToRoom}
                onExitToHome={handleExitToHome}
                onDisconnectWallet={handleDisconnectWallet}
            />
        )
    }

    if (currentRoom && currentUser) {
        return (
            <Room
                room={currentRoom}
                currentUser={currentUser}
                onLeaveRoom={handleLeaveRoom}
                onEndSession={handleEndSession}
            />
        )
    }

    return (
        <div className="min-h-screen flex items-center justify-center">
            <div className="text-center">
                <h1 className="text-2xl font-bold text-white mb-4">Demo Not Available</h1>
                <p className="text-white/70">Unable to load demo data.</p>
            </div>
        </div>
    )
} 