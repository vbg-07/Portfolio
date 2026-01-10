import { motion } from 'framer-motion'

export default function Blueprints() {
    return (
        <div className="relative w-full h-full flex items-center justify-center">
            {/* Folded blueprint papers */}
            <div className="relative w-[90%] h-[80%]">
                {/* Bottom paper (slightly offset) */}
                <motion.div
                    className="absolute inset-0 bg-gradient-to-br from-blue-950 to-blue-900 rounded-sm shadow-lg transform rotate-2"
                    style={{ transformOrigin: 'center' }}
                />

                {/* Main blueprint */}
                <motion.div
                    className="absolute inset-0 bg-gradient-to-br from-sky-950 to-blue-950 rounded-sm shadow-lg border border-sky-800/30"
                    whileHover={{ rotate: -1 }}
                >
                    {/* Blueprint grid */}
                    <div className="absolute inset-0 opacity-20"
                        style={{
                            backgroundImage: `
                linear-gradient(rgba(56, 189, 248, 0.3) 1px, transparent 1px),
                linear-gradient(90deg, rgba(56, 189, 248, 0.3) 1px, transparent 1px)
              `,
                            backgroundSize: '10px 10px'
                        }}
                    />

                    {/* Content preview */}
                    <div className="absolute inset-3 flex flex-col gap-2">
                        {/* Title bar */}
                        <div className="flex items-center gap-2">
                            <div className="w-4 h-4 border border-sky-400/50 rounded-sm flex items-center justify-center">
                                <div className="w-2 h-2 bg-sky-400/30 rounded-sm" />
                            </div>
                            <div className="h-2 flex-1 bg-sky-400/20 rounded-full" />
                        </div>

                        {/* Code lines */}
                        <div className="flex-1 flex flex-col gap-1 mt-1">
                            <div className="flex gap-1">
                                <div className="w-1 h-1.5 bg-accent-purple/60" />
                                <div className="h-1.5 w-[40%] bg-sky-400/20 rounded-sm" />
                            </div>
                            <div className="flex gap-1 ml-2">
                                <div className="w-1 h-1.5 bg-accent-green/60" />
                                <div className="h-1.5 w-[60%] bg-sky-400/15 rounded-sm" />
                            </div>
                            <div className="flex gap-1 ml-2">
                                <div className="w-1 h-1.5 bg-tech-blue-400/60" />
                                <div className="h-1.5 w-[50%] bg-sky-400/15 rounded-sm" />
                            </div>
                            <div className="flex gap-1 ml-2">
                                <div className="w-1 h-1.5 bg-accent-amber/60" />
                                <div className="h-1.5 w-[35%] bg-sky-400/15 rounded-sm" />
                            </div>
                        </div>

                        {/* Diagram hint */}
                        <div className="h-[40%] border border-sky-400/20 rounded-sm p-1">
                            <div className="w-full h-full flex items-center justify-center gap-2">
                                <div className="w-4 h-4 border border-sky-400/30 rounded" />
                                <div className="w-6 h-[1px] bg-sky-400/30" />
                                <div className="w-3 h-3 border border-accent-green/30 rounded-full" />
                                <div className="w-6 h-[1px] bg-sky-400/30" />
                                <div className="w-4 h-4 border border-accent-purple/30 rounded" />
                            </div>
                        </div>
                    </div>

                    {/* Fold lines */}
                    <div className="absolute top-1/3 left-0 right-0 h-[1px] bg-sky-900/50" />
                    <div className="absolute top-2/3 left-0 right-0 h-[1px] bg-sky-900/50" />

                    {/* Corner fold */}
                    <div className="absolute bottom-0 right-0 w-6 h-6 overflow-hidden">
                        <div className="absolute bottom-0 right-0 w-8 h-8 bg-gradient-to-tl from-sky-900 to-sky-950 transform rotate-45 translate-x-4 translate-y-4 shadow-inner" />
                    </div>
                </motion.div>
            </div>
        </div>
    )
}
