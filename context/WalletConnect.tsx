import { createContext, PropsWithChildren, useState, useEffect, useContext } from 'react';
import { Blockfrost, Lucid, WalletApi } from 'lucid-cardano';
import { useLocalStorage } from 'react-use';
import axios from 'axios';
import { infoAlert } from '../components/alerts';
// import { BASE_URL } from 'constants/document';

interface WalletConnectContextValues {
  api: WalletApi | null;
  lucid: Lucid | null;
  activeWallet: string;
  accumulating: boolean;
  myWalletAddress: string;
  enableWallet: (name: string) => Promise<void> | void;
  disableWalletAddress: () => Promise<void> | void;
  setMyWalletAddress: (newValue: string) => void;
}

export const WalletConnectContext = createContext<WalletConnectContextValues>({
  api: null,
  lucid: null,
  activeWallet: '',
  enableWallet: () => { },
  myWalletAddress: '',
  accumulating: false,
  disableWalletAddress: () => { },
  setMyWalletAddress: () => { },
});

export const WalletConnectProvider = ({ children }: PropsWithChildren) => {
  const [api, setApi] = useState<WalletApi | null>(null);
  const [lucid, setLucid] = useState<Lucid | null>(null);
  const [accumulating, setAccumulating] = useState(false);
  const [myWalletAddress, setMyWalletAddress] = useState<string>();

  const [activeWalletName, setActiveWalletName] = useLocalStorage('active-wallet-name', '');

  const disableWalletAddress = () => {
    setMyWalletAddress('');
    setActiveWalletName('');
  };

  const enableWallet = async (name: string) => {
    const api = await window.cardano[name].enable();
    try {
    //   const response = await axios.get("https://crashr.up.railway.app/secure/blockfrost")
    //   console.log("api response", response)
    //   if (!response) {
    //     infoAlert("You are not authorized!!!")
    //     return;
    //   }

      const newLucid = await Lucid.new(
        new Blockfrost(
          "https://cardano-mainnet.blockfrost.io/api/v0",
        //   response.data.key
        "mainnetGY4Dy2Odu9EN6N7cQTq8z2EoW9BqdRlH"
        ),
        "Mainnet"
      );
      // @ts-ignore
      newLucid.selectWallet(api);
      // @ts-ignore
      setApi(api);
      setActiveWalletName(name);
      setLucid(newLucid);

      const my_wallet_address = await newLucid.wallet.address();
      // console.log("my_wallet_address", my_wallet_address)
      // const my_wallet_address = "addr1q9wqhvxvmzn28ffvnlw6xjpkgqh5kzwyulypkarjc7655puaw2m0ym737phxzhchxwvgs2xrx386v345nuq3q9f0cw9slzuu2a"

      setMyWalletAddress(my_wallet_address);

    } catch (error) {
      infoAlert("You are not authorized!!!")
    }
  };
  useEffect(() => {
    const initializeWallet = async () => {
      if (activeWalletName) {
        // @ts-ignore
        const isEnabled = await window.cardano[activeWalletName].isEnabled();

        if (isEnabled) {
          enableWallet(activeWalletName);
        }
      }
    };

    initializeWallet();
  }, [activeWalletName]);


  useEffect(() => {
    console.log("myWalletAddress", myWalletAddress)
  }, [myWalletAddress])

  return (
    <WalletConnectContext.Provider
      value={{
        api,
        lucid,
        activeWallet: activeWalletName ?? '',
        enableWallet,
        accumulating,
        myWalletAddress,
        disableWalletAddress,
        setMyWalletAddress
      }}
    >
      {children}
    </WalletConnectContext.Provider>
  );
};

export const useWalletConnect = () => useContext(WalletConnectContext);