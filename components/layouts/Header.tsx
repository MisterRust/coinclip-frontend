"use client";

import { useState } from "react";
import Image from 'next/image'
import React from 'react'
import { CardanoWallet } from '@meshsdk/react'

const Header = () => {
    const [showConnectModal, setShowConnectModal] = useState(false)
    return (
        <>
            <nav className="bg-white dark:bg-gray-900 fixed w-full z-20 top-0 left-0 border-b border-gray-200 dark:border-gray-600 z-[10]">
                <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
                    <Image src={`/logo.png`} width={70} height={70} alt='logo-icon' />
                    <div className="flex md:order-2">

                        {/* <button type="button" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 text-center mr-3 md:mr-0 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                            onClick={() => { setShowConnectModal(true) }}
                        >Connect Wallet</button> */}
                        <CardanoWallet />

                    </div>

                </div>
            </nav>
            {
                showConnectModal &&
                <div className="fixed inset-0 z-[1000] overflow-y-auto" >
                    <div
                        className="fixed inset-0 w-full h-full bg-black opacity-40"
                        onClick={() => setShowConnectModal(false)}
                    >
                        
                    </div>
                    <div className="flex items-center min-h-screen">
                        <div className="relative w-[400px] max-w-lg p-4 mx-auto bg-white rounded-md shadow-lg px-[30px] py-[40px]">
                            <div className='text-[30px] mb-[15px]'>Select your Wallet</div>
                            <CardanoWallet />
                        </div>
                    </div>
                </div>
            }

        </>

    )
}

export default Header