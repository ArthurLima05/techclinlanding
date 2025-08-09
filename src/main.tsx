import React from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'

console.log('[Debug] React object:', React)
console.log('[Debug] React version:', (React as any)?.version)

const rootEl = document.getElementById('root')
if (!rootEl) {
  console.error('[Debug] Root element not found')
}

createRoot(rootEl!).render(<App />);

