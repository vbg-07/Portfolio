import { useState } from 'react'
import type { FormEvent } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import emailjs from '@emailjs/browser'

type FormStatus = 'idle' | 'connecting' | 'sending' | 'success' | 'error'

export default function PhoneContent() {
    const [formData, setFormData] = useState({ name: '', email: '', message: '' })
    const [status, setStatus] = useState<FormStatus>('idle')
    const [emailError, setEmailError] = useState('')

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault()

        // Check for configuration first
        const serviceId = import.meta.env.VITE_EMAILJS_SERVICE_ID
        const templateId = import.meta.env.VITE_EMAILJS_TEMPLATE_ID
        const publicKey = import.meta.env.VITE_EMAILJS_PUBLIC_KEY

        if (!serviceId || !templateId || !publicKey) {
            setStatus('error')
            setEmailError('Configuration missing: Please set EmailJS keys in .env')
            return
        }

        setStatus('connecting')
        setEmailError('')

        // Artificial delay for "connecting" animation phase
        await new Promise(r => setTimeout(r, 800))
        setStatus('sending')

        try {
            await emailjs.send(
                serviceId,
                templateId,
                {
                    from_name: formData.name,
                    from_email: formData.email,
                    reply_to: formData.email,
                    email: formData.email,
                    message: formData.message,
                    to_name: 'Vignesh',
                },
                publicKey
            )
            setStatus('success')

            // Reset after success
            setTimeout(() => {
                setStatus('idle')
                setFormData({ name: '', email: '', message: '' })
            }, 3000)

        } catch (error: any) {
            console.error('EmailJS Error:', error)
            setStatus('error')

            // Extract specific error message
            const errorMessage = error?.text || error?.message || 'Failed to send message.'
            setEmailError(`Error: ${errorMessage}`)
        }
    }

    const getStatusText = () => {
        switch (status) {
            case 'connecting': return 'Establishing secure connection...'
            case 'sending': return 'Transmitting message...'
            case 'success': return 'Message delivered successfully!'
            case 'error': return emailError || 'Connection failed.'
            default: return 'Ready to connect'
        }
    }

    return (
        <div className="space-y-6">
            {/* Terminal-style status bar */}
            <motion.div
                className="bg-dark-300 rounded-lg p-4 border border-tech-blue-900/30 font-mono"
                animate={{
                    borderColor: status === 'success'
                        ? 'rgba(0, 255, 148, 0.3)'
                        : status === 'error'
                            ? 'rgba(239, 68, 68, 0.3)'
                            : 'rgba(0, 212, 255, 0.1)'
                }}
            >
                <div className="flex items-center gap-2 mb-2">
                    <div className="flex gap-1.5">
                        <div className="w-3 h-3 rounded-full bg-red-500/80" />
                        <div className="w-3 h-3 rounded-full bg-yellow-500/80" />
                        <div className="w-3 h-3 rounded-full bg-green-500/80" />
                    </div>
                    <span className="text-xs text-gray-500">contact_terminal.sh</span>
                </div>

                <div className="text-sm">
                    <span className={`${status === 'error' ? 'text-red-400' : 'text-accent-green'}`}>$</span>{' '}
                    <span className={`${status === 'error' ? 'text-red-400' : 'text-gray-400'}`}>{getStatusText()}</span>
                    {(status === 'connecting' || status === 'sending') && (
                        <span className="terminal-cursor" />
                    )}
                </div>

                {/* Progress indicator */}
                <AnimatePresence>
                    {(status === 'connecting' || status === 'sending') && (
                        <motion.div
                            initial={{ scaleX: 0 }}
                            animate={{ scaleX: 1 }}
                            exit={{ opacity: 0 }}
                            transition={{ duration: status === 'connecting' ? 1 : 1.5 }}
                            className="mt-3 h-1 bg-gradient-to-r from-tech-blue-500 to-accent-purple rounded-full origin-left"
                        />
                    )}
                </AnimatePresence>

                {status === 'success' && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="mt-3 text-accent-green text-xs"
                    >
                        ✓ Connection established. Message queued for delivery.
                    </motion.div>
                )}
            </motion.div>

            {/* Contact Form */}
            <form onSubmit={handleSubmit} className="space-y-4">

                <div>
                    <label className="block text-sm font-medium text-gray-400 mb-2">Name</label>
                    <input
                        type="text"
                        required
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        className="w-full px-4 py-3 bg-dark-200 border border-tech-blue-900/30 rounded-lg text-white placeholder-gray-500 focus:border-tech-blue-500 focus:outline-none focus:ring-1 focus:ring-tech-blue-500/50 transition-colors"
                        placeholder="Your name"
                        disabled={status !== 'idle'}
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-400 mb-2">Email</label>
                    <input
                        type="email"
                        required
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        className="w-full px-4 py-3 bg-dark-200 border border-tech-blue-900/30 rounded-lg text-white placeholder-gray-500 focus:border-tech-blue-500 focus:outline-none focus:ring-1 focus:ring-tech-blue-500/50 transition-colors"
                        placeholder="your@email.com"
                        disabled={status !== 'idle'}
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-400 mb-2">Message</label>
                    <textarea
                        required
                        rows={4}
                        value={formData.message}
                        onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                        className="w-full px-4 py-3 bg-dark-200 border border-tech-blue-900/30 rounded-lg text-white placeholder-gray-500 focus:border-tech-blue-500 focus:outline-none focus:ring-1 focus:ring-tech-blue-500/50 transition-colors resize-none"
                        placeholder="Let's build something amazing together..."
                        disabled={status !== 'idle'}
                    />
                </div>

                <motion.button
                    type="submit"
                    disabled={status !== 'idle'}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="w-full py-3 bg-gradient-to-r from-tech-blue-600 to-accent-purple text-white font-medium rounded-lg hover:from-tech-blue-500 hover:to-accent-purple/90 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                >
                    {status === 'idle' ? 'Send Message' : 'Processing...'}
                </motion.button>
            </form>

            {/* Social links */}
            <div className="grid grid-cols-2 gap-4 pt-4 border-t border-dark-50">
                <motion.a
                    href="https://github.com/vbg-07"
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ y: -2 }}
                    className="flex items-center gap-3 p-4 bg-dark-200 rounded-lg border border-tech-blue-900/30 hover:border-tech-blue-600/50 transition-colors group"
                >
                    <svg className="w-6 h-6 text-gray-400 group-hover:text-white transition-colors" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                    </svg>
                    <div>
                        <div className="text-sm font-medium text-white">GitHub</div>
                        <div className="text-xs text-gray-500">@vbg-07</div>
                    </div>
                </motion.a>

                <motion.a
                    href="https://www.linkedin.com/in/vignesh-b-84545a27b"
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ y: -2 }}
                    className="flex items-center gap-3 p-4 bg-dark-200 rounded-lg border border-tech-blue-900/30 hover:border-blue-500/50 transition-colors group"
                >
                    <svg className="w-6 h-6 text-gray-400 group-hover:text-blue-400 transition-colors" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                    </svg>
                    <div>
                        <div className="text-sm font-medium text-white">LinkedIn</div>
                        <div className="text-xs text-gray-500">Vignesh B</div>
                    </div>
                </motion.a>
            </div>
        </div>
    )
}
