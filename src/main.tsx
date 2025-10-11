import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import '../../weather-app/node_modules/@fortawesome/fontawesome-free/css/all.min.css'

import App from './App.tsx'
import { register } from './serviceWorker.ts'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
register();