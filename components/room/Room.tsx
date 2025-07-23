'use client'

import { useState, useEffect } from 'react'
import { Room as RoomType, User, Story, CardType, CARD_TYPES } from '@/types'
import { RoomHeader } from './RoomHeader'
import { CurrentStory } from './CurrentStory'
import { ScrumCardsSection } from './ScrumCardsSection'
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

                {/* Card Type Info */}
                <div className="mb-8">
                    <div className="bg-white border border-black rounded-lg p-4 shadow-sm relative overflow-hidden vintage-paper">
                        {/* Distressed background pattern */}
                        <div className="absolute inset-0 bg-gradient-to-br from-gray-50 to-white opacity-30"></div>
                        <div className="absolute top-2 right-2 w-6 h-6 text-black/10 font-bold text-sm transform rotate-12">🎴</div>

                        <div className="relative z-10">
                            <div className="flex items-center justify-between mb-3">
                                <div className="flex items-center gap-3">
                                    <div className={`w-10 h-10 rounded-lg bg-gradient-to-br ${CARD_TYPES[room.cardType].color} flex items-center justify-center text-white text-lg`}>
                                        {CARD_TYPES[room.cardType].icon}
                                    </div>
                                    <div>
                                        <h4 className="text-lg font-bold text-black font-brand">Card Type</h4>
                                        <p className="text-sm text-gray-600 font-distressed">{CARD_TYPES[room.cardType].name}</p>
                                    </div>
                                </div>
                                <span className="text-sm font-medium text-gray-600 font-distressed">
                                    {CARD_TYPES[room.cardType].description}
                                </span>
                            </div>

                            <p className="text-gray-700 text-sm font-distressed mb-3 italic">
                                {CARD_TYPES[room.cardType].useCase}
                            </p>

                            <div className="flex flex-wrap gap-2">
                                {CARD_TYPES[room.cardType].values.slice(0, 8).map((value, index) => (
                                    <div
                                        key={value}
                                        className={`w-8 h-10 rounded-lg flex items-center justify-center text-white text-xs font-bold border border-black/20 bg-gradient-to-br ${CARD_TYPES[room.cardType].color} transform hover:rotate-2 transition-transform`}
                                    >
                                        {value}
                                    </div>
                                ))}
                                {CARD_TYPES[room.cardType].values.length > 8 && (
                                    <div className="w-8 h-10 bg-gray-300 rounded-lg flex items-center justify-center text-gray-600 text-xs font-bold border border-gray-400">
                                        +{CARD_TYPES[room.cardType].values.length - 8}
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>

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
        </div>
    )
} 