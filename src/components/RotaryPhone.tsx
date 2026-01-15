import { motion } from 'framer-motion'

export default function RotaryPhone() {
    return (
        <div className="relative w-full h-full flex items-center justify-center">
            {/* Phone body */}
            <div className="relative w-[85%] h-[85%] bg-gradient-to-b from-slate-800 to-slate-900 rounded-2xl shadow-lg border border-slate-700/50">
                {/* Rotary dial */}
                <div className="absolute top-[15%] left-1/2 -translate-x-1/2 w-[65%] aspect-square">
                    {/* Outer ring */}
                    <div className="absolute inset-0 bg-gradient-to-br from-slate-700 to-slate-800 rounded-full border-2 border-slate-600/50 shadow-inner">
                        {/* Number holes */}
                        {[...Array(10)].map((_, i) => {
                            const angle = (i * 36 - 90) * (Math.PI / 180)
                            const radius = 38
                            return (
                                <div
                                    key={i}
                                    className="absolute w-[18%] aspect-square bg-dark-400 rounded-full border border-slate-600/30"
                                    style={{
                                        left: `${50 + radius * Math.cos(angle)}%`,
                                        top: `${50 + radius * Math.sin(angle)}%`,
                                        transform: 'translate(-50%, -50%)',
                                    }}
                                >
                                    <span className="absolute inset-0 flex items-center justify-center text-[6px] font-mono text-slate-500">
                                        {i === 0 ? '0' : i}
                                    </span>
                                </div>
                            )
                        })}

                        {/* Center */}
                        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[30%] aspect-square bg-slate-900 rounded-full border border-slate-700" />
                    </div>
                </div>

                {/* Handset cradle */}
                <div className="absolute bottom-[10%] left-1/2 -translate-x-1/2 w-[80%] h-[18%]">
                    <div className="relative w-full h-full">
                        {/* Cradle */}
                        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[60%] h-[40%] bg-gradient-to-t from-slate-700 to-slate-600 rounded-t-full" />

                        {/* Handset */}
                        <motion.div
                            className="absolute bottom-[20%] left-1/2 -translate-x-1/2 w-[90%] h-[80%] bg-gradient-to-b from-slate-700 to-slate-800 rounded-full shadow-md"
                            animate={{ y: [0, -2, 0] }}
                            transition={{ duration: 3, repeat: Infinity }}
                        >
                            {/* Earpiece */}
                            <div className="absolute left-0 top-1/2 -translate-y-1/2 w-[25%] aspect-square bg-slate-900 rounded-full border border-slate-600" />
                            {/* Mouthpiece */}
                            <div className="absolute right-0 top-1/2 -translate-y-1/2 w-[25%] aspect-square bg-slate-900 rounded-full border border-slate-600">
                                <div className="absolute inset-[20%] grid grid-cols-2 gap-0.5">
                                    {[...Array(4)].map((_, i) => (
                                        <div key={i} className="bg-slate-700 rounded-full" />
                                    ))}
                                </div>
                            </div>
                        </motion.div>
                    </div>
                </div>

                {/* Decorative cord hint */}
                <div className="absolute bottom-0 right-[10%] w-2 h-4 bg-gradient-to-b from-slate-700 to-transparent rounded-b-full" />

                {/* Subtle ring indicator */}
                <motion.div
                    className="absolute top-2 right-2 w-2 h-2 rounded-full bg-gray-400"
                    animate={{ opacity: [0.3, 1, 0.3] }}
                    transition={{ duration: 1.5, repeat: Infinity }}
                />
            </div>
        </div>
    )
}
