'use client'

import { useState, useEffect } from 'react'
import { Room as RoomType, User, Story, CardType, CARD_TYPES } from '@/types'
import { RoomHeader } from './RoomHeader'
import { CurrentStory } from './CurrentStory'
import { ScrumCardsSection } from './ScrumCardsSection'
import { LogOut } from 'lucide-react'
import toast from 'react-hot-toast'

interface RoomProps {
    room: RoomType
    currentUser: User
    onLeaveRoom: () => void
    onEndSession?: () => void
}

export function Room({ room, currentUser, onLeaveRoom, onEndSession }: RoomProps) {
    const [currentStory, setCurrentStory] = useState<Story | null>(null)
    const [selectedValue, setSelectedValue] = useState<number | string | null>(null)
    const [isVoting, setIsVoting] = useState(true)
    const [isRevealed, setIsRevealed] = useState(false)

    useEffect(() => {
        if (room.stories.length > 0) {
            setCurrentStory(room.stories[room.currentStoryIndex])
            setIsVoting(!room.stories[room.currentStoryIndex].isRevealed)
            setIsRevealed(room.stories[room.currentStoryIndex].isRevealed)

            // Check if user has already voted
            const userVote = room.stories[room.currentStoryIndex].votes.find(
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
            <div className="min-h-screen bg-white flex items-center justify-center">
                <div className="text-center">
                    <h2 className="text-2xl font-bold text-black mb-4 font-brand">No Stories Available</h2>
                    <p className="text-gray-600">Add some user stories to start planning</p>
                </div>
            </div>
        )
    }

    return (
        <div className="min-h-screen bg-white relative overflow-hidden">
            {/* Background Texture */}
            <div className="absolute inset-0 bg-gradient-to-br from-gray-50 to-white opacity-30"></div>
            <div className="absolute inset-0" style={{
                backgroundImage: `repeating-linear-gradient(45deg, transparent, transparent 2px, rgba(0,0,0,0.01) 2px, rgba(0,0,0,0.01) 4px)`
            }}></div>

            <RoomHeader
                room={room}
                currentUser={currentUser}
                onLeaveRoom={onLeaveRoom}
                onRevealVotes={handleRevealVotes}
                onResetVotes={handleResetVotes}
                onEndSession={onEndSession}
                isVoting={isVoting}
                isRevealed={isRevealed}
            />

            <div className="container mx-auto px-4 py-8 relative z-10">
                {/* Current Story */}
                <CurrentStory story={currentStory} />

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
                />
            </div>

            {/* Leave Button - Bottom Right */}
            <div className="fixed bottom-6 right-6 z-[9999]">
                <button
                    onClick={onLeaveRoom}
                    className="flex items-center gap-2 bg-white text-black font-semibold py-3 px-4 rounded-lg border-2 border-black hover:bg-gray-50 transition-all duration-300 shadow-lg vintage-btn"
                >
                    <LogOut className="w-5 h-5" />
                    <span>Leave Room</span>
                </button>
            </div>
        </div>
    )
} 