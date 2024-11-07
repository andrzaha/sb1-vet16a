import { ReactNode } from 'react'

interface SettingsProviderProps {
  children: ReactNode
}

export function SettingsProvider({ children }: SettingsProviderProps) {
  // Your settings context logic here...

  return <>{children}</> // Make sure to return the children
} 