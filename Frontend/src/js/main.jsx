import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import Home from './page/home.jsx'
import '../css/reset.css'
import '../css/home.css'


createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Home />
  </StrictMode>,
)
