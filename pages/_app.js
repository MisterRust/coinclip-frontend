import { ToastContainer } from 'react-toastify';
import '../styles/globals.css'
import { MeshProvider } from "@meshsdk/react";
import { WalletConnectProvider } from '../context/WalletConnect'
import {GameProvider} from '../context/GameProvider'
import {UserProvider} from '../context/UserProvider'
import {ModalProvider} from '../context/ModalProvider'
function MyApp({ Component, pageProps }) {
  return (
    <MeshProvider>
      <WalletConnectProvider>
          <UserProvider>
            <ModalProvider>
              <Component {...pageProps} />
              <ToastContainer />
            </ModalProvider>
          </UserProvider>
      </WalletConnectProvider>
    </MeshProvider>
  )
}

export default MyApp
