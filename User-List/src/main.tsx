import { StrictMode } from 'react' // galtiya detect kerta h waring deta h 
import { createRoot } from 'react-dom/client'
// import './index.css'
import App from './App.tsx' // ye hamara mean root component h yahi dhekhga pure browers mai with ui 

createRoot(document.getElementById('root')!).render(// isme index.html file load hoti h  
  <StrictMode>
    <App />
  </StrictMode>,
)

// root joh h react ka entry point h div ke ander app h 
// or joh app h render kerta h or strick mode mai waring deta h 
