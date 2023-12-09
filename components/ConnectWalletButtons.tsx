"use client"
import { useState, useEffect, useContext } from "react";
import { useWallet, useWalletList, useAddress } from "@meshsdk/react";
import Image from "next/image";
import { DownArrow } from "./SvgIcons";

import { GameContext } from "../context/GameProvider";
import { UserContext } from "../context/UserProvider";
import { WALLETS_DATA } from "../consts/wallets.consts";
import { useWalletConnect } from "../context/WalletConnect";




const ConnectWalletButtons = () => {
    const [selectedWallet, setSelectedWallet] = useState(null);

    const { connect, disconnect, connecting, wallet, connected } = useWallet();
    const [isOpen, setIsOpen] = useState<boolean>(false);
    const userContext = useContext(UserContext);
    const { myWalletAddress, enableWallet, disableWalletAddress } = useWalletConnect()

    // Destructure context values with default functions to avoid null issues
    const { setAddress = () => { }, setUserWallet = () => { }, setWalletName = () => { } } = userContext || {};

    const [currentBalance, setCurrentBalance] = useState<number>();
    // const walletLists = useWalletList();
    const address = useAddress();
    let wallet_name;
    if (typeof window !== 'undefined') {
        // Perform localStorage action
        wallet_name = localStorage.getItem("selectedWallet");
    }
    // console.log("address----", address)

    // const handleWalletSelection = async (myWallet: any) => {
    //     localStorage.setItem("selectedWallet", JSON.stringify(myWallet));

    //     setSelectedWallet(myWallet);
    //     connect(myWallet.name);
    //     // console.log("myWallet.name", myWallet.name)
    //     localStorage.setItem("coinflip_walletname", myWallet.name.toLowerCase());
    //     setWalletName(myWallet.name.toLowerCase())
    //     setAddress(address);
    //     setUserWallet(wallet);

    //     // if (myWallet && address) {
    //     //   setIsConnected(true);
    //     //   const res = await getAmount(address);
    //     //   if (res) {
    //     //     setGameBalance({
    //     //       ada: res.ada_balance,
    //     //       dum: res.dum_balance,
    //     //       nebula: res.nebula_balance,
    //     //       konda: res.konda_balance
    //     //     });
    //     //   }
    //     // }
    // };

    const handleConnectWallet = (walletName: string) => async () => {
        try {
            await enableWallet(walletName);
        } catch (err) {
        }
    };

    const handleDisconnect = () => {
        localStorage.removeItem("selectedWallet");
        localStorage.removeItem("coinflip_walletname");
        disconnect();
        setSelectedWallet(null);
    };
    const handleDropdown = () => {
        setIsOpen(!isOpen);
    };

    useEffect(() => {
        const storedWallet = localStorage.getItem("selectedWallet");
        if (storedWallet) {
            setSelectedWallet(JSON.parse(storedWallet));
            connect(JSON.parse(storedWallet).name);
        }
    }, [connect]);

    //   useEffect(() => {
    //     console.log("address connected>>>", address);
    //     if (connected && address) {
    //       (async () => {
    //         const res = await getAmount(address);
    //     console.log("game balance", res)

    //         setInterval(async () => {
    //           const balance = await wallet.getBalance();
    //           setCurrentBalance(balance[0].quantity / 1000000);
    //         }, 1000);
    //         if (res) {
    //           setGameBalance({
    //             ada: res.ada_balance,
    //             dum: res.dum_balance,
    //             nebula: res.nebula_balance,
    //             konda: res.konda_balance,
    //             snek: res.snek_balance
    //           });
    //         }
    //       })();
    //     }
    //   }, [wallet, address]);



    return (
        <>
            <button
                className="flex items-center text-sm font-white rounded-lg border-2 border-white h-12  uppercase duration-300 px-8 py-2 text-white group relative"
                onClick={() => handleDropdown()}
                style={{
                    width: connected ? 180 : "auto"
                }}
            >
                {
                    myWalletAddress ? (
                        myWalletAddress && myWalletAddress.slice(0, 5) + "..." + myWalletAddress.slice(-4)
                    ) : (
                        <>
                            CONNECT WALLET
                            {/* <DownArrow className="group-hover:rotate-180" /> */}
                        </>
                    )
                }
                {myWalletAddress && (
                    <div className="hidden group-hover:block absolute left-0 top-[40px] w-full">
                        {/* {selectedWallet && ( */}
                        <button
                            className="text-white border-2 py-2.5 px-5 rounded-md cursor-pointer capitalize mt-2.5 w-full"
                            onClick={() => disableWalletAddress()}
                        >
                            disconnect
                        </button>
                        {/* )} */}
                    </div>
                )}
            </button>
            {!myWalletAddress && isOpen && (
                <div className="text-sm font-white h-12 uppercase  duration-300 border-white">
                    <ul className="px-4 border-2 border-white rounded-lg bg-white">
                        {/* {walletLists.map((walletlist) => (
                                <li
                                    className="flex space-x-2 items-center py-2 bg-white cursor-pointer"
                                    key={walletlist.name}
                                    onClick={() => handleWalletSelection(walletlist)}
                                >
                                    <Image
                                        src={walletlist.icon}
                                        alt={walletlist.name}
                                        width="30"
                                        height="30"
                                    />
                                    <span className="text-black h-12 py-3">
                                        {walletlist.name}
                                    </span>
                                </li>
                            ))} */}
                        {WALLETS_DATA.map((walletlist: any) => (
                            <li
                                className="flex space-x-2 items-center py-2 bg-white cursor-pointer"
                                key={walletlist.text}
                                onClick={handleConnectWallet(walletlist?.link)}
                            >
                                <Image
                                    src={walletlist.image}
                                    alt={walletlist.text}
                                    width="30"
                                    height="30"
                                />
                                <span className="text-black h-12 py-3">
                                    {walletlist.text}
                                </span>
                            </li>
                        ))}
                    </ul>

                </div>
            )}
        </>
    );
};

export default ConnectWalletButtons;