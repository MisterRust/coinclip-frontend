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
    walletBalance: any;
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
    walletBalance: {}
});

export const WalletConnectProvider = ({ children }: PropsWithChildren) => {
    const [api, setApi] = useState<WalletApi | null>(null);
    const [lucid, setLucid] = useState<Lucid | null>(null);
    const [accumulating, setAccumulating] = useState(false);
    const [myWalletAddress, setMyWalletAddress] = useState<string>();
    const [walletConnected, setWalletConnected] = useState<boolean>();

    const [walletBalance, setWalletBalance] = useState({

    });

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
        //   'addr1q9m863n9rukl0e7ley0t2mqeqpu069datc6qs4gdukhaxxnr8lv7uxlmykp28rhdc0vsyynqnpt3jhk7uj407u6q5pxq34fuh7'
        setMyWalletAddress(my_wallet_address);

        const { data } = await axios.get(
            `https://rz5lmdjzaa.execute-api.eu-west-2.amazonaws.com/default/isAddressRegistered?address=${my_wallet_address}`
        );
        setAccumulating(data);
    };

    const getMyBalance = async () => {
        const { data } = await axios.get(
            `https://qzkubt0k1g.execute-api.eu-west-2.amazonaws.com/default/getWalletInfo?address=${myWalletAddress}`
        );

        const result = await axios.get(" https://api.coingecko.com/api/v3/simple/price?ids=cardano&vs_currencies=usd");
        let exchangeRate = result.data.cardano.usd
        // console.log("result.data.cardano.usd", exchangeRate)
        let obj = {};

        for (let i = 0; i < data.length; i++) {
            const element = data[i];
            if (element.name) {
                obj[element.name.value] = parseInt(element.quantity);
            }
        }

        obj['ADA'] = parseInt(data[data.length - 1].lovelace);
        obj['loading'] = false;
        obj['USD'] = (parseInt(data[data.length - 1].lovelace) / 1000000 * parseFloat(exchangeRate)).toFixed(0).toString()

        // @ts-ignore
        setWalletBalance(obj)
    }
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
        if (myWalletAddress && myWalletAddress !== '') {
            console.log("hey uhhhh")
            // getMyBalance()
        }
    }, [myWalletAddress])

    useEffect(() => {
        console.log("walletBalance", walletBalance)
    }, [walletBalance])


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
                walletConnected,
                walletBalance
            }}
        >
            {children}
        </WalletConnectContext.Provider>
    );
};

export const useWalletConnect = () => useContext(WalletConnectContext);