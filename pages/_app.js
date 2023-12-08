import { ToastContainer } from 'react-toastify';
import '../styles/globals.css'
import { MeshProvider } from "@meshsdk/react";
// import { GameProvider } from '../context/GameProvider'
import { UserProvider } from '../context/UserProvider'
import CustomErrorBoundary from '../components/CustomErrorBoundary'
import { WalletConnectProvider } from '../context/WalletConnect';
// import { ModalProvider } from '../context/ModalProvider'
function MyApp({ Component, pageProps }) {
  return (
    // <CustomErrorBoundary>
    <WalletConnectProvider>
      <MeshProvider>
        <UserProvider>
          <Component {...pageProps} />
          <ToastContainer />
        </UserProvider>
      </MeshProvider>
    </WalletConnectProvider>
    // </CustomErrorBoundary>
  )
}

export default MyApp
