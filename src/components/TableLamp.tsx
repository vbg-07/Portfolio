import { motion } from 'framer-motion'
import { useTheme } from '../contexts/ThemeContext'

export default function TableLamp() {
    const { isLight, toggleTheme } = useTheme()

    return (
        <div
            className="relative w-full h-full flex items-center justify-center cursor-pointer"
            onClick={toggleTheme}
        >
            {/* Lamp glow effect when on */}
            {isLight && (
                <motion.div
                    className="absolute inset-0 bg-yellow-300/20 blur-2xl rounded-full"
                    initial={{ opacity: 0, scale: 0.5 }}
                    animate={{ opacity: 1, scale: 1.5 }}
                    transition={{ duration: 0.4 }}
                />
            )}

            {/* Articulated desk lamp design */}
            <div className="relative w-full h-full">
                {/* Lamp head/shade - adjustable style */}
                <motion.div
                    className="absolute top-[5%] left-[20%] w-[60%] h-[35%]"
                    animate={{
                        filter: isLight
                            ? 'drop-shadow(0 0 25px rgba(255, 220, 100, 0.9))'
                            : 'drop-shadow(0 0 8px rgba(255, 255, 255, 0.15))',
                        rotate: isLight ? -5 : 0,
                    }}
                    transition={{ duration: 0.3 }}
                >
                    {/* Outer shade - cone shape */}
                    <div
                        className={`absolute inset-0 transition-colors duration-300 ${isLight
                                ? 'bg-gradient-to-b from-amber-200 to-amber-400'
                                : 'bg-gradient-to-b from-gray-600 to-gray-700'
                            }`}
                        style={{
                            clipPath: 'polygon(20% 0%, 80% 0%, 100% 100%, 0% 100%)',
                            borderRadius: '0 0 4px 4px',
                        }}
                    >
                        {/* Inner glow */}
                        {isLight && (
                            <motion.div
                                className="absolute bottom-0 left-[10%] right-[10%] h-[60%] bg-gradient-to-t from-yellow-100 to-transparent rounded-b"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 0.8 }}
                            />
                        )}
                    </div>

                    {/* Light bulb hint */}
                    <div
                        className={`absolute bottom-[-10%] left-1/2 -translate-x-1/2 w-[25%] aspect-square rounded-full transition-colors duration-300 ${isLight ? 'bg-yellow-200 shadow-lg shadow-yellow-300/50' : 'bg-gray-500'
                            }`}
                    />
                </motion.div>

                {/* Lamp arm - angled */}
                <div
                    className={`absolute top-[35%] left-[45%] w-[10%] h-[35%] transition-colors duration-300 ${isLight ? 'bg-amber-700' : 'bg-gray-600'
                        }`}
                    style={{
                        transform: 'rotate(-15deg)',
                        transformOrigin: 'bottom center',
                    }}
                />

                {/* Joint/hinge */}
                <div
                    className={`absolute top-[62%] left-[40%] w-[20%] aspect-square rounded-full transition-colors duration-300 ${isLight ? 'bg-amber-800' : 'bg-gray-700'
                        }`}
                />

                {/* Lower arm */}
                <div
                    className={`absolute top-[68%] left-[47%] w-[8%] h-[20%] transition-colors duration-300 ${isLight ? 'bg-amber-700' : 'bg-gray-600'
                        }`}
                />

                {/* Base */}
                <div
                    className={`absolute bottom-[5%] left-[20%] w-[60%] h-[12%] rounded-lg transition-colors duration-300 ${isLight
                            ? 'bg-gradient-to-t from-amber-900 to-amber-700'
                            : 'bg-gradient-to-t from-gray-800 to-gray-700'
                        }`}
                />

                {/* Power indicator LED */}
                <motion.div
                    className={`absolute bottom-[10%] left-[28%] w-[6%] aspect-square rounded-full ${isLight ? 'bg-green-400' : 'bg-gray-500'
                        }`}
                    animate={{
                        boxShadow: isLight
                            ? ['0 0 4px rgba(74, 222, 128, 0.8)', '0 0 8px rgba(74, 222, 128, 1)', '0 0 4px rgba(74, 222, 128, 0.8)']
                            : 'none',
                    }}
                    transition={{ duration: 1, repeat: Infinity }}
                />
            </div>

            {/* Tooltip */}
            <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 whitespace-nowrap">
                <span className={`text-[7px] font-mono transition-colors duration-300 ${isLight ? 'text-gray-600' : 'text-gray-500'
                    }`}>
                    {isLight ? 'ON' : 'OFF'}
                </span>
            </div>
        </div>
    )
}
