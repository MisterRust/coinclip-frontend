"use client";

import { useEffect, useState } from "react";
import Image from 'next/image'
import React from 'react'
import { CardanoWallet } from '@meshsdk/react'
import { useWalletConnect } from "../../context/WalletConnect";

const Header = () => {
    const [showConnectModal, setShowConnectModal] = useState(false)
    const [deg, setDeg] = useState<number>(0)

    const { enableWallet, myWalletAddress, disableWalletAddress } = useWalletConnect()

    useEffect(() => {
        const interval = setInterval(() => {
            setDeg(prevDeg => (prevDeg + 1) % 360);
        }, 10);    // Change the value every 1 second (or adjust as needed)

        return () => clearInterval(interval);   // Cleanup on unmount
    }, []);
    useEffect(() => {
        // console.log("Deg", deg);
    }, [deg])
    return (
        <>
            <nav className="bg-white dark:bg-gray-900 fixed w-full z-20 top-0 left-0 border-b border-gray-200 dark:border-gray-600 z-[10]">
                <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
                    <div className="flex items-center">
                        <Image src={`/logo.png`} width={70} height={70} alt='logo-icon' style={{ filter: `hue-rotate(${deg}deg)` }} />
                        <span>Nebula Gaming</span>
                    </div>
                    <div className="flex md:order-2 gap-[10px]">
                        {/* <CardanoWallet /> */}
                        {
                            myWalletAddress
                                ?
                                <>
                                    <button
                                        className="bg-[#008BF0] text-white rounded-[10px] w-[150px] h-[40px] justify-center items-center"
                                        onClick={() => {
                                            enableWallet("nami")
                                        }}>
                                        {
                                            myWalletAddress.slice(0, 4) + "..." + myWalletAddress.slice(-3)
                                        }
                                    </button>
                                    <button
                                        className="bg-[#008BF0] text-white rounded-[10px] w-[150px] h-[40px] justify-center items-center"
                                        onClick={() => {
                                            disableWalletAddress()
                                        }}>
                                        {
                                            `Disconnect`
                                        }
                                    </button>
                                </>
                                :
                                <button
                                    className="bg-[#008BF0] text-white rounded-[10px] w-[150px] h-[40px] justify-center items-center"
                                    onClick={() => {
                                        enableWallet("nami")
                                    }}>Connect Wallet
                                </button>
                                // <>

                                //     <button id="dropdownDefaultButton" data-dropdown-toggle="dropdown" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800" type="button">Dropdown button <svg className="w-2.5 h-2.5 ml-2.5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 10 6">
                                //         <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 1 4 4 4-4" />
                                //     </svg>
                                //     </button>

                                //     <div id="dropdown" className="z-10 hidden bg-white divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg-gray-700">
                                //         <ul className="py-2 text-sm text-gray-700 dark:text-gray-200" aria-labelledby="dropdownDefaultButton">
                                //             <li>
                                //                 <a href="#" className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Dashboard</a>
                                //             </li>
                                //             <li>
                                //                 <a href="#" className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Settings</a>
                                //             </li>
                                //             <li>
                                //                 <a href="#" className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Earnings</a>
                                //             </li>
                                //             <li>
                                //                 <a href="#" className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Sign out</a>
                                //             </li>
                                //         </ul>
                                //     </div>

                                // </>

                        }

                    </div>

                </div>
            </nav>

        </>

    )
}

export default Header