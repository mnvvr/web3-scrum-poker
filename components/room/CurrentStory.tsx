'use client'

import { motion } from 'framer-motion'
import { Story } from '@/types'
import { useState } from 'react'
import { Edit3, Save, X, Link, ExternalLink } from 'lucide-react'

interface CurrentStoryProps {
    story: Story
    onUpdateStory?: (updatedStory: Story) => void
    onEditStateChange?: (isEditing: boolean) => void
}

export function CurrentStory({ story, onUpdateStory, onEditStateChange }: CurrentStoryProps) {
    const [isExpanded, setIsExpanded] = useState(false)
    const [isEditing, setIsEditing] = useState(false)
    const [editTitle, setEditTitle] = useState(story.title)
    const [editDescription, setEditDescription] = useState(story.description || '')
    const [editReference, setEditReference] = useState(story.reference || '')
    const [showTooltip, setShowTooltip] = useState<string | null>(null)
    const [tooltipPosition, setTooltipPosition] = useState({ x: 0, y: 0 })

    const handleMouseEnter = (e: React.MouseEvent, tooltipType: string) => {
        const rect = e.currentTarget.getBoundingClientRect()
        setTooltipPosition({
            x: rect.left + rect.width / 2,
            y: rect.bottom + 10
        })
        setShowTooltip(tooltipType)
    }

    const handleMouseLeave = () => {
        setShowTooltip(null)
    }

    const maxLength = 100 // Reduced to make truncation more likely
    const shouldTruncate = story.description && story.description.length > maxLength
    const displayDescription = shouldTruncate && !isExpanded && story.description
        ? story.description.substring(0, maxLength) + '...'
        : story.description

    const handleSave = () => {
        if (onUpdateStory) {
            onUpdateStory({
                ...story,
                title: editTitle,
                description: editDescription,
                reference: editReference
            })
        }
        setIsEditing(false)
        onEditStateChange?.(false)
    }

    const handleCancel = () => {
        setEditTitle(story.title)
        setEditDescription(story.description || '')
        setEditReference(story.reference || '')
        setIsEditing(false)
        onEditStateChange?.(false)
    }

    const isValidUrl = (string: string) => {
        try {
            new URL(string)
            return true
        } catch (_) {
            return false
        }
    }

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-gradient-to-br from-white via-blue-50/20 to-purple-50/20 border border-gray-200 rounded-lg p-6 mb-8 shadow-md relative overflow-hidden"
        >
            {/* Subtle background pattern */}
            <div className="absolute inset-0 opacity-5">
                <div className="absolute top-4 right-4 w-8 h-8 bg-gradient-to-br from-blue-400 to-purple-400 rounded-full"></div>
            </div>

            <div className="relative">
                {/* Edit button - More visible */}
                {onUpdateStory && !isEditing && (
                    <motion.button
                        onClick={() => {
                            setIsEditing(true)
                            onEditStateChange?.(true)
                        }}
                        onMouseEnter={(e) => handleMouseEnter(e, 'edit')}
                        onMouseLeave={handleMouseLeave}
                        className="absolute top-0 right-0 p-2 text-gray-400 hover:text-black transition-colors bg-white rounded-lg border border-gray-200 hover:border-gray-300 shadow-sm hover:shadow-md"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                    >
                        <Edit3 size={18} />
                    </motion.button>
                )}

                <div className="pr-12"> {/* Space for edit button */}
                    <h2 className="text-xl font-bold text-black mb-4 font-brand bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent text-center">Current Task</h2>

                    {isEditing ? (
                        <div className="space-y-4">
                            {/* Title Input */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2 font-distressed text-center">Task Title</label>
                                <input
                                    type="text"
                                    value={editTitle}
                                    onChange={(e) => setEditTitle(e.target.value)}
                                    className="w-full p-3 border border-gray-300 rounded-lg text-lg font-medium bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent font-brand shadow-sm hover:shadow-md transition-all duration-300 text-center"
                                    placeholder="Enter task title..."
                                />
                            </div>

                            {/* Description Input */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2 font-distressed text-center">Description (optional)</label>
                                <textarea
                                    value={editDescription}
                                    onChange={(e) => setEditDescription(e.target.value)}
                                    rows={3}
                                    className="w-full p-3 border border-gray-300 rounded-lg text-gray-600 bg-white resize-none focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent font-distressed shadow-sm hover:shadow-md transition-all duration-300 text-center"
                                    placeholder="Add task description..."
                                />
                            </div>

                            {/* Reference Input */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2 font-distressed text-center">
                                    <Link size={16} className="inline mr-1" />
                                    Reference Link (optional)
                                </label>
                                <input
                                    type="url"
                                    value={editReference}
                                    onChange={(e) => setEditReference(e.target.value)}
                                    className="w-full p-3 border border-gray-300 rounded-lg text-gray-600 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent font-distressed shadow-sm hover:shadow-md transition-all duration-300 text-center"
                                    placeholder="https://jira.com/issue/ABC-123"
                                />
                                {editReference && !isValidUrl(editReference) && (
                                    <p className="text-red-500 text-sm mt-1 font-distressed text-center">Please enter a valid URL</p>
                                )}
                            </div>

                            {/* Action Buttons */}
                            <div className="flex gap-3 pt-2 justify-center">
                                <motion.button
                                    onClick={handleSave}
                                    disabled={!!editReference && !isValidUrl(editReference)}
                                    onMouseEnter={(e) => handleMouseEnter(e, 'save')}
                                    onMouseLeave={handleMouseLeave}
                                    className="flex items-center gap-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white px-4 py-2 rounded-lg hover:from-blue-700 hover:to-purple-700 transition-all duration-300 disabled:bg-gray-400 disabled:cursor-not-allowed font-brand shadow-md hover:shadow-lg"
                                    whileHover={{ scale: 1.02 }}
                                    whileTap={{ scale: 0.98 }}
                                >
                                    <Save size={16} />
                                    Save Changes
                                </motion.button>
                                <motion.button
                                    onClick={handleCancel}
                                    onMouseEnter={(e) => handleMouseEnter(e, 'cancel')}
                                    onMouseLeave={handleMouseLeave}
                                    className="flex items-center gap-2 bg-gray-500 text-white px-4 py-2 rounded-lg hover:bg-gray-600 transition-all duration-300 font-brand shadow-md hover:shadow-lg"
                                    whileHover={{ scale: 1.02 }}
                                    whileTap={{ scale: 0.98 }}
                                >
                                    <X size={16} />
                                    Cancel
                                </motion.button>
                            </div>
                        </div>
                    ) : (
                        <>
                            {/* Task Title */}
                            <h3 className="text-lg text-black mb-3 font-medium font-brand text-center">{story.title}</h3>

                            {/* Reference Link - Prominent */}
                            {story.reference && (
                                <motion.div
                                    className="mb-4 text-center"
                                    initial={{ opacity: 0, x: -10 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ delay: 0.2 }}
                                >
                                    <a
                                        href={story.reference}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-800 font-medium text-sm underline transition-colors font-distressed hover:scale-105 transform duration-200"
                                        title="Open reference link in new tab"
                                    >
                                        <ExternalLink size={16} />
                                        View Reference
                                    </a>
                                </motion.div>
                            )}

                            {/* Description - Optional */}
                            {story.description && (
                                <div className="text-center">
                                    <p className="text-gray-600 leading-relaxed mb-3 font-distressed">
                                        {displayDescription}
                                    </p>
                                    {shouldTruncate && (
                                        <motion.button
                                            onClick={() => setIsExpanded(!isExpanded)}
                                            onMouseEnter={(e) => handleMouseEnter(e, 'expand')}
                                            onMouseLeave={handleMouseLeave}
                                            className="text-blue-600 hover:text-blue-800 font-medium text-sm underline transition-colors font-distressed"
                                            whileHover={{ scale: 1.05 }}
                                            whileTap={{ scale: 0.95 }}
                                        >
                                            {isExpanded ? 'Show Less' : 'Show More'}
                                        </motion.button>
                                    )}
                                </div>
                            )}
                        </>
                    )}
                </div>
            </div>

            {/* Custom Tooltip */}
            {showTooltip && (
                <div
                    className="fixed pointer-events-none z-[2147483647]"
                    style={{
                        left: tooltipPosition.x,
                        top: tooltipPosition.y,
                        transform: 'translateX(-50%)'
                    }}
                >
                    <div className="bg-black text-white text-xs px-3 py-2 rounded-lg whitespace-nowrap border border-white/20 font-medium shadow-xl backdrop-blur-sm">
                        {showTooltip === 'edit' && "Edit task title, description, and reference link"}
                        {showTooltip === 'save' && (!!editReference && !isValidUrl(editReference) ? "Please enter a valid URL first" : "Save your changes to the task")}
                        {showTooltip === 'cancel' && "Discard changes and return to view mode"}
                        {showTooltip === 'expand' && (isExpanded ? "Show less of the description" : "Show full description")}
                        <div className="absolute left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 top-full border-t-4 border-transparent border-t-black"></div>
                    </div>
                </div>
            )}
        </motion.div>
    )
} 