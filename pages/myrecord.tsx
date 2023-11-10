"use client"
import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import Header from '../components/layouts/Header'
import FailSection from '../components/sections/FailSection'
import { useEffect, useState } from 'react';
import BetChoiceSection from '../components/sections/BetChoiceSection'
import TokenChoiceSection from '../components/sections/TokenChoiceSection'
import { useAddress, useWallet } from "@meshsdk/react";
import { Blockfrost, Lucid } from 'lucid-cardano'
import SuccessSection from '../components/sections/SucessSection'
import { infoAlert } from '../components/alerts'
import { TOKEN_ARRAY } from '../consts/tokens.consts'
import { LostSpinScreen, SpinScreen, WinSpinScreen } from '../components/sections/SpinScreen'
import { TWITTER_URL } from '../consts/url.consts'
import axios from 'axios'
import ReactHowler from 'react-howler'
import { getObjectArray, message } from './api/functions'
import { useMedia } from 'react-use'
export default function MyRecord() {
    const address = useAddress();
    const [records, setRecords] = useState<any[]>()

    useEffect(() => {
        if (address && address !== "") {
            const my_records = getObjectArray('record-' + address)
            setRecords(my_records)
            console.log("my_records", my_records)
        }
    }, [address])
    return (
        <div className={styles.container}>
            <Head>
                <title>Cardano CoinFlip Game</title>
                <meta name="description" content="Flip a coin through space time" />
                <link rel="icon" href="/logo.png" />

                <link href="https://fonts.googleapis.com/css2?family=Orbitron:wght@400;500;600;700;800;900&display=swap" rel="stylesheet"></link>
            </Head>
            <main className={styles.main}>
                <Header />
                <div className='pt-[75px]'>
                    {
                        records && records.length > 0 &&
                        records.map((item, index) => {
                            return (
                                <div key={index}>
                                    You flipped {item.amount} {item.type} and {
                                        item.win ? 'doubled' : 'rugged'
                                    }
                                </div>
                            )
                        })
                    }
                </div>

            </main>


        </div>
    )
}
