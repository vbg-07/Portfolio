import { motion } from 'framer-motion'
import { useApp } from '../App'
import MonitorContent from './content/MonitorContent'
import ServerContent from './content/ServerContent'
import CoffeeContent from './content/CoffeeContent'
import PhoneContent from './content/PhoneContent'
import BlueprintsContent from './content/BlueprintsContent'

export default function Modal() {
    const { activeItem, setActiveItem } = useApp()

    const getContent = () => {
        switch (activeItem) {
            case 'monitor':
                return <MonitorContent />
            case 'server':
                return <ServerContent />
            case 'coffee':
                return <CoffeeContent />
            case 'phone':
                return <PhoneContent />
            case 'blueprints':
                return <BlueprintsContent />
            default:
                return null
        }
    }

    const getTitle = () => {
        switch (activeItem) {
            case 'monitor':
                return 'Data Stories'
            case 'server':
                return 'AWS Infrastructure'
            case 'coffee':
                return 'About Me'
            case 'phone':
                return 'Get In Touch'
            case 'blueprints':
                return 'Technical Documentation'
            default:
                return ''
        }
    }

    return (
        <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setActiveItem(null)}
        >
            {/* Backdrop - highly transparent with strong blur for depth of field */}
            <motion.div
                className="absolute inset-0 bg-black/20 backdrop-blur-md"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
            />

            {/* Modal content */}
            <motion.div
                className="relative w-full max-w-4xl max-h-[90vh] overflow-y-auto glass-card p-8"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2 }}
                onClick={(e) => e.stopPropagation()}
            >
                {/* Close button */}
                <button
                    onClick={() => setActiveItem(null)}
                    className="absolute top-4 right-4 w-10 h-10 rounded-full bg-dark-200 border border-tech-blue-800/30 flex items-center justify-center text-gray-400 hover:text-tech-blue-400 hover:border-tech-blue-600/50 transition-colors"
                >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                    </svg>
                </button>

                {/* Header */}
                <div className="mb-6">
                    <h2 className="text-3xl font-bold text-gradient-blue">{getTitle()}</h2>
                    <div className="mt-2 w-20 h-1 bg-gradient-to-r from-tech-blue-500 to-accent-purple rounded-full" />
                </div>

                {/* Dynamic content */}
                {getContent()}
            </motion.div>
        </motion.div>
    )
}
