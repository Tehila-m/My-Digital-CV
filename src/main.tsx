import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
// import App from './App.tsx'
// import CV from './Pages/CV';
import CV from './Pages/CV';
import './index.css' 

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <CV />
  </StrictMode>,
)
