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
                    <Image src={`/nebula.png`} width={70} height={70} alt='logo-icon' />
                    <div className="flex md:order-2">

                        {/* <button type="button" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 text-center mr-3 md:mr-0 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                            onClick={() => { setShowConnectModal(true) }}
                        >Connect Wallet</button> */}
                        <CardanoWallet />

                        <button data-collapse-toggle="navbar-sticky" type="button" className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600" aria-controls="navbar-sticky" aria-expanded="false">
                            <span className="sr-only">Open main menu</span>
                            <svg className="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 17 14">
                                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M1 1h15M1 7h15M1 13h15" />
                            </svg>
                        </button>
                    </div>

                </div>
            </nav>
            {
                showConnectModal &&
                <div className="fixed inset-0 z-[1000] overflow-y-auto" >
                    <div
                        className="fixed inset-0 w-full h-full bg-black opacity-40"
                        onClick={() => setShowConnectModal(false)}
                    ></div>
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