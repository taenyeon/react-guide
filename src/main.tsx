import React, { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.scss'
import '@assets/scss/content.scss'
import '@assets/scss/global.scss'
import App from './App'

const enableMocking = async () => {
  if (!import.meta.env.DEV) return
  const { worker } = await import('../mock/browser')
  return worker.start()
}

enableMocking().then(() => {
  createRoot(document.getElementById('root')!).render(
    <StrictMode>
      <App />
    </StrictMode>,
  )
})
