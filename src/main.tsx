import { createRoot } from 'react-dom/client'
import './index.css'
import App from './app/App.tsx'
import { registerSW } from "virtual:pwa-register"

registerSW({ immediate : true})

createRoot(document.getElementById('root')!).render(
    <App />
)
