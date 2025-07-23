'use client'

import { motion } from 'framer-motion'
import { Story } from '@/types'

interface CurrentStoryProps {
    story: Story
}

export function CurrentStory({ story }: CurrentStoryProps) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20, rotateX: -5 }}
            animate={{ opacity: 1, y: 0, rotateX: 0 }}
            className="bg-white border border-black rounded-lg p-8 mb-8 shadow-lg relative overflow-hidden chani-card"
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
            <div className="absolute top-4 right-4 w-8 h-8 text-black/10 font-bold text-lg transform rotate-12">📋</div>
            <div className="absolute bottom-4 left-4 w-8 h-8 text-black/10 font-bold text-lg transform -rotate-12">✏️</div>

            <div className="text-center relative z-10">
                <h2 className="text-2xl font-bold text-black mb-3 font-brand">Current Task</h2>
                <h3 className="text-xl text-black mb-4 font-medium font-distressed">{story.title}</h3>
                {story.description && (
                    <p className="text-gray-600 max-w-2xl mx-auto leading-relaxed font-distressed">{story.description}</p>
                )}
            </div>
        </motion.div>
    )
} 