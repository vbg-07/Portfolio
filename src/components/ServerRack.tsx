import { motion } from 'framer-motion'
import { useTheme } from '../contexts/ThemeContext'

export default function ServerRack() {
    const { isLight } = useTheme()

    return (
        <div className={`w-full h-full flex flex-col gap-1 p-2 rounded-lg border shadow-lg transition-colors duration-300 ${isLight ? 'bg-gray-200 border-gray-300' : 'bg-dark-200 border-tech-blue-900/30'
            }`}>
            {/* Rack unit 1 */}
            <motion.div
                className={`flex-1 rounded border p-1 flex items-center gap-1 transition-colors duration-300 ${isLight ? 'bg-gray-300 border-gray-400' : 'bg-dark-300 border-dark-50'
                    }`}
                animate={{
                    boxShadow: isLight
                        ? ['0 0 10px rgba(0, 0, 0, 0.1)', '0 0 20px rgba(0, 0, 0, 0.15)', '0 0 10px rgba(0, 0, 0, 0.1)']
                        : ['0 0 10px rgba(255, 255, 255, 0.05)', '0 0 20px rgba(255, 255, 255, 0.1)', '0 0 10px rgba(255, 255, 255, 0.05)']
                }}
                transition={{ duration: 2, repeat: Infinity }}
            >
                <div className="w-2 h-2 rounded-full bg-gray-400 animate-pulse" />
                <div className="flex-1 flex gap-0.5">
                    {[...Array(6)].map((_, i) => (
                        <motion.div
                            key={i}
                            className={`flex-1 h-3 rounded-sm ${isLight ? 'bg-gray-400' : 'bg-dark-100'}`}
                            animate={{ opacity: [0.3, 1, 0.3] }}
                            transition={{ duration: 0.5, repeat: Infinity, delay: i * 0.1 }}
                        />
                    ))}
                </div>
            </motion.div>

            {/* Rack unit 2 */}
            <div className={`flex-1 rounded border p-1 flex items-center gap-1 transition-colors duration-300 ${isLight ? 'bg-gray-300 border-gray-400' : 'bg-dark-300 border-dark-50'}`}>
                <div className={`w-2 h-2 rounded-full animate-pulse ${isLight ? 'bg-gray-500' : 'bg-gray-500'}`} />
                <div className="flex-1 grid grid-cols-4 gap-0.5">
                    {[...Array(8)].map((_, i) => (
                        <div key={i} className={`h-2 rounded-sm ${isLight ? 'bg-gray-400/50' : 'bg-dark-100/50'}`} />
                    ))}
                </div>
            </div>

            {/* Rack unit 3 */}
            <div className={`flex-1 rounded border p-1 flex items-center gap-1 transition-colors duration-300 ${isLight ? 'bg-gray-300 border-gray-400' : 'bg-dark-300 border-dark-50'}`}>
                <div className={`w-2 h-2 rounded-full ${isLight ? 'bg-gray-500' : 'bg-gray-600'}`} />
                <div className="flex-1 h-full flex items-center justify-center">
                    <span className={`text-[6px] font-mono tracking-widest ${isLight ? 'text-gray-600' : 'text-gray-400'}`}>AWS</span>
                </div>
            </div>

            {/* Status bar */}
            <div className={`flex items-center justify-between px-1 py-0.5 rounded transition-colors duration-300 ${isLight ? 'bg-gray-300' : 'bg-dark-400'}`}>
                <span className={`text-[5px] font-mono ${isLight ? 'text-gray-600' : 'text-gray-500'}`}>STATUS</span>
                <div className="flex items-center gap-1">
                    <div className="led-online" />
                    <span className={`text-[5px] font-mono ${isLight ? 'text-gray-600' : 'text-gray-400'}`}>ONLINE</span>
                </div>
            </div>

            {/* Glow effect */}
            <motion.div
                className="absolute inset-0 rounded-lg pointer-events-none"
                animate={{
                    boxShadow: isLight
                        ? ['0 0 20px rgba(0, 0, 0, 0.1)', '0 0 40px rgba(0, 0, 0, 0.15)', '0 0 20px rgba(0, 0, 0, 0.1)']
                        : ['0 0 20px rgba(255, 255, 255, 0.05)', '0 0 40px rgba(255, 255, 255, 0.1)', '0 0 20px rgba(255, 255, 255, 0.05)']
                }}
                transition={{ duration: 2, repeat: Infinity }}
            />
        </div>
    )
}
