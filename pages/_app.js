import { ToastContainer } from 'react-toastify';
import '../styles/globals.css'
import { MeshProvider } from "@meshsdk/react";
import { WalletConnectProvider } from '../context/WalletConnect'
function MyApp({ Component, pageProps }) {
  return (
    <MeshProvider>
      <WalletConnectProvider>
        <Component {...pageProps} />
        <ToastContainer />
      </WalletConnectProvider>
    </MeshProvider>
  )
}

export default MyApp
