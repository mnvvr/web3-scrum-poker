'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { CardType, CARD_TYPES } from '@/types'
import { ChevronDown, Check } from 'lucide-react'

interface CardTypeSelectorProps {
    currentType: CardType
    onTypeChange: (type: CardType) => void
    isVoting: boolean
}

export function CardTypeSelector({ currentType, onTypeChange, isVoting }: CardTypeSelectorProps) {
    const [isOpen, setIsOpen] = useState(false)

    const handleTypeChange = (type: CardType) => {
        if (!isVoting) {
            onTypeChange(type)
            setIsOpen(false)
        }
    }

    return (
        <div className="relative">
            <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-white border border-black rounded-lg p-4 shadow-sm relative overflow-hidden vintage-paper"
                style={{
                    boxShadow: '2px 2px 0 rgba(0, 0, 0, 0.1)',
                    transform: 'rotate(var(--rotation, 1deg))'
                }}
            >
                {/* Distressed background pattern */}
                <div className="absolute inset-0 bg-gradient-to-br from-gray-50 to-white opacity-30"></div>
                <div className="absolute top-2 right-2 w-6 h-6 text-black/10 font-bold text-sm transform rotate-12">🎴</div>

                <div className="relative z-10">
                    <div className="flex items-center justify-between mb-3">
                        <h4 className="text-lg font-bold text-black font-brand">Card Type</h4>
                        <button
                            onClick={() => setIsOpen(!isOpen)}
                            disabled={isVoting}
                            className={`flex items-center gap-2 px-3 py-1.5 rounded-lg border border-black transition-all duration-200 ${isVoting
                                ? 'bg-gray-100 text-gray-500 cursor-not-allowed'
                                : 'bg-white text-black hover:bg-gray-50 hover:scale-105'
                                } transform hover:rotate-1`}
                        >
                            <span className="text-sm font-medium font-distressed">
                                {CARD_TYPES[currentType].name}
                            </span>
                            <ChevronDown className={`w-4 h-4 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
                        </button>
                    </div>

                    {/* Current type preview */}
                    <div className="mb-3">
                        <p className="text-gray-600 text-sm font-distressed mb-2">
                            {CARD_TYPES[currentType].description}
                        </p>
                        <div className="flex flex-wrap gap-2">
                            {CARD_TYPES[currentType].values.slice(0, 6).map((value, index) => (
                                <div
                                    key={value}
                                    className="w-8 h-10 bg-gradient-to-br from-green-400 to-green-600 rounded-lg flex items-center justify-center text-white text-xs font-bold border border-black/20 transform hover:rotate-2 transition-transform"
                                >
                                    {value}
                                </div>
                            ))}
                            {CARD_TYPES[currentType].values.length > 6 && (
                                <div className="w-8 h-10 bg-gray-300 rounded-lg flex items-center justify-center text-gray-600 text-xs font-bold border border-gray-400">
                                    +{CARD_TYPES[currentType].values.length - 6}
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Warning if voting is active */}
                    {isVoting && (
                        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-3 text-sm">
                            <p className="text-yellow-800 font-distressed">
                                ⚠️ Card type cannot be changed while voting is active
                            </p>
                        </div>
                    )}
                </div>
            </motion.div>

            {/* Dropdown */}
            <AnimatePresence>
                {isOpen && !isVoting && (
                    <motion.div
                        initial={{ opacity: 0, y: -10, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: -10, scale: 0.95 }}
                        className="absolute top-full left-0 right-0 mt-2 bg-white border border-black rounded-lg shadow-lg z-20 overflow-hidden vintage-paper"
                        style={{
                            boxShadow: '4px 4px 0 rgba(0, 0, 0, 0.15)',
                            transform: 'rotate(var(--rotation, -1deg))'
                        }}
                    >
                        {/* Distressed overlay */}
                        <div className="absolute inset-0 bg-gradient-to-br from-gray-50 to-white opacity-30"></div>

                        <div className="relative z-10">
                            {Object.entries(CARD_TYPES).map(([type, config]) => (
                                <button
                                    key={type}
                                    onClick={() => handleTypeChange(type as CardType)}
                                    className={`w-full p-4 text-left border-b border-gray-200 last:border-b-0 transition-all duration-200 hover:bg-gray-50 ${currentType === type ? 'bg-green-50 border-green-200' : ''
                                        }`}
                                >
                                    <div className="flex items-center justify-between mb-2">
                                        <div className="flex items-center gap-3">
                                            <div className="w-6 h-6 rounded-full bg-gradient-to-br from-green-400 to-green-600 flex items-center justify-center">
                                                {currentType === type && <Check className="w-4 h-4 text-white" />}
                                            </div>
                                            <span className="font-bold text-black font-brand">{config.name}</span>
                                        </div>
                                        {currentType === type && (
                                            <span className="text-green-600 text-sm font-medium">Current</span>
                                        )}
                                    </div>

                                    <p className="text-gray-600 text-sm font-distressed mb-3">
                                        {config.description}
                                    </p>

                                    <div className="flex flex-wrap gap-1">
                                        {config.values.slice(0, 8).map((value, index) => (
                                            <div
                                                key={value}
                                                className="w-6 h-8 bg-gradient-to-br from-green-400 to-green-600 rounded flex items-center justify-center text-white text-xs font-bold border border-black/20"
                                            >
                                                {value}
                                            </div>
                                        ))}
                                        {config.values.length > 8 && (
                                            <div className="w-6 h-8 bg-gray-300 rounded flex items-center justify-center text-gray-600 text-xs font-bold border border-gray-400">
                                                +{config.values.length - 8}
                                            </div>
                                        )}
                                    </div>
                                </button>
                            ))}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    )
} 