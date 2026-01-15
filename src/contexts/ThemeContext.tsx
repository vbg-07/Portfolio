import { createContext, useContext, useState, useEffect, type ReactNode } from 'react'

type Theme = 'dark' | 'light'

interface ThemeContextType {
    theme: Theme
    toggleTheme: () => void
    isLight: boolean
}

const ThemeContext = createContext<ThemeContextType>({
    theme: 'dark',
    toggleTheme: () => { },
    isLight: false,
})

export const useTheme = () => useContext(ThemeContext)

interface ThemeProviderProps {
    children: ReactNode
}

export function ThemeProvider({ children }: ThemeProviderProps) {
    const [theme, setTheme] = useState<Theme>('dark')

    // Apply theme class to html element
    useEffect(() => {
        const root = document.documentElement
        root.classList.remove('dark', 'light')
        root.classList.add(theme)
    }, [theme])

    const toggleTheme = () => {
        setTheme(prev => prev === 'dark' ? 'light' : 'dark')
    }

    return (
        <ThemeContext.Provider value={{ theme, toggleTheme, isLight: theme === 'light' }}>
            {children}
        </ThemeContext.Provider>
    )
}
