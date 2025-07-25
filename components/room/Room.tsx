'use client'

import { useState, useEffect } from 'react'
import { Room as RoomType, User, Story, CardType, CARD_TYPES } from '@/types'
import { RoomHeader } from './RoomHeader'
import { CurrentStory } from './CurrentStory'
import { ScrumCardsSection } from './ScrumCardsSection'
import { LogOut } from 'lucide-react'
import toast from 'react-hot-toast'
import { motion } from 'framer-motion'

interface RoomProps {
    room: RoomType
    currentUser: User
    onLeaveRoom: () => void
    onEndSession?: () => void
    onUpdateStory?: (updatedStory: Story) => void
}

export function Room({ room, currentUser, onLeaveRoom, onEndSession, onUpdateStory }: RoomProps) {
    const [currentStory, setCurrentStory] = useState<Story | null>(null)
    const [selectedValue, setSelectedValue] = useState<number | string | null>(null)
    const [isVoting, setIsVoting] = useState(true)
    const [isRevealed, setIsRevealed] = useState(false)
    const [isEditingStory, setIsEditingStory] = useState(false)

    useEffect(() => {
        if (room.stories.length > 0) {
            // Test verisi: 5 kişinin oy verdiği örnek
            const testVotes = [
                { userId: room.participants[0]?.id || 'user1', value: 8, timestamp: new Date() },
                { userId: room.participants[1]?.id || 'user2', value: 13, timestamp: new Date() },
                { userId: room.participants[2]?.id || 'user3', value: 8, timestamp: new Date() },
                { userId: room.participants[3]?.id || 'user4', value: 5, timestamp: new Date() },
                { userId: room.participants[4]?.id || 'user5', value: 13, timestamp: new Date() },
            ]

            const storyWithTestVotes = {
                ...room.stories[room.currentStoryIndex],
                votes: testVotes,
                isRevealed: true // Test için revealed durumunda
            }

            setCurrentStory(storyWithTestVotes)
            setIsVoting(!storyWithTestVotes.isRevealed)
            setIsRevealed(storyWithTestVotes.isRevealed)

            // Check if user has already voted
            const userVote = storyWithTestVotes.votes.find(
                v => v.userId === currentUser.id
            )
            setSelectedValue(userVote?.value || null)
        }
    }, [room, currentUser.id])

    const handleSelectCard = (value: number | string) => {
        setSelectedValue(value)

        // In a real app, this would send the vote to the server/blockchain
        toast.success(`Voted: ${value}`)
    }

    const handleRevealVotes = () => {
        setIsRevealed(true)
        setIsVoting(false)
        toast.success('Votes revealed!')
    }

    const handleResetVotes = () => {
        setIsRevealed(false)
        setIsVoting(true)
        setSelectedValue(null)
        toast.success('Starting new vote')
    }

    // Calculate voting progress
    const votedParticipants = room.participants.filter(participant =>
        currentStory?.votes.some(vote => vote.userId === participant.id)
    )

    if (!currentStory) {
        return (
            <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
                <div className="text-center max-w-md">
                    <div className="bg-white rounded-lg p-8 shadow-sm border border-gray-200">
                        <h2 className="text-2xl font-bold text-black mb-4 font-brand">No Stories Available</h2>
                        <p className="text-gray-600 mb-6 font-distressed">Add some user stories to start planning</p>
                        <button
                            onClick={onLeaveRoom}
                            className="bg-black text-white font-medium py-2 px-4 rounded-lg hover:bg-gray-800 transition-colors font-brand"
                        >
                            Leave Room
                        </button>
                    </div>
                </div>
            </div>
        )
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50/20 to-purple-50/20 relative">
            {/* Subtle background pattern */}
            <div className="absolute inset-0 opacity-30">
                <div className="absolute top-20 left-20 w-32 h-32 bg-gradient-to-br from-blue-400/20 to-purple-400/20 rounded-full blur-3xl"></div>
                <div className="absolute bottom-20 right-20 w-40 h-40 bg-gradient-to-br from-purple-400/20 to-pink-400/20 rounded-full blur-3xl"></div>
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-60 h-60 bg-gradient-to-br from-blue-300/10 to-purple-300/10 rounded-full blur-3xl"></div>
            </div>

            {/* Header */}
            <RoomHeader
                room={room}
                currentUser={currentUser}
                onLeaveRoom={onLeaveRoom}
                onRevealVotes={handleRevealVotes}
                onResetVotes={handleResetVotes}
                onEndSession={onEndSession}
                isVoting={isVoting}
                isRevealed={isRevealed}
                isEditingStory={isEditingStory}
            />

            {/* Main Content */}
            <div className="container mx-auto px-4 py-6 max-w-6xl relative z-10">
                {/* Current Story */}
                <CurrentStory
                    story={currentStory}
                    onUpdateStory={onUpdateStory}
                    onEditStateChange={setIsEditingStory}
                />

                {/* Scrum Cards Section */}
                <ScrumCardsSection
                    cardType={room.cardType}
                    selectedValue={selectedValue}
                    onSelectCard={handleSelectCard}
                    isRevealed={isRevealed}
                    isVoting={isVoting}
                    votes={currentStory.votes}
                    votedCount={votedParticipants.length}
                    totalCount={room.participants.length}
                    participants={room.participants}
                    isEditingStory={isEditingStory}
                />
            </div>

            {/* Leave Button - Bottom Right */}
            <div className="fixed bottom-6 right-6 z-50">
                <motion.button
                    onClick={onLeaveRoom}
                    disabled={isEditingStory}
                    className={`flex items-center gap-2 font-medium py-3 px-4 rounded-lg border transition-all duration-300 shadow-lg font-brand ${isEditingStory
                        ? 'bg-gray-100 text-gray-400 border-gray-200 cursor-not-allowed'
                        : 'bg-white text-black border-gray-300 hover:bg-gray-50'
                        }`}
                    whileHover={isEditingStory ? {} : { scale: 1.05, shadow: "0 10px 25px rgba(0,0,0,0.15)" }}
                    whileTap={isEditingStory ? {} : { scale: 0.95 }}
                    title={isEditingStory ? "Please finish editing the task first" : "Leave the planning room and return to homepage"}
                >
                    <LogOut className="w-5 h-5" />
                    <span className="hidden sm:inline">Leave Room</span>
                </motion.button>
            </div>
        </div>
    )
} 