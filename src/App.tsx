import { useState, createContext, useContext } from 'react'
import { AnimatePresence } from 'framer-motion'
import DeskScene from './components/DeskScene'
import CommandDashboard from './components/CommandDashboard'
import Modal from './components/Modal'
import { AuroraShader } from '@/components/ui/aurora-shader'
import { CustomCursor } from '@/components/ui/custom-cursor'
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

function App() {
  const [activeItem, setActiveItem] = useState<DeskItemType>(null)
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768)

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

  return (
    <AppContext.Provider value={{ activeItem, setActiveItem, isMobile }}>
      <div className="min-h-screen bg-dark-300 dark overflow-hidden">
        {/* Smooth aurora shader background */}
        <div className="fixed inset-0 pointer-events-none">
          <AuroraShader
            colorPrimary="#00d4ff"
            colorSecondary="#8b5cf6"
            colorBackground="#0c1218"
            speed={0.4}
            intensity={1.1}
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

export default App
