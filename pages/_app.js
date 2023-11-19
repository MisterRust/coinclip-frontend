import { ToastContainer } from 'react-toastify';
import '../styles/globals.css'
import { MeshProvider } from "@meshsdk/react";
import { GameProvider } from '../context/GameProvider'
import { UserProvider } from '../context/UserProvider'
import { ModalProvider } from '../context/ModalProvider'
function MyApp({ Component, pageProps }) {
  return (
    <MeshProvider>
      <UserProvider>
          <Component {...pageProps} />
          <ToastContainer />
      </UserProvider>
    </MeshProvider>
  )
}

export default MyApp
