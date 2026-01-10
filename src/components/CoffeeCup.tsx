import { motion } from 'framer-motion'

export default function CoffeeCup() {
    return (
        <div className="relative w-full h-full flex items-center justify-center">
            {/* Steam particles */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-8">
                {[...Array(3)].map((_, i) => (
                    <motion.div
                        key={i}
                        className="absolute w-2 h-2 bg-white/10 rounded-full blur-sm"
                        style={{ left: `${30 + i * 20}%` }}
                        animate={{
                            y: [0, -15, -30],
                            opacity: [0.4, 0.2, 0],
                            scale: [1, 1.2, 1.4],
                        }}
                        transition={{
                            duration: 2,
                            repeat: Infinity,
                            delay: i * 0.3,
                            ease: 'easeOut',
                        }}
                    />
                ))}
            </div>

            {/* Cup body */}
            <div className="relative w-[70%] h-[65%] mt-4">
                {/* Cup */}
                <div className="absolute inset-0 bg-gradient-to-b from-stone-700 to-stone-800 rounded-b-3xl rounded-t-lg shadow-lg overflow-hidden">
                    {/* Coffee surface */}
                    <div className="absolute top-2 left-2 right-2 h-4 bg-gradient-to-br from-amber-900 to-amber-950 rounded-full">
                        <div className="absolute top-1 left-1/4 w-1/2 h-1 bg-amber-800/50 rounded-full blur-sm" />
                    </div>

                    {/* Cup texture */}
                    <div className="absolute bottom-0 left-0 right-0 h-2/3 opacity-10"
                        style={{
                            background: 'repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(255,255,255,0.1) 2px, rgba(255,255,255,0.1) 4px)'
                        }}
                    />
                </div>

                {/* Handle */}
                <div className="absolute right-[-15%] top-[20%] w-[20%] h-[50%]">
                    <div className="w-full h-full border-4 border-stone-700 rounded-full border-l-0" />
                </div>

                {/* Cup rim */}
                <div className="absolute -top-1 left-0 right-0 h-2 bg-stone-600 rounded-t-lg" />
            </div>

            {/* Saucer */}
            <div className="absolute bottom-[5%] left-1/2 -translate-x-1/2 w-[90%] h-[15%] bg-gradient-to-b from-stone-600 to-stone-700 rounded-full shadow-md">
                <div className="absolute inset-1 bg-stone-700 rounded-full" />
            </div>

            {/* Subtle glow */}
            <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[80%] h-4 bg-amber-600/10 blur-xl rounded-full" />
        </div>
    )
}
