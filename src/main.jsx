import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'

// Synchronously enforce Homepage (/) on initial browser session launch before React mounts
if (typeof window !== 'undefined') {
  const hasVisited = sessionStorage.getItem("examvault_session_started");
  if (!hasVisited) {
    sessionStorage.setItem("examvault_session_started", "true");
    if (window.location.pathname !== "/" && !window.location.pathname.startsWith("/admin")) {
      window.history.replaceState(null, "", "/");
    }
  }
}

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
