import { motion } from 'framer-motion'
import { useApp } from '../App'
import type { DeskItemType } from '../App'

const dashboardItems: { id: DeskItemType; icon: string; label: string; description: string; color: string }[] = [
    { id: 'monitor', icon: '📊', label: 'Data Dashboard', description: 'Analytics & Stories', color: 'from-tech-blue-500 to-tech-blue-600' },
    { id: 'server', icon: '☁️', label: 'AWS Infrastructure', description: 'Cloud Architecture', color: 'from-accent-green to-green-600' },
    { id: 'coffee', icon: '☕', label: 'About Me', description: 'Professional Bio', color: 'from-amber-500 to-orange-600' },
    { id: 'phone', icon: '📞', label: 'Contact', description: 'Get In Touch', color: 'from-accent-purple to-purple-600' },
    { id: 'blueprints', icon: '📄', label: 'Tech Docs', description: 'IaC & Blueprints', color: 'from-sky-500 to-blue-600' },
]

export default function CommandDashboard() {
    const { setActiveItem } = useApp()

    return (
        <div className="min-h-screen p-4 flex flex-col">
            {/* Header */}
            <motion.header
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-center py-6"
            >
                <h1 className="text-2xl font-bold text-gradient-blue">Command Dashboard</h1>
                <p className="text-gray-500 text-sm mt-1 font-mono">
                    <span className="text-accent-green">●</span> All systems operational
                </p>
            </motion.header>

            {/* Grid */}
            <div className="flex-1 grid grid-cols-2 gap-3 py-4">
                {dashboardItems.map((item, i) => (
                    <motion.button
                        key={item.id}
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: i * 0.1 }}
                        whileHover={{ scale: 1.03 }}
                        whileTap={{ scale: 0.97 }}
                        onClick={() => setActiveItem(item.id)}
                        className={`relative p-4 rounded-2xl bg-dark-200 border border-tech-blue-900/30 
                       hover:border-tech-blue-600/50 transition-all overflow-hidden
                       ${i === dashboardItems.length - 1 && dashboardItems.length % 2 !== 0 ? 'col-span-2' : ''}`}
                    >
                        {/* Gradient overlay */}
                        <div
                            className={`absolute inset-0 opacity-10 bg-gradient-to-br ${item.color}`}
                        />

                        {/* Content */}
                        <div className="relative z-10 flex flex-col items-start h-full">
                            <span className="text-3xl mb-2">{item.icon}</span>
                            <h3 className="font-semibold text-white text-left">{item.label}</h3>
                            <p className="text-xs text-gray-500 text-left">{item.description}</p>

                            {/* Arrow indicator */}
                            <div className="mt-auto pt-3 self-end">
                                <div className="w-6 h-6 rounded-full bg-dark-300 flex items-center justify-center">
                                    <svg className="w-3 h-3 text-tech-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                    </svg>
                                </div>
                            </div>
                        </div>

                        {/* Pulse indicator for server */}
                        {item.id === 'server' && (
                            <div className="absolute top-3 right-3 w-2 h-2 rounded-full bg-accent-green animate-pulse" />
                        )}
                    </motion.button>
                ))}
            </div>

            {/* Footer */}
            <motion.footer
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
                className="text-center py-4"
            >
                <p className="text-xs text-gray-600 font-mono">
                    v2.0.0 • SDE Portfolio
                </p>
            </motion.footer>
        </div>
    )
}
