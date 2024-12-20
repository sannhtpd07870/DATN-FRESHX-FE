import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import { UserProvider } from './services/UserContext'
import { GoogleOAuthProvider } from "@react-oauth/google";
createRoot(document.getElementById('root')).render(
  <GoogleOAuthProvider clientId='893359885097-3s47l85fi2okl2tukqko3slc9j9tbtuf.apps.googleusercontent.com'>
  <StrictMode>
    <UserProvider>
      <App />
    </UserProvider>
  </StrictMode>
  </GoogleOAuthProvider>,
)
