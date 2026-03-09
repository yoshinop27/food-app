import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { PriceProvider, TypeProvider, DistanceProvider, SubmitProvider } from './contexts/contexts'
import './index.css'
import App from './App.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <PriceProvider>
      <TypeProvider>
        <DistanceProvider>
          <SubmitProvider>
            <App />
          </SubmitProvider>
        </DistanceProvider>
      </TypeProvider>
    </PriceProvider>
  </StrictMode>,
)
