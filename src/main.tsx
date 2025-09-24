import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { Weather } from './Weather'
import { CPULoad } from './CPULoad'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <h1>Ataccama FE Meetup</h1>
    <h2>Current Weather</h2>
    <Weather />
    <CPULoad />
  </StrictMode>,
)
