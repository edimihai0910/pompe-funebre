import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
// Fonturi gazduite local (fara cereri catre Google Fonts)
import '@fontsource/marcellus/400.css'
import '@fontsource/karla/300.css'
import '@fontsource/karla/400.css'
import '@fontsource/karla/500.css'
import './index.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)
