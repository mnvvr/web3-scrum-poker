'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { ArrowRight, Users, Zap, Shield, Globe } from 'lucide-react'
import { CARD_TYPES } from '@/types'

export default function HomePage() {
    const [hoveredCard, setHoveredCard] = useState<string | null>(null)

    return (
        <div className="min-h-screen bg-white relative overflow-hidden">
            {/* Background Texture */}
            <div className="absolute inset-0 bg-gradient-to-br from-gray-50 to-white opacity-30"></div>
            <div className="absolute inset-0" style={{
                backgroundImage: `repeating-linear-gradient(45deg, transparent, transparent 2px, rgba(0,0,0,0.01) 2px, rgba(0,0,0,0.01) 4px)`
            }}></div>

            {/* Moving Banner */}
            <div className="chani-top-banner bg-black text-white py-3 overflow-hidden relative z-10">
                <div className="chani-banner-content">
                    <span className="banner-slide">🎴 Web3 Scrum Poker • Decentralized Planning • Transparent Voting • Community-Driven • No Registration Required • Instant Setup • Blockchain-Powered • Trustless Estimation • Real-time Collaboration • Secure & Private •</span>
                </div>
            </div>

            {/* Hero Section */}
            <section className="relative z-10 py-20 px-4">
                <div className="max-w-6xl mx-auto text-center">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                    >
                        <h1 className="text-5xl md:text-7xl font-bold text-black mb-6 font-brand">
                            Web3 Scrum Poker
                        </h1>
                        <p className="text-xl md:text-2xl text-gray-600 mb-8 font-distressed max-w-3xl mx-auto leading-relaxed">
                            Decentralized planning poker for modern teams.
                            <br />
                            <span className="text-black font-medium">Transparent, secure, and accessible.</span>
                        </p>

                        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
                            <motion.button
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                className="bg-black text-white font-bold py-4 px-8 rounded-lg text-lg flex items-center gap-2 hover:bg-gray-800 transition-colors vintage-btn"
                                onClick={() => window.location.href = '/room/create'}
                            >
                                Try It Free
                                <ArrowRight className="w-5 h-5" />
                            </motion.button>
                            <motion.button
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                className="bg-white text-black font-bold py-4 px-8 rounded-lg text-lg border-2 border-black hover:bg-gray-50 transition-colors vintage-btn"
                                onClick={() => window.location.href = '/room/create?mode=wallet'}
                            >
                                Connect Wallet
                                <Zap className="w-5 h-5" />
                            </motion.button>
                        </div>
                    </motion.div>

                    {/* Floating Elements */}
                    <div className="floating-element absolute top-20 left-10 text-4xl opacity-10">🎯</div>
                    <div className="floating-element absolute top-40 right-20 text-3xl opacity-10">💡</div>
                    <div className="floating-element absolute bottom-20 left-20 text-2xl opacity-10">🚀</div>
                    <div className="floating-element absolute bottom-40 right-10 text-3xl opacity-10">✨</div>
                </div>
            </section>

            {/* How It Works Section */}
            <section className="py-20 px-4 relative z-10">
                <div className="max-w-6xl mx-auto">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                        viewport={{ once: true }}
                        className="text-center mb-16"
                    >
                        <h2 className="text-4xl font-bold text-black mb-4 font-brand">How It Works</h2>
                        <p className="text-xl text-gray-600 font-distressed">Simple, transparent, and effective planning</p>
                    </motion.div>

                    <div className="grid md:grid-cols-3 gap-8">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8, delay: 0.1 }}
                            viewport={{ once: true }}
                            className="poker-card bg-white border border-black rounded-lg p-8 text-center shadow-lg relative overflow-hidden vintage-paper"
                            style={{
                                boxShadow: '6px 6px 0 rgba(0, 0, 0, 0.15), 12px 12px 0 rgba(0, 0, 0, 0.1)',
                                transform: 'rotate(var(--rotation, -1deg))'
                            }}
                        >
                            <div className="absolute inset-0 bg-gradient-to-br from-gray-50 to-white opacity-30"></div>
                            <div className="absolute top-4 right-4 w-8 h-8 text-black/10 font-bold text-lg transform rotate-12">1</div>
                            <div className="relative z-10">
                                <div className="w-16 h-16 bg-black rounded-full flex items-center justify-center mx-auto mb-6">
                                    <Users className="w-8 h-8 text-white" />
                                </div>
                                <h3 className="text-2xl font-bold text-black mb-4 font-brand">Create Room</h3>
                                <p className="text-gray-600 font-distressed">Start a planning session with your team. No registration required.</p>
                            </div>
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8, delay: 0.2 }}
                            viewport={{ once: true }}
                            className="poker-card bg-white border border-black rounded-lg p-8 text-center shadow-lg relative overflow-hidden vintage-paper"
                            style={{
                                boxShadow: '6px 6px 0 rgba(0, 0, 0, 0.15), 12px 12px 0 rgba(0, 0, 0, 0.1)',
                                transform: 'rotate(var(--rotation, 1deg))'
                            }}
                        >
                            <div className="absolute inset-0 bg-gradient-to-br from-gray-50 to-white opacity-30"></div>
                            <div className="absolute top-4 right-4 w-8 h-8 text-black/10 font-bold text-lg transform -rotate-12">2</div>
                            <div className="relative z-10">
                                <div className="w-16 h-16 bg-black rounded-full flex items-center justify-center mx-auto mb-6">
                                    <Zap className="w-8 h-8 text-white" />
                                </div>
                                <h3 className="text-2xl font-bold text-black mb-4 font-brand">Vote Privately</h3>
                                <p className="text-gray-600 font-distressed">Select your estimate. Your vote is private until revealed.</p>
                            </div>
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8, delay: 0.3 }}
                            viewport={{ once: true }}
                            className="poker-card bg-white border border-black rounded-lg p-8 text-center shadow-lg relative overflow-hidden vintage-paper"
                            style={{
                                boxShadow: '6px 6px 0 rgba(0, 0, 0, 0.15), 12px 12px 0 rgba(0, 0, 0, 0.1)',
                                transform: 'rotate(var(--rotation, -1deg))'
                            }}
                        >
                            <div className="absolute inset-0 bg-gradient-to-br from-gray-50 to-white opacity-30"></div>
                            <div className="absolute top-4 right-4 w-8 h-8 text-black/10 font-bold text-lg transform rotate-12">3</div>
                            <div className="relative z-10">
                                <div className="w-16 h-16 bg-black rounded-full flex items-center justify-center mx-auto mb-6">
                                    <Shield className="w-8 h-8 text-white" />
                                </div>
                                <h3 className="text-2xl font-bold text-black mb-4 font-brand">Reveal & Discuss</h3>
                                <p className="text-gray-600 font-distressed">See all votes and discuss differences to reach consensus.</p>
                            </div>
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* Card Types Section */}
            <section className="py-20 px-4 relative z-10 bg-gray-50">
                <div className="max-w-6xl mx-auto">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                        viewport={{ once: true }}
                        className="text-center mb-16"
                    >
                        <h2 className="text-4xl font-bold text-black mb-4 font-brand">🎴 Card Types Explained</h2>
                        <p className="text-xl text-gray-600 font-distressed">Choose the estimation style that fits your team</p>
                    </motion.div>

                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {Object.entries(CARD_TYPES).map(([type, config], index) => (
                            <motion.div
                                key={type}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.8, delay: index * 0.1 }}
                                viewport={{ once: true }}
                                className="bg-white border border-black rounded-lg p-6 shadow-lg relative overflow-hidden vintage-paper group hover:shadow-xl transition-all duration-300"
                                style={{
                                    boxShadow: '4px 4px 0 rgba(0, 0, 0, 0.1)',
                                    transform: 'rotate(var(--rotation, 0deg))'
                                }}
                                onMouseEnter={() => setHoveredCard(type)}
                                onMouseLeave={() => setHoveredCard(null)}
                            >
                                {/* Distressed background pattern */}
                                <div className="absolute inset-0 bg-gradient-to-br from-gray-50 to-white opacity-30"></div>

                                <div className="relative z-10">
                                    {/* Header with icon and name */}
                                    <div className="flex items-center gap-3 mb-4">
                                        <div className="w-12 h-12 rounded-lg bg-black flex items-center justify-center text-white text-xl">
                                            {config.icon}
                                        </div>
                                        <div>
                                            <h3 className="font-bold text-black font-brand text-lg">{config.name}</h3>
                                            <p className="text-gray-600 text-sm font-distressed">{config.description}</p>
                                        </div>
                                    </div>

                                    {/* Use case */}
                                    <p className="text-gray-700 text-sm mb-4 font-distressed italic">
                                        {config.useCase}
                                    </p>

                                    {/* Card preview */}
                                    <div className="flex flex-wrap gap-1 justify-center mb-4">
                                        {config.values.slice(0, 6).map((value, idx) => (
                                            <div
                                                key={value}
                                                className="w-6 h-8 rounded flex items-center justify-center text-white text-xs font-bold border border-black/20 bg-black transform hover:rotate-2 transition-transform"
                                            >
                                                {value}
                                            </div>
                                        ))}
                                        {config.values.length > 6 && (
                                            <div className="w-6 h-8 bg-gray-300 rounded flex items-center justify-center text-gray-600 text-xs font-bold border border-gray-400">
                                                +{config.values.length - 6}
                                            </div>
                                        )}
                                    </div>

                                    {/* Hover tooltip */}
                                    {hoveredCard === type && (
                                        <motion.div
                                            initial={{ opacity: 0, y: 10 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 z-20"
                                        >
                                            <div className="bg-black text-white text-xs px-3 py-2 rounded-lg whitespace-nowrap border border-white/20">
                                                Available in room creation
                                                <div className="absolute top-full left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-black"></div>
                                            </div>
                                        </motion.div>
                                    )}
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Web3 without the complexity */}
            <section className="py-20 px-4 relative z-10">
                <div className="max-w-4xl mx-auto text-center">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                        viewport={{ once: true }}
                    >
                        <h2 className="text-4xl font-bold text-black mb-6 font-brand">Web3 without the complexity</h2>
                        <p className="text-xl text-gray-600 mb-8 font-distressed">
                            Experience the benefits of blockchain technology without the technical overhead.
                            <br />
                            Simple, secure, and accessible to everyone.
                        </p>

                        <div className="grid md:grid-cols-3 gap-8 mt-12">
                            <div className="text-center">
                                <div className="w-16 h-16 bg-black rounded-full flex items-center justify-center mx-auto mb-4">
                                    <Shield className="w-8 h-8 text-white" />
                                </div>
                                <h3 className="text-xl font-bold text-black mb-2 font-brand">Secure</h3>
                                <p className="text-gray-600 font-distressed">Your votes are encrypted and secure</p>
                            </div>

                            <div className="text-center">
                                <div className="w-16 h-16 bg-black rounded-full flex items-center justify-center mx-auto mb-4">
                                    <Globe className="w-8 h-8 text-white" />
                                </div>
                                <h3 className="text-xl font-bold text-black mb-2 font-brand">Transparent</h3>
                                <p className="text-gray-600 font-distressed">All results are verifiable on-chain</p>
                            </div>

                            <div className="text-center">
                                <div className="w-16 h-16 bg-black rounded-full flex items-center justify-center mx-auto mb-4">
                                    <Users className="w-8 h-8 text-white" />
                                </div>
                                <h3 className="text-xl font-bold text-black mb-2 font-brand">Accessible</h3>
                                <p className="text-gray-600 font-distressed">No technical knowledge required</p>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* Trusted by the Community */}
            <section className="py-20 px-4 relative z-10 bg-gray-50">
                <div className="max-w-6xl mx-auto">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                        viewport={{ once: true }}
                        className="text-center mb-16"
                    >
                        <h2 className="text-4xl font-bold text-black mb-4 font-brand">Trusted by the Community</h2>
                        <p className="text-xl text-gray-600 font-distressed">Join teams worldwide using Web3 Scrum Poker</p>
                    </motion.div>

                    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                        {[
                            { name: 'Alice', role: 'Product Manager', company: 'TechCorp', avatar: '👩‍💼' },
                            { name: 'Bob', role: 'Lead Developer', company: 'DevStudio', avatar: '👨‍💻' },
                            { name: 'Carol', role: 'Scrum Master', company: 'AgileTeam', avatar: '👩‍🏫' },
                            { name: 'David', role: 'UX Designer', company: 'DesignHub', avatar: '👨‍🎨' }
                        ].map((person, index) => (
                            <motion.div
                                key={person.name}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.8, delay: index * 0.1 }}
                                viewport={{ once: true }}
                                className="bg-white border border-black rounded-lg p-6 text-center shadow-lg relative overflow-hidden vintage-paper"
                                style={{
                                    boxShadow: '4px 4px 0 rgba(0, 0, 0, 0.1)',
                                    transform: 'rotate(var(--rotation, 0deg))'
                                }}
                            >
                                <div className="absolute inset-0 bg-gradient-to-br from-gray-50 to-white opacity-30"></div>
                                <div className="relative z-10">
                                    <div className="text-4xl mb-4">{person.avatar}</div>
                                    <h3 className="font-bold text-black mb-2 font-brand">{person.name}</h3>
                                    <p className="text-gray-600 text-sm mb-1 font-distressed">{person.role}</p>
                                    <p className="text-gray-500 text-xs font-distressed">{person.company}</p>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="py-20 px-4 relative z-10">
                <div className="max-w-4xl mx-auto text-center">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                        viewport={{ once: true }}
                    >
                        <h2 className="text-4xl font-bold text-black mb-6 font-brand">Ready to Experience It?</h2>
                        <p className="text-xl text-gray-600 mb-8 font-distressed">
                            Start your first planning session in under 30 seconds
                        </p>

                        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                            <motion.button
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                className="bg-black text-white font-bold py-4 px-8 rounded-lg text-lg flex items-center gap-2 hover:bg-gray-800 transition-colors vintage-btn"
                                onClick={() => window.location.href = '/room/create'}
                            >
                                Start Planning
                                <ArrowRight className="w-5 h-5" />
                            </motion.button>
                            <motion.button
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                className="bg-white text-black font-bold py-4 px-8 rounded-lg text-lg border-2 border-black hover:bg-gray-50 transition-colors vintage-btn"
                                onClick={() => window.location.href = '/room/create?mode=wallet'}
                            >
                                Connect Wallet
                                <Zap className="w-5 h-5" />
                            </motion.button>
                        </div>
                    </motion.div>
                </div>
            </section>
        </div>
    )
} 