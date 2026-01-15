import { motion } from 'framer-motion'
import type { Variants } from 'framer-motion'
import { useApp } from '../App'
import DeskItem from './DeskItem'
import Monitor from './Monitor'
import ServerRack from './ServerRack'
import CoffeeCup from './CoffeeCup'
import RotaryPhone from './RotaryPhone'
import Blueprints from './Blueprints'
import TableLamp from './TableLamp'
import { useTheme } from '../contexts/ThemeContext'

export default function DeskScene() {
    const { activeItem } = useApp()
    const { isLight } = useTheme()

    // Variants for the desk zoom effect
    const deskVariants: Variants = {
        initial: { opacity: 1, scale: 1, y: 0 }, // Opacity 1 for instant LCP
        animate: {
            opacity: 1,
            scale: 1,
            y: 0,
            x: 0,
            transition: { duration: 0 } // Instant, no floaty animation
        },
        // Removed specific monitor zoom to keep it light
        monitorOpen: {
            scale: 1, // No zoom
            y: 0,
            x: 0,
            transition: { duration: 0.5 }
        },
        defaultOpen: {
            scale: 1,
            opacity: 0.3,
            transition: { duration: 0.5 }
        }
    }

    // Determine which animation state to use
    const getAnimationState = () => {
        if (!activeItem) return 'animate'
        // We still return a state to handle opacity changes if needed, 
        // but 'monitorOpen' now just keeps scale 1
        if (activeItem === 'monitor') return 'monitorOpen'
        return 'defaultOpen'
    }

    return (
        <div className="relative w-full h-screen flex items-center justify-center overflow-hidden">
            {/* Desk surface */}
            <motion.div
                variants={deskVariants}
                initial="initial"
                animate={getAnimationState()}
                className={`relative w-[90vw] max-w-6xl h-[80vh] max-h-[800px] rounded-3xl shadow-desk blueprint-grid transition-colors duration-500 ${isLight
                    ? 'bg-gradient-to-br from-gray-100 via-gray-200 to-gray-300'
                    : 'bg-desk-wood'
                    }`}
                style={{
                    perspective: '1000px',
                    // Pivot around the monitor (top center) when zooming it, otherwise center
                    transformOrigin: activeItem === 'monitor' ? '50% 20%' : 'center center',
                    willChange: 'transform'
                }}
            >
                {/* Desk edge glow - scaled with desk */}
                <div className="absolute inset-0 rounded-3xl border border-white/10 pointer-events-none" />
                <div className="absolute inset-0 rounded-3xl shadow-inner-glow pointer-events-none" />

                {/* Grid overlay for tech feel */}
                <div className="absolute inset-0 rounded-3xl opacity-30 pointer-events-none"
                    style={{
                        backgroundImage: `
              linear-gradient(rgba(255, 255, 255, 0.03) 1px, transparent 1px),
              linear-gradient(90deg, rgba(255, 255, 255, 0.03) 1px, transparent 1px)
            `,
                        backgroundSize: '40px 40px'
                    }}
                />

                {/* Desk Items - positioned for top-down view */}

                {/* Monitor - Center top using flex wrapper */}
                <div className="absolute top-[8%] left-0 right-0 flex justify-center">
                    <DeskItem
                        id="monitor"
                        className="w-[50%] h-[240px]"
                        label="Data Dashboard"
                    >
                        <Monitor />
                    </DeskItem>
                </div>

                {/* Server Rack - Left side, vertically centered */}
                <DeskItem
                    id="server"
                    className="absolute top-[50%] -translate-y-1/2 left-[3%] w-[18%] h-[40%]"
                    label="AWS Infrastructure"
                >
                    <ServerRack />
                </DeskItem>

                {/* Rotary Phone - Right side, vertically centered */}
                <DeskItem
                    id="phone"
                    className="absolute top-[50%] -translate-y-1/2 right-[3%] w-[18%] h-[35%]"
                    label="Contact"
                >
                    <RotaryPhone />
                </DeskItem>

                {/* Coffee Cup - Bottom left */}
                <DeskItem
                    id="coffee"
                    className="absolute bottom-[5%] left-[25%] w-[15%] h-[28%]"
                    label="About Me"
                >
                    <CoffeeCup />
                </DeskItem>

                {/* Blueprints - Bottom right */}
                <DeskItem
                    id="blueprints"
                    className="absolute bottom-[5%] right-[22%] w-[35%] h-[30%]"
                    label="Technical Docs"
                >
                    <Blueprints />
                </DeskItem>

                {/* Table Lamp - Top right, theme toggle */}
                <div className="absolute top-[12%] right-[3%] w-[12%] h-[25%] cursor-pointer">
                    <TableLamp />
                </div>

                {/* Name - Exact center of desk - cut through effect */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none select-none">
                    <motion.h1
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.5, duration: 0.8, ease: 'easeOut' }}
                        className="text-7xl md:text-8xl lg:text-9xl font-semibold tracking-tight name-gradient pb-4"
                        style={{
                            fontFamily: "'Outfit', sans-serif",
                            lineHeight: 1.2,
                            color: 'transparent',
                            backgroundImage: isLight
                                ? 'linear-gradient(135deg, rgba(33, 37, 41, 0.9) 0%, rgba(73, 80, 87, 0.7) 35%, rgba(108, 117, 125, 0.8) 65%, rgba(33, 37, 41, 0.9) 100%)'
                                : 'linear-gradient(135deg, rgba(255, 255, 255, 0.7) 0%, rgba(173, 181, 189, 0.5) 35%, rgba(108, 117, 125, 0.6) 65%, rgba(255, 255, 255, 0.7) 100%)',
                            backgroundSize: '300% 300%',
                            backgroundClip: 'text',
                            WebkitBackgroundClip: 'text',
                            WebkitTextFillColor: 'transparent',
                            filter: isLight
                                ? 'drop-shadow(0 0 30px rgba(0, 0, 0, 0.2)) drop-shadow(0 0 10px rgba(0, 0, 0, 0.1))'
                                : 'drop-shadow(0 0 30px rgba(255, 255, 255, 0.3)) drop-shadow(0 0 10px rgba(255, 255, 255, 0.1))',
                        }}
                    >
                        Vignesh
                    </motion.h1>
                </div>

                {/* Decorative elements */}
                <div className="absolute top-[50%] left-[50%] w-3 h-3 rounded-full bg-gray-400/60 blur-sm animate-pulse" />
                <div className="absolute top-[60%] left-[40%] w-2 h-2 rounded-full bg-white/40 blur-sm" />
            </motion.div>

            {/* Instructions */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1, duration: 0.5 }}
                className="absolute bottom-8 left-1/2 -translate-x-1/2 text-center"
            >
                <p className="text-gray-500 text-sm font-mono">
                    <span className="text-gray-400">»</span> Click any item to explore <span className="text-gray-400">«</span>
                </p>
            </motion.div>
        </div>
    )
}
