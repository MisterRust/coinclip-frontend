import { ToastContainer } from 'react-toastify';
import '../styles/globals.css'
import { MeshProvider } from "@meshsdk/react";
// import { GameProvider } from '../context/GameProvider'
import { UserProvider } from '../context/UserProvider'
import { ErrorBoundary } from 'next/dist/client/components/error-boundary';
// import { ModalProvider } from '../context/ModalProvider'
function MyApp({ Component, pageProps }) {
  return (
    <ErrorBoundary>
      <MeshProvider>
        <UserProvider>
          <Component {...pageProps} />
          <ToastContainer />
        </UserProvider>
      </MeshProvider>
    </ErrorBoundary>
  )
}

export default MyApp
