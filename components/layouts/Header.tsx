"use client";

import { useContext, useEffect, useState } from "react";
import Image from 'next/image'
import React from 'react'
import { CardanoWallet } from '@meshsdk/react'
import { useWalletConnect } from "../../context/WalletConnect";
import ConnectWalletButtons from "../ConnectWalletButtons";
import { UserContext, UserProvider } from "../../context/UserProvider";
import { useMedia } from "react-use";
const Header = () => {
    const [deg, setDeg] = useState<number>(0);
    const isMobile = useMedia('(max-width: 768px)');

    useEffect(() => {
        const interval = setInterval(() => {
            setDeg(prevDeg => (prevDeg + 1) % 360);
        }, 10);

        return () => clearInterval(interval);
    }, []);

    return (
        <>
            <nav className="bg-white dark:bg-gray-900 fixed w-full z-20 top-0 left-0 border-gray-200 dark:border-gray-600 z-[10]">
                <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
                    <div className="flex items-center cursor-pointer" onClick={() => {
                        location.href = "/"
                    }}>
                        <Image src={`/logo.png`} width={70} height={70} alt='logo-icon' style={{ filter: `hue-rotate(${deg}deg)` }}

                        />

                        {/* <span className="text-[10px]">Nebula Gaming</span> */}
                    </div>
                    <div className="flex md:order-2 gap-[10px]">
                        <div>
                            <ConnectWalletButtons />
                        </div>
                    </div>
                </div>
            </nav>
        </>
    );
};

export default Header;