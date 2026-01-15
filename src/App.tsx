import { useState, createContext, useContext } from 'react'
import { AnimatePresence } from 'framer-motion'
import DeskScene from './components/DeskScene'
import CommandDashboard from './components/CommandDashboard'
import Modal from './components/Modal'
import { AuroraShader } from '@/components/ui/aurora-shader'
import { CustomCursor } from '@/components/ui/custom-cursor'
import { ThemeProvider, useTheme } from './contexts/ThemeContext'
import './index.css'

// Types
export type DeskItemType = 'monitor' | 'server' | 'coffee' | 'phone' | 'blueprints' | null

interface AppContextType {
  activeItem: DeskItemType
  setActiveItem: (item: DeskItemType) => void
  isMobile: boolean
}

export const AppContext = createContext<AppContextType>({
  activeItem: null,
  setActiveItem: () => { },
  isMobile: false
})

export const useApp = () => useContext(AppContext)

function AppContent() {
  const [activeItem, setActiveItem] = useState<DeskItemType>(null)
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768)
  const { isLight } = useTheme()

  // Handle resize with debounce
  useState(() => {
    let timeoutId: number
    const handleResize = () => {
      clearTimeout(timeoutId)
      timeoutId = window.setTimeout(() => {
        setIsMobile(window.innerWidth < 768)
      }, 150)
    }
    window.addEventListener('resize', handleResize)
    return () => {
      window.removeEventListener('resize', handleResize)
      clearTimeout(timeoutId)
    }
  })

  // Theme-aware colors for aurora shader (opposite colors)
  const auroraColors = isLight
    ? { primary: '#212529', secondary: '#343a40', background: '#f8f9fa' }  // Very dark aurora on white bg
    : { primary: '#e9ecef', secondary: '#adb5bd', background: '#050505' }  // Light on dark

  // Much higher intensity for light mode to make aurora clearly visible
  const auroraIntensity = isLight ? 3.5 : 1.1

  return (
    <AppContext.Provider value={{ activeItem, setActiveItem, isMobile }}>
      <div className={`min-h-screen overflow-hidden transition-colors duration-500 ${isLight ? 'bg-light-300' : 'bg-dark-300'
        }`}>
        {/* Smooth aurora shader background */}
        <div className="fixed inset-0 pointer-events-none">
          <AuroraShader
            colorPrimary={auroraColors.primary}
            colorSecondary={auroraColors.secondary}
            colorBackground={auroraColors.background}
            speed={0.4}
            intensity={auroraIntensity}
          />
        </div>

        {/* Custom cursor - desktop only */}
        {!isMobile && <CustomCursor />}

        {/* Main Content */}
        {isMobile ? <CommandDashboard /> : <DeskScene />}

        {/* Modal for expanded content */}
        <AnimatePresence>
          {activeItem && <Modal />}
        </AnimatePresence>
      </div>
    </AppContext.Provider>
  )
}

function App() {
  return (
    <ThemeProvider>
      <AppContent />
    </ThemeProvider>
  )
}

export default App
