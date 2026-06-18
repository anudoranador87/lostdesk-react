import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App'
import { BrowserRouter } from 'react-router-dom'
import { RoleProvider } from './context/RoleContext'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <RoleProvider>
         <App />
       </RoleProvider>
     </BrowserRouter>
  </StrictMode>,
)
