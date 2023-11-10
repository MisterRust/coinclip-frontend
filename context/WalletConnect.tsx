import { createContext, PropsWithChildren, useState, useEffect, useContext } from 'react';
import { Blockfrost, Lucid, WalletApi } from 'lucid-cardano';
import { useLocalStorage } from 'react-use';
import axios from 'axios';
// import { docClient } from './AwsFunctions';
// import { GlobalProvider } from 'App';

interface WalletConnectContextValues {
  api: WalletApi | null;
  lucid: Lucid | null;
  activeWallet: string;
  accumulating: boolean;
  myWalletAddress: string;
  enableWallet: (name: string) => Promise<void> | void;
  disableWalletAddress: () => Promise<void> | void;
  setMyWalletAddress: (newValue: string) => void;
  walletConnected?: boolean;
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
  const [walletConnected, setWalletConnected] = useState<boolean>();

  const [activeWalletName, setActiveWalletName] = useLocalStorage('active-wallet-name', '');

  const disableWalletAddress = () => {
    setMyWalletAddress('');
    setActiveWalletName('');
  };

  const enableWallet = async (name: string) => {
    console.log("name", name)
    const api = await window.cardano[name].enable();
    const newLucid = await Lucid.new(
      new Blockfrost(
        "https://cardano-mainnet.blockfrost.io/api/v0",
        "mainnetDZ9iTGWDSoUluPp6p5uVnwtzB7Vb6ubL"
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
    // const my_wallet_address =
      // 'addr1qxt86j0tk0z2gpzv26x58yyc366zadxxeyw3va5gaw3f9p4z84g3t92l6w5hawvjf9447zqalsuaaaz0u69ty08aa04swagzpt'
    setMyWalletAddress(my_wallet_address);

    const { data } = await axios.get(
      `https://rz5lmdjzaa.execute-api.eu-west-2.amazonaws.com/default/isAddressRegistered?address=${my_wallet_address}`
    );
    setAccumulating(data);
  };
  useEffect(() => {
    const initializeWallet = async () => {
      if (activeWalletName) {
        // @ts-ignore
        const isEnabled = await window.cardano[activeWalletName].isEnabled();

        if (isEnabled) {
          setWalletConnected(true)
          enableWallet(activeWalletName);
        } else {
          setWalletConnected(true)
        }
      }
    };

    initializeWallet();
  }, [activeWalletName]);

  useEffect(() => {
  }, [walletConnected])


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
        setMyWalletAddress,
        walletConnected
      }}
    >
      {children}
    </WalletConnectContext.Provider>
  );
};

export const useWalletConnect = () => useContext(WalletConnectContext);