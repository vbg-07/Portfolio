import { motion } from 'framer-motion'
import { useApp } from '../App'
import type { DeskItemType } from '../App'
import { useTheme } from '../contexts/ThemeContext'

interface DeskItemProps {
    id: DeskItemType
    className?: string
    style?: React.CSSProperties
    label: string
    children: React.ReactNode
}

export default function DeskItem({ id, className = '', style, label, children }: DeskItemProps) {
    const { setActiveItem } = useApp()
    const { isLight } = useTheme()

    return (
        <motion.div
            className={`desk-item group ${className}`}
            style={style}
            onClick={() => setActiveItem(id)}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.98 }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
                duration: 0.4,
                type: 'spring',
                stiffness: 300,
                damping: 25
            }}
        >
            {/* Glow effect on hover */}
            <div className="absolute -inset-4 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none blur-md"
                style={{
                    background: isLight
                        ? 'radial-gradient(circle at center, rgba(0, 0, 0, 0.4) 0%, rgba(0, 0, 0, 0.2) 30%, rgba(0, 0, 0, 0.1) 50%, rgba(0, 0, 0, 0.05) 70%, transparent 100%)'
                        : 'radial-gradient(circle at center, rgba(255, 255, 255, 0.2) 0%, rgba(255, 255, 255, 0.1) 40%, transparent 80%)',
                }}
            />

            {/* Content */}
            <div className="relative w-full h-full">
                {children}
            </div>

            {/* Label tooltip */}
            <motion.div
                className={`absolute -bottom-8 left-1/2 -translate-x-1/2 px-3 py-1 backdrop-blur-sm rounded-full border opacity-0 group-hover:opacity-100 transition-opacity duration-200 whitespace-nowrap z-10 ${isLight ? 'bg-gray-100/90 border-gray-300' : 'bg-dark-100/90 border-tech-blue-800/30'
                    }`}
                initial={{ y: -5 }}
                whileHover={{ y: 0 }}
            >
                <span className={`text-xs font-medium ${isLight ? 'text-gray-700' : 'text-tech-blue-300'}`}>{label}</span>
            </motion.div>
        </motion.div>
    )
}
