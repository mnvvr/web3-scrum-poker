'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Plus, ArrowRight, ChevronDown, ChevronUp, Eye, EyeOff, Users, QrCode, Copy, Settings } from 'lucide-react'
import { CardType, CARD_TYPES } from '@/types'

interface RoomCreationProps {
    onCreateRoom: (roomName: string, cardType: CardType, settings: RoomSettings) => void
    onJoinRoom: (roomCode: string) => void
    isCreating: boolean
    userMode: string
    displayName?: string
}

interface RoomSettings {
    revealMode: 'auto' | 'manual'
    initialTask?: {
        title: string
        description: string
    }
    autoGenerateLink: boolean
    showQRCode: boolean
}

export function RoomCreation({ onCreateRoom, onJoinRoom, isCreating, userMode, displayName }: RoomCreationProps) {
    const [roomName, setRoomName] = useState('')
    const [joinCode, setJoinCode] = useState('')
    const [cardType, setCardType] = useState<CardType>('fibonacci')
    const [showCardTypes, setShowCardTypes] = useState(false)
    const [showAdvancedSettings, setShowAdvancedSettings] = useState(false)

    // Room Settings
    const [revealMode, setRevealMode] = useState<'auto' | 'manual'>('auto')
    const [initialTaskTitle, setInitialTaskTitle] = useState('')
    const [initialTaskDescription, setInitialTaskDescription] = useState('')
    const [autoGenerateLink, setAutoGenerateLink] = useState(true)
    const [showQRCode, setShowQRCode] = useState(true)

    const handleCreateRoom = (e: React.FormEvent) => {
        e.preventDefault()
        if (roomName.trim()) {
            const settings: RoomSettings = {
                revealMode,
                initialTask: initialTaskTitle.trim() ? {
                    title: initialTaskTitle.trim(),
                    description: initialTaskDescription.trim()
                } : undefined,
                autoGenerateLink,
                showQRCode
            }
            onCreateRoom(roomName.trim(), cardType, settings)
        }
    }

    const selectedCardConfig = CARD_TYPES[cardType]

    return (
        <div className="w-full max-w-4xl mx-auto relative">
            {/* Global background texture */}
            <div className="absolute inset-0 bg-gradient-to-br from-gray-50 to-white opacity-30"></div>
            <div className="absolute inset-0" style={{
                backgroundImage: `repeating-linear-gradient(45deg, transparent, transparent 2px, rgba(0,0,0,0.01) 2px, rgba(0,0,0,0.01) 4px)`
            }}></div>

            {/* Join Room - Top Section */}
            <motion.div
                initial={{ opacity: 0, y: 20, rotateX: 1 }}
                animate={{ opacity: 1, y: 0, rotateX: 0 }}
                transition={{ delay: 0.1 }}
                className="text-center relative z-10 mb-12"
            >
                <div className="flex items-center justify-center gap-4 max-w-md mx-auto">
                    <div className="flex-1">
                        <input
                            type="text"
                            value={joinCode}
                            onChange={(e) => setJoinCode(e.target.value.toUpperCase())}
                            placeholder="Enter room code"
                            className="w-full px-4 py-3 border border-black rounded-lg focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent font-distressed vintage-paper"
                            maxLength={9}
                        />
                    </div>
                    <button
                        onClick={(e) => {
                            e.preventDefault()
                            if (joinCode.trim()) {
                                onJoinRoom(joinCode.trim().toUpperCase())
                            }
                        }}
                        className="vintage-btn px-6 py-3 flex items-center gap-2 whitespace-nowrap"
                    >
                        Join Room
                        <ArrowRight className="w-4 h-4" />
                    </button>
                </div>
                <p className="text-gray-600 text-xs mt-2 font-distressed">
                    Enter a code to join your team's room
                </p>
            </motion.div>

            {/* Create New Room - Redesigned as Poker Cards */}
            <motion.div
                initial={{ opacity: 0, y: 20, rotateX: 2 }}
                animate={{ opacity: 1, y: 0, rotateX: 0 }}
                transition={{ delay: 0.2 }}
                className="relative max-w-4xl mx-auto"
            >
                {/* Background Poker Card Effect */}
                <div className="absolute inset-0 bg-gradient-to-br from-white via-gray-50 to-white rounded-3xl shadow-2xl transform rotate-1"></div>
                <div className="absolute inset-0 bg-gradient-to-br from-white via-gray-50 to-white rounded-3xl shadow-xl transform -rotate-1"></div>

                {/* Main Content */}
                <div className="relative bg-white border border-black rounded-3xl p-8 shadow-lg transform hover:rotate-0 transition-transform duration-300 chani-card"
                    style={{
                        boxShadow: '6px 6px 0 rgba(0, 0, 0, 0.15), 12px 12px 0 rgba(0, 0, 0, 0.1)',
                        transform: 'rotate(var(--rotation, -1deg))'
                    }}
                >
                    {/* Distressed background pattern */}
                    <div className="absolute inset-0 bg-gradient-to-br from-gray-50 to-white opacity-30"></div>
                    <div className="absolute inset-0" style={{
                        backgroundImage: `repeating-linear-gradient(45deg, transparent, transparent 2px, rgba(0,0,0,0.01) 2px, rgba(0,0,0,0.01) 4px)`
                    }}></div>

                    {/* Poker Card Corner Decoration */}
                    <div className="absolute top-4 left-4 w-8 h-8 bg-black rounded-lg flex items-center justify-center transform -rotate-12">
                        <span className="text-white font-bold text-sm">♠</span>
                    </div>
                    <div className="absolute top-4 right-4 w-8 h-8 bg-black rounded-lg flex items-center justify-center transform rotate-12">
                        <span className="text-white font-bold text-sm">♥</span>
                    </div>

                    {/* Header with Fun Icon */}
                    <div className="text-center mb-8 relative z-10">
                        <div className="inline-flex items-center justify-center w-16 h-16 bg-black rounded-full mb-4 transform hover:scale-110 transition-transform">
                            <Plus className="w-8 h-8 text-white" />
                        </div>
                        <h2 className="text-3xl font-bold text-black mb-2 font-brand transform -rotate-1">Let's Start Planning!</h2>
                        <p className="text-gray-600 font-distressed transform rotate-1">Create your planning session and get the team together</p>
                    </div>

                    <form onSubmit={handleCreateRoom} className="space-y-8 relative z-10">
                        {/* Room Name - Fun Input */}
                        <div className="group">
                            <label className="block text-black mb-3 text-lg font-medium group-hover:text-black transition-colors font-brand">
                                What should we call this session?
                            </label>
                            <input
                                type="text"
                                value={roomName}
                                onChange={(e) => setRoomName(e.target.value)}
                                placeholder="Sprint 17 – Backend Refactor Tasks"
                                className="w-full px-6 py-4 border border-black rounded-2xl focus:outline-none focus:ring-4 focus:ring-gray-200 focus:border-black text-lg transition-all duration-300 hover:border-black font-distressed vintage-paper"
                                maxLength={50}
                            />
                            <p className="text-gray-500 text-sm mt-2 ml-2 font-distressed">
                                Useful for identifying ongoing planning sessions
                            </p>
                        </div>

                        {/* Card Type Selection - Dropdown Style */}
                        <div className="group">
                            <label className="block text-black mb-3 text-lg font-medium group-hover:text-black transition-colors font-brand">
                                Choose your planning style
                            </label>

                            {/* Selected Card Type Display */}
                            <div className="mb-4">
                                <button
                                    type="button"
                                    onClick={() => setShowCardTypes(!showCardTypes)}
                                    className="w-full p-4 border border-black rounded-2xl bg-white hover:border-black transition-all duration-300 text-left group/card relative vintage-paper"
                                    style={{
                                        boxShadow: '2px 2px 0 rgba(0, 0, 0, 0.05)',
                                        transform: 'rotate(var(--rotation, 0deg))'
                                    }}
                                >
                                    {/* Distressed background pattern */}
                                    <div className="absolute inset-0 bg-gradient-to-br from-gray-50 to-white opacity-30"></div>

                                    <div className="relative z-10 flex items-center justify-between">
                                        <div className="flex items-center gap-3">
                                            <div className="w-12 h-12 rounded-lg bg-black flex items-center justify-center text-white text-xl">
                                                {selectedCardConfig.icon}
                                            </div>
                                            <div>
                                                <h4 className="font-bold text-black text-lg font-brand">{selectedCardConfig.name}</h4>
                                                <p className="text-gray-600 text-sm font-distressed">{selectedCardConfig.description}</p>
                                            </div>
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <span className="text-gray-500 text-sm font-distressed">
                                                {showCardTypes ? 'Hide options' : 'Show all options'}
                                            </span>
                                            {showCardTypes ? (
                                                <ChevronUp className="w-5 h-5 text-gray-500 group-hover/card:text-black transition-colors" />
                                            ) : (
                                                <ChevronDown className="w-5 h-5 text-gray-500 group-hover/card:text-black transition-colors" />
                                            )}
                                        </div>
                                    </div>
                                </button>
                            </div>

                            {/* Dropdown Options */}
                            <AnimatePresence>
                                {showCardTypes && (
                                    <motion.div
                                        initial={{ opacity: 0, height: 0 }}
                                        animate={{ opacity: 1, height: 'auto' }}
                                        exit={{ opacity: 0, height: 0 }}
                                        transition={{ duration: 0.3 }}
                                        className="overflow-hidden"
                                    >
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 p-4 bg-gray-50 border border-gray-200 rounded-xl">
                                            {Object.entries(CARD_TYPES).map(([type, config]) => (
                                                <button
                                                    key={type}
                                                    type="button"
                                                    onClick={() => {
                                                        setCardType(type as CardType)
                                                        setShowCardTypes(false)
                                                    }}
                                                    className={`group/card relative p-3 border border-black rounded-lg text-left transition-all duration-300 hover:shadow-md transform hover:scale-105 vintage-paper ${cardType === type
                                                            ? 'bg-gray-100 border-black shadow-sm'
                                                            : 'bg-white hover:border-black'
                                                        }`}
                                                    style={{
                                                        boxShadow: cardType === type
                                                            ? '2px 2px 0 rgba(0, 0, 0, 0.1)'
                                                            : '1px 1px 0 rgba(0, 0, 0, 0.05)',
                                                        transform: cardType === type
                                                            ? 'rotate(var(--rotation, 0deg))'
                                                            : 'rotate(var(--rotation, 0deg))'
                                                    }}
                                                >
                                                    {/* Distressed background pattern */}
                                                    <div className="absolute inset-0 bg-gradient-to-br from-gray-50 to-white opacity-30"></div>

                                                    <div className="relative z-10">
                                                        {/* Header with icon and name */}
                                                        <div className="flex items-center gap-2 mb-2">
                                                            <div className="w-8 h-8 rounded-lg bg-black flex items-center justify-center text-white text-sm">
                                                                {config.icon}
                                                            </div>
                                                            <div>
                                                                <h4 className="font-bold text-black text-sm font-brand">{config.name}</h4>
                                                                <p className="text-gray-600 text-xs font-distressed">{config.description}</p>
                                                            </div>
                                                        </div>

                                                        {/* Use case */}
                                                        <p className="text-gray-700 text-xs mb-2 font-distressed italic">
                                                            {config.useCase}
                                                        </p>

                                                        {/* Card preview */}
                                                        <div className="flex flex-wrap gap-1 justify-center">
                                                            {config.values.slice(0, 4).map((value, index) => (
                                                                <div
                                                                    key={value}
                                                                    className="w-5 h-7 rounded flex items-center justify-center text-white text-xs font-bold border border-black/20 bg-black transform hover:rotate-2 transition-transform"
                                                                >
                                                                    {value}
                                                                </div>
                                                            ))}
                                                            {config.values.length > 4 && (
                                                                <div className="w-5 h-7 bg-gray-300 rounded flex items-center justify-center text-gray-600 text-xs font-bold border border-gray-400">
                                                                    +{config.values.length - 4}
                                                                </div>
                                                            )}
                                                        </div>

                                                        {/* Selection indicator */}
                                                        {cardType === type && (
                                                            <div className="absolute top-2 right-2 w-5 h-5 bg-black rounded-full flex items-center justify-center">
                                                                <span className="text-white text-xs">✓</span>
                                                            </div>
                                                        )}
                                                    </div>
                                                </button>
                                            ))}
                                        </div>
                                    </motion.div>
                                )}
                            </AnimatePresence>

                            <p className="text-gray-500 text-sm mt-2 ml-2 font-distressed">
                                {showCardTypes
                                    ? 'Click on a card type to select it'
                                    : 'Click to see all available planning styles'
                                }
                            </p>
                        </div>

                        {/* Advanced Settings Toggle */}
                        <div className="text-center">
                            <button
                                type="button"
                                onClick={() => setShowAdvancedSettings(!showAdvancedSettings)}
                                className="inline-flex items-center gap-2 text-gray-600 hover:text-black transition-colors font-distressed"
                            >
                                <Settings className="w-4 h-4" />
                                {showAdvancedSettings ? 'Hide' : 'Show'} Advanced Settings
                                {showAdvancedSettings ? (
                                    <ChevronUp className="w-4 h-4" />
                                ) : (
                                    <ChevronDown className="w-4 h-4" />
                                )}
                            </button>
                        </div>

                        {/* Advanced Settings */}
                        <AnimatePresence>
                            {showAdvancedSettings && (
                                <motion.div
                                    initial={{ opacity: 0, height: 0 }}
                                    animate={{ opacity: 1, height: 'auto' }}
                                    exit={{ opacity: 0, height: 0 }}
                                    transition={{ duration: 0.3 }}
                                    className="space-y-6 overflow-hidden"
                                >
                                    {/* Reveal Settings */}
                                    <div className="group">
                                        <label className="block text-black mb-3 text-lg font-medium group-hover:text-black transition-colors font-brand">
                                            How should estimates be revealed?
                                        </label>
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                            <button
                                                type="button"
                                                onClick={() => setRevealMode('auto')}
                                                className={`p-4 border border-black rounded-xl text-left transition-all duration-300 vintage-paper ${revealMode === 'auto'
                                                        ? 'bg-gray-100 border-black shadow-md'
                                                        : 'bg-white hover:border-black'
                                                    }`}
                                            >
                                                <div className="flex items-center gap-3 mb-2">
                                                    <div className="w-10 h-10 bg-black rounded-lg flex items-center justify-center">
                                                        <Eye className="w-5 h-5 text-white" />
                                                    </div>
                                                    <div>
                                                        <h4 className="font-bold text-black font-brand">Auto Reveal</h4>
                                                        <p className="text-gray-600 text-sm font-distressed">When all users vote</p>
                                                    </div>
                                                </div>
                                                <p className="text-gray-700 text-sm font-distressed">
                                                    Estimates are automatically revealed when everyone has voted
                                                </p>
                                            </button>

                                            <button
                                                type="button"
                                                onClick={() => setRevealMode('manual')}
                                                className={`p-4 border border-black rounded-xl text-left transition-all duration-300 vintage-paper ${revealMode === 'manual'
                                                        ? 'bg-gray-100 border-black shadow-md'
                                                        : 'bg-white hover:border-black'
                                                    }`}
                                            >
                                                <div className="flex items-center gap-3 mb-2">
                                                    <div className="w-10 h-10 bg-black rounded-lg flex items-center justify-center">
                                                        <EyeOff className="w-5 h-5 text-white" />
                                                    </div>
                                                    <div>
                                                        <h4 className="font-bold text-black font-brand">Manual Reveal</h4>
                                                        <p className="text-gray-600 text-sm font-distressed">By host control</p>
                                                    </div>
                                                </div>
                                                <p className="text-gray-700 text-sm font-distressed">
                                                    Host manually reveals estimates when ready
                                                </p>
                                            </button>
                                        </div>
                                    </div>

                                    {/* Initial Task Input */}
                                    <div className="group">
                                        <label className="block text-black mb-3 text-lg font-medium group-hover:text-black transition-colors font-brand">
                                            Add first task (optional)
                                        </label>
                                        <div className="space-y-4">
                                            <input
                                                type="text"
                                                value={initialTaskTitle}
                                                onChange={(e) => setInitialTaskTitle(e.target.value)}
                                                placeholder="Implement user authentication"
                                                className="w-full px-4 py-3 border border-black rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-200 focus:border-black font-distressed vintage-paper"
                                                maxLength={100}
                                            />
                                            <textarea
                                                value={initialTaskDescription}
                                                onChange={(e) => setInitialTaskDescription(e.target.value)}
                                                placeholder="Add login/logout functionality with JWT tokens"
                                                className="w-full px-4 py-3 border border-black rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-200 focus:border-black font-distressed vintage-paper resize-none"
                                                rows={3}
                                                maxLength={300}
                                            />
                                        </div>
                                        <p className="text-gray-500 text-sm mt-2 ml-2 font-distressed">
                                            Can be edited or skipped after room starts
                                        </p>
                                    </div>

                                    {/* Room Sharing Options */}
                                    <div className="group">
                                        <label className="block text-black mb-3 text-lg font-medium group-hover:text-black transition-colors font-brand">
                                            Room sharing options
                                        </label>
                                        <div className="space-y-4">
                                            <label className="flex items-center gap-3 cursor-pointer">
                                                <input
                                                    type="checkbox"
                                                    checked={autoGenerateLink}
                                                    onChange={(e) => setAutoGenerateLink(e.target.checked)}
                                                    className="w-5 h-5 text-black border-black rounded focus:ring-black focus:ring-2"
                                                />
                                                <div className="flex items-center gap-2">
                                                    <Users className="w-5 h-5 text-gray-600" />
                                                    <span className="font-distressed">Auto generate shareable room link</span>
                                                </div>
                                            </label>

                                            <label className="flex items-center gap-3 cursor-pointer">
                                                <input
                                                    type="checkbox"
                                                    checked={showQRCode}
                                                    onChange={(e) => setShowQRCode(e.target.checked)}
                                                    className="w-5 h-5 text-black border-black rounded focus:ring-black focus:ring-2"
                                                />
                                                <div className="flex items-center gap-2">
                                                    <QrCode className="w-5 h-5 text-gray-600" />
                                                    <span className="font-distressed">Include QR code for mobile access</span>
                                                </div>
                                            </label>
                                        </div>
                                        <p className="text-gray-500 text-sm mt-2 ml-2 font-distressed">
                                            Provide option to copy link with one click or display invite modal
                                        </p>
                                    </div>
                                </motion.div>
                            )}
                        </AnimatePresence>

                        {/* Create Button - Fun Style */}
                        <div className="text-center pt-4">
                            <button
                                type="submit"
                                className="group relative inline-flex items-center justify-center px-8 py-4 bg-black text-white font-bold text-lg rounded-2xl shadow-lg transform hover:scale-105 hover:shadow-xl transition-all duration-300 overflow-hidden vintage-btn"
                            >
                                <span className="relative z-10 flex items-center gap-3">
                                    <span className="text-2xl">🚀</span>
                                    Create Planning Room
                                    <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                                </span>
                                <div className="absolute inset-0 bg-gray-800 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                            </button>
                            <p className="text-gray-500 text-sm mt-3 font-distressed">
                                ✨ Your team will love this planning experience!
                            </p>
                        </div>
                    </form>
                </div>
            </motion.div>
        </div>
    )
} 