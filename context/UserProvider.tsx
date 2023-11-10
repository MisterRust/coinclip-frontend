import React, { ReactNode, createContext, useContext, useEffect, useState } from "react";
import { BalanceType } from "../utils/types";
import axios from "axios";
import { useAddress, useWallet } from "@meshsdk/react";

// Define the shape of the context
export interface UserContextProps {
  setAddress: Function;
  walletBalance: BalanceType;
  setWalletBalance: Function;
  address: string;
  setUserWallet: Function;
  userwallet: any;
  isConnected: boolean;
  setIsConnected: Function;
}

// Create the User context
export const UserContext = createContext<UserContextProps | null>(null);

// Create the User context provider component
export const UserProvider = ({ children }: { children: ReactNode }) => {
  const [walletBalance, setWalletBalance] = useState({

  });
  const [address, setAddress] = useState("");
  const [userwallet, setUserWallet] = useState("");
  const [isConnected, setIsConnected] = useState(false);
  const { connect, disconnect, connecting, wallet, connected } = useWallet();
  const walletAddress = useAddress();
  console.log("hey connected", connected)


  const getMyBalance = async () => {
    const { data } = await axios.get(
        `https://qzkubt0k1g.execute-api.eu-west-2.amazonaws.com/default/getWalletInfo?address=${walletAddress}`
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

    obj['ada'] = parseInt(data[data.length - 1].lovelace);
    // obj['loading'] = false;
    obj['usd'] = (parseInt(data[data.length - 1].lovelace) / 1000000 * parseFloat(exchangeRate)).toFixed(0).toString()
walletAddress
    console.log("pay obj", obj)
    // @ts-ignore
    setWalletBalance(obj)
}
  useEffect(() =>{
    console.log("What?")
    if(walletAddress && walletAddress !== ""){
      console.log("hey good", walletAddress)
      getMyBalance()
    }
  }, [walletAddress])

  return (
    <UserContext.Provider
      value={{
        setAddress,
        walletBalance,
        setWalletBalance,
        address,
        userwallet,
        setUserWallet,
        isConnected,
        setIsConnected
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export const useUserProvider = () => useContext(UserContext);