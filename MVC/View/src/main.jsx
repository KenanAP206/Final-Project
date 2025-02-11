import { BrowserRouter } from 'react-router-dom'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import ShowProvider from './Context/ShowContext.jsx'
createRoot(document.getElementById('root')).render(

  <ShowProvider>
  <BrowserRouter>
    <App />
  </BrowserRouter>
  </ShowProvider>
)
