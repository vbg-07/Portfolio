import { motion } from 'framer-motion'
import { useTheme } from '../contexts/ThemeContext'

export default function Blueprints() {
    const { isLight } = useTheme()

    return (
        <div className="relative w-full h-full flex items-center justify-center">
            {/* Folded blueprint papers */}
            <div className="relative w-[90%] h-[80%]">
                {/* Bottom paper (slightly offset) */}
                <motion.div
                    className={`absolute inset-0 rounded-sm shadow-lg transform rotate-2 transition-colors duration-300 ${isLight ? 'bg-gradient-to-br from-gray-400 to-gray-500 border-gray-500' : 'bg-gradient-to-br from-gray-900 to-black'
                        }`}
                    style={{ transformOrigin: 'center' }}
                />

                {/* Main blueprint */}
                <motion.div
                    className={`absolute inset-0 rounded-sm shadow-lg border transition-colors duration-300 ${isLight ? 'bg-gradient-to-br from-gray-400 to-gray-500 border-gray-500' : 'bg-gradient-to-br from-gray-800 to-gray-900 border-white/10'
                        }`}
                    whileHover={{ rotate: -1 }}
                >
                    {/* Blueprint grid */}
                    <div className="absolute inset-0 opacity-10"
                        style={{
                            backgroundImage: `
                linear-gradient(rgba(255, 255, 255, 0.3) 1px, transparent 1px),
                linear-gradient(90deg, rgba(255, 255, 255, 0.3) 1px, transparent 1px)
              `,
                            backgroundSize: '10px 10px'
                        }}
                    />

                    {/* Content preview */}
                    <div className="absolute inset-3 flex flex-col gap-2">
                        {/* Title bar */}
                        <div className="flex items-center gap-2">
                            <div className="w-4 h-4 border border-white/20 rounded-sm flex items-center justify-center">
                                <div className="w-2 h-2 bg-white/20 rounded-sm" />
                            </div>
                            <div className="h-2 flex-1 bg-white/10 rounded-full" />
                        </div>

                        {/* Code lines */}
                        <div className="flex-1 flex flex-col gap-1 mt-1">
                            <div className="flex gap-1">
                                <div className="w-1 h-1.5 bg-gray-400/60" />
                                <div className="h-1.5 w-[40%] bg-white/10 rounded-sm" />
                            </div>
                            <div className="flex gap-1 ml-2">
                                <div className="w-1 h-1.5 bg-gray-500/60" />
                                <div className="h-1.5 w-[60%] bg-white/5 rounded-sm" />
                            </div>
                            <div className="flex gap-1 ml-2">
                                <div className="w-1 h-1.5 bg-gray-300/60" />
                                <div className="h-1.5 w-[50%] bg-white/5 rounded-sm" />
                            </div>
                            <div className="flex gap-1 ml-2">
                                <div className="w-1 h-1.5 bg-gray-600/60" />
                                <div className="h-1.5 w-[35%] bg-white/5 rounded-sm" />
                            </div>
                        </div>

                        {/* Diagram hint */}
                        <div className="h-[40%] border border-white/10 rounded-sm p-1">
                            <div className="w-full h-full flex items-center justify-center gap-2">
                                <div className="w-4 h-4 border border-white/20 rounded" />
                                <div className="w-6 h-[1px] bg-white/20" />
                                <div className="w-3 h-3 border border-gray-400/30 rounded-full" />
                                <div className="w-6 h-[1px] bg-white/20" />
                                <div className="w-4 h-4 border border-gray-500/30 rounded" />
                            </div>
                        </div>
                    </div>

                    {/* Fold lines */}
                    <div className="absolute top-1/3 left-0 right-0 h-[1px] bg-white/5" />
                    <div className="absolute top-2/3 left-0 right-0 h-[1px] bg-white/5" />

                    {/* Corner fold */}
                    <div className="absolute bottom-0 right-0 w-6 h-6 overflow-hidden">
                        <div className="absolute bottom-0 right-0 w-8 h-8 bg-gradient-to-tl from-gray-800 to-gray-900 transform rotate-45 translate-x-4 translate-y-4 shadow-inner" />
                    </div>
                </motion.div>
            </div>
        </div>
    )
}
