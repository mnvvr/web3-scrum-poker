'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { CheckCircle, XCircle, AlertTriangle, Info, X } from 'lucide-react'
import { useState, useEffect } from 'react'

export type ToastType = 'success' | 'error' | 'warning' | 'info'

interface ToastProps {
    id: string
    type: ToastType
    title: string
    message?: string
    duration?: number
    onClose: (id: string) => void
}

const toastConfig = {
    success: {
        icon: CheckCircle,
        bgColor: 'bg-green-500',
        textColor: 'text-white',
        borderColor: 'border-green-600'
    },
    error: {
        icon: XCircle,
        bgColor: 'bg-red-500',
        textColor: 'text-white',
        borderColor: 'border-red-600'
    },
    warning: {
        icon: AlertTriangle,
        bgColor: 'bg-orange-500',
        textColor: 'text-white',
        borderColor: 'border-orange-600'
    },
    info: {
        icon: Info,
        bgColor: 'bg-blue-500',
        textColor: 'text-white',
        borderColor: 'border-blue-600'
    }
}

export function Toast({ id, type, title, message, duration = 5000, onClose }: ToastProps) {
    const [isVisible, setIsVisible] = useState(true)
    const config = toastConfig[type]
    const Icon = config.icon

    useEffect(() => {
        const timer = setTimeout(() => {
            setIsVisible(false)
            setTimeout(() => onClose(id), 300)
        }, duration)

        return () => clearTimeout(timer)
    }, [id, duration, onClose])

    const handleClose = () => {
        setIsVisible(false)
        setTimeout(() => onClose(id), 300)
    }

    return (
        <AnimatePresence>
            {isVisible && (
                <motion.div
                    initial={{ opacity: 0, x: 100, scale: 0.9 }}
                    animate={{ opacity: 1, x: 0, scale: 1 }}
                    exit={{ opacity: 0, x: 100, scale: 0.9 }}
                    transition={{ duration: 0.3, ease: 'easeOut' }}
                    className={`${config.bgColor} ${config.textColor} ${config.borderColor} border-2 rounded-lg p-4 shadow-lg max-w-sm w-full`}
                    style={{ zIndex: 9999 }}
                >
                    <div className="flex items-start gap-3">
                        <Icon className="w-5 h-5 flex-shrink-0 mt-0.5" />
                        
                        <div className="flex-1 min-w-0">
                            <h4 className="font-bold text-sm font-brand mb-1">
                                {title}
                            </h4>
                            {message && (
                                <p className="text-sm opacity-90 font-distressed">
                                    {message}
                                </p>
                            )}
                        </div>
                        
                        <button
                            onClick={handleClose}
                            className="flex-shrink-0 p-1 hover:bg-black/10 rounded transition-colors"
                        >
                            <X className="w-4 h-4" />
                        </button>
                    </div>
                    
                    {/* Progress bar */}
                    <motion.div
                        initial={{ width: '100%' }}
                        animate={{ width: '0%' }}
                        transition={{ duration: duration / 1000, ease: 'linear' }}
                        className="absolute bottom-0 left-0 h-1 bg-white/30 rounded-bl-lg"
                    />
                </motion.div>
            )}
        </AnimatePresence>
    )
}

// Toast Container Component
interface ToastContainerProps {
    toasts: Array<{
        id: string
        type: ToastType
        title: string
        message?: string
        duration?: number
    }>
    onRemoveToast: (id: string) => void
}

export function ToastContainer({ toasts, onRemoveToast }: ToastContainerProps) {
    return (
        <div className="fixed top-4 right-4 z-50 space-y-2">
            {toasts.map((toast) => (
                <Toast
                    key={toast.id}
                    {...toast}
                    onClose={onRemoveToast}
                />
            ))}
        </div>
    )
}