import { motion } from 'framer-motion'
import { useApp } from '../App'
import type { DeskItemType } from '../App'

interface DeskItemProps {
    id: DeskItemType
    className?: string
    style?: React.CSSProperties
    label: string
    children: React.ReactNode
}

export default function DeskItem({ id, className = '', style, label, children }: DeskItemProps) {
    const { setActiveItem } = useApp()

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
            <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
                style={{
                    background: 'radial-gradient(circle at center, rgba(0, 212, 255, 0.15) 0%, transparent 70%)',
                }}
            />

            {/* Content */}
            <div className="relative w-full h-full">
                {children}
            </div>

            {/* Label tooltip */}
            <motion.div
                className="absolute -bottom-8 left-1/2 -translate-x-1/2 px-3 py-1 bg-dark-100/90 backdrop-blur-sm rounded-full border border-tech-blue-800/30 opacity-0 group-hover:opacity-100 transition-opacity duration-200 whitespace-nowrap z-10"
                initial={{ y: -5 }}
                whileHover={{ y: 0 }}
            >
                <span className="text-xs font-medium text-tech-blue-300">{label}</span>
            </motion.div>
        </motion.div>
    )
}
