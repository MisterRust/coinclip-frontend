"use client"
import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import Header from '../components/layouts/Header'
import FailSection from '../components/sections/FailSection'
import { BsChevronLeft, BsChevronRight } from "react-icons/bs";
import { useEffect, useState } from 'react';
import BetChoiceSection from '../components/sections/BetChoiceSection'
import TokenChoiceSection from '../components/sections/TokenChoiceSection'
import { Blockfrost, Lucid } from 'lucid-cardano'
import SuccessSection from '../components/sections/SucessSection'
import { infoAlert } from '../components/alerts'
import { TOKEN_ARRAY } from '../consts/tokens.consts'
import { LostSpinScreen, SpinScreen } from '../components/sections/SpinScreen'
import { TWITTER_URL } from '../consts/url.consts'
import axios from 'axios'
import ReactHowler from 'react-howler'
import { getObjectArray, message, postFlips, setObjectArray, withdraw } from './api/functions'
import { useMedia } from 'react-use'
import { useUserProvider } from '../context/UserProvider'
import Link from 'next/link'
import BetTable from '../components/BetTable';
import { ArrowButton, CardanoTokenText, SelectTokenText } from '../styles/GlobalStyles'
import { FlexBox } from '../components/common/FlexBox'
import { BackgroundImage } from '../consts/image.consts'
import { AppWallet, BlockfrostProvider, Transaction } from '@meshsdk/core'
import { useAddress, useWallet } from '@meshsdk/react'

export default function Home() {
  const [activeSection, setActiveSection] = useState<number>(0)
  const [betChoice, setBetChoice] = useState<string>("Heads")
  const [tokenNumber, setTokenNumber] = useState<number>(0)
  const [tokenType, setTokenType] = useState<string>("ada")
  const [tokenAmount, setTokenAmount] = useState<number>(0)
  const [loading, setLoading] = useState<boolean>(false)
  const [isWin, setIsWin] = useState<string>();

  const [playWin, setPlayWin] = useState<boolean>(false)
  const [playLost] = useState<boolean>(false)
  const { wallet, connected } = useWallet();
  const address = useAddress();

  useEffect(() => {
    setTokenAmount(0);
  }, [tokenType])

  const playAgain = () => {
    location.href = "/"
  }
  const submit = async () => {

    let walletName = localStorage.getItem("coinflip_walletname")
    if (walletName === "flint wallet")
      walletName = walletName.replace(" wallet", "");
    console.log("walletName hey", walletName)

    if (walletName === null) {
      infoAlert("Your wallet is not connected!!!")
      return;
    }
    if (tokenAmount === 0) {
      infoAlert("Please select the bet amount!!!")
      return;
    }

    const lucid = await Lucid.new(
      new Blockfrost(
        "https://cardano-mainnet.blockfrost.io/api/v0",
        "mainnetGY4Dy2Odu9EN6N7cQTq8z2EoW9BqdRlH"
      ),
      "Mainnet"
    );
    const receiver: string = "addr1q9m863n9rukl0e7ley0t2mqeqpu069datc6qs4gdukhaxxnr8lv7uxlmykp28rhdc0vsyynqnpt3jhk7uj407u6q5pxq34fuh7"
    const _token_amount = tokenAmount * Math.pow(10, TOKEN_ARRAY[tokenType].decimals);
    console.log("_token_amount", _token_amount)

    const policy = TOKEN_ARRAY[tokenType].policyId
    const asset = TOKEN_ARRAY[tokenType].asset
    console.log("policy, asset", policy, asset)

    let api = undefined
    // @ts-ignore
    window.connect = async function connect(wallet_name) {
      // @ts-ignore
      api = await window.cardano[wallet_name].enable();
      localStorage.setItem('wallet', wallet_name);
    }
    // @ts-ignore
    var wallet_name = walletName
    // @ts-ignore
    api = await window.cardano[wallet_name].enable();
    // @ts-ignore
    lucid.selectWallet(api);
    let walletAddr = await lucid.wallet.address();

    try {
      let tx;
      let txHash;
      if (tokenType === "ada") {
        tx = new Transaction({ initiator: wallet })
          .sendLovelace(
            receiver,
            '1000000'
          )
          .sendLovelace(
            receiver,
            _token_amount.toString()
          );
      }
      if (tokenType === 'snek') {
        tx = new Transaction({ initiator: wallet })
          .sendLovelace(
            receiver,
            '1000000'
          )
          .sendAssets(
            receiver,
            [
              {
                unit: '279c909f348e533da5808898f87f9a14bb2c3dfbbacccd631d927a3f534e454b',
                quantity: _token_amount.toString(),
              },
            ]
          );
      }
      if (tokenType === "nebula") {
        tx = new Transaction({ initiator: wallet })
          .sendLovelace(
            receiver,
            '1000000'
          )
          .sendAssets(
            receiver,
            [
              {
                unit: '3744d5e39333c384505214958c4ed66591a052778512e56caf420f624e4542554c41',
                quantity: _token_amount.toString(),
              },
            ]
          );
      }

      const unsignedTx = await tx.build();
      const signedTx = await wallet.signTx(unsignedTx);
      txHash = await wallet.submitTx(signedTx);
      // let tx;
      // if (tokenType === "ada") {
      //   tx = await lucid.newTx()
      //     // @ts-ignore
      //     .payToAddress(receiver, { "lovelace": 1000000n })
      //     // @ts-ignore
      //     .payToAddress(receiver, { "lovelace": BigInt(_token_amount) })
      //     .complete();
      // } else {

      //   tx = await lucid.newTx()
      //     // @ts-ignore
      //     .payToAddress(receiver, { "lovelace": 1000000n })
      //     // @ts-ignore
      //     .payToAddress(receiver, { [policy + asset]: BigInt(_token_amount) })
      //     .complete();
      // }


      // const signedTx = await tx.sign().complete();

      // const txHash = await signedTx.submit();

      if (txHash) {
        const result = isSuccess()
        console.log("result", result)
        setIsWin(result)
        setLoading(true)

        console.log("Result", result)
        setTimeout(() => {
          setLoading(false)
          if (result === "win") {
            setActiveSection(1)
            const msg = {
              token: tokenType,
              amount: tokenAmount,
              win: true
            }
            const retrievedArray: any[] = getObjectArray('record-' + walletAddr);
            retrievedArray.push(msg);
            setObjectArray(('record-' + walletAddr), retrievedArray)
            setPlayWin(true)
          } else {
            setActiveSection(2)
            const msg = {
              token: tokenType,
              amount: tokenAmount,
              win: false
            }
            // setPlayLost(true)
            const retrievedArray: any[] = getObjectArray('record-' + walletAddr);
            retrievedArray.push(msg);
            setObjectArray(('record-' + walletAddr), retrievedArray)

          }
          withDraw(result, walletAddr, _token_amount)
        }, 4500)

      }
    } catch (err) {
      console.log("err", err)
    }

  }

  const withDraw = async (result: string, walletAddr: string, _token_amount: number) => {
    if (result === "win") {
      setActiveSection(1)
      
      const res = await withdraw({
        address: walletAddr,
        tokenType: tokenType,
        amount: tokenAmount
      });
      console.log("Res", res)

    } else {
      await postFlips({
        addr: walletAddr,
        token: tokenType,
        result: false,
        amount: tokenAmount,
        created_at: new Date().getTime()
      })
      // if fail
      setActiveSection(2)
    }
  }

  const isSuccess = () => {
    const num = Math.random() * 2;
    console.log("num", num)
    return num > 0.01 ? "win" : "fail";
  }

  const handleTokenType = (event) => {
    setTokenType(event.target.value);
  };

  const minusNumber = () => {
    if (tokenNumber === 0) {
      setTokenNumber(2);
      setTokenType(Object.keys(TOKEN_ARRAY)[2])
    } else {
      setTokenNumber(tokenNumber - 1);
      setTokenType(Object.keys(TOKEN_ARRAY)[tokenNumber - 1])
    }
  }

  const plusNumber = () => {
    if (tokenNumber === 2) {
      setTokenNumber(0);
      setTokenType(Object.keys(TOKEN_ARRAY)[0])
    } else {
      setTokenNumber(tokenNumber + 1);
      setTokenType(Object.keys(TOKEN_ARRAY)[tokenNumber + 1])
    }
  }



  useEffect(() => {

    if (Object.values(wallet).length !== 0) {

    }

  }, [wallet])


  return (
    <div className={styles.container}>
      <Head>
        <title>Cardano Coin Flip by Nebula</title>
        <meta name="description" content="Cardano Coin Flip by Nebula" />
        <link rel="icon" href="/logo.png" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link href="https://fonts.googleapis.com/css2?family=Oxanium:wght@200;300;400;500;600;700;800&display=swap" rel="stylesheet" />

      </Head>

      <main className={styles.main}>
        <Header />
        {
          loading && isWin &&
          <SpinScreen
            gif={TOKEN_ARRAY[tokenType].gifs[betChoice][isWin]}
          />
        }
        {
          playWin &&
          <ReactHowler
            src='/sounds/win.wav'
            playing={playWin}
            loop={false}
          />
        }
        {
          playLost &&
          <ReactHowler
            src='sounds/lost.mp3'
            playing={playLost}
            loop={false}
          />
        }
        {
          activeSection === 0 &&
          <>
            <div className="w-full mx-auto mt-[50px]" style={{
              backgroundImage: `url(${BackgroundImage})`,
              backgroundPosition: 'center',
              backgroundSize: 'cover'
            }} >
              <FlexBox direction='column' alignItems='center'>
                <SelectTokenText>SELECT TOKEN:</SelectTokenText>
                <FlexBox alignItems='center' gap="87.5px" smGap='40px' className='mx-auto' smDirection='row'>
                  <ArrowButton onClick={minusNumber}>
                    <BsChevronLeft />
                  </ArrowButton>
                  <a href={TWITTER_URL} target="_blank" className='flex justify-center mt-[20px]'>
                    <Image src={Object.values(TOKEN_ARRAY)[tokenNumber].image[betChoice]} width={200} height={200} alt='logo-icon' />
                  </a>
                  <ArrowButton onClick={plusNumber}>
                    <BsChevronRight />
                  </ArrowButton>
                </FlexBox>
                <CardanoTokenText>
                  Cardano ({TOKEN_ARRAY[tokenType].value})
                </CardanoTokenText>
                <BetChoiceSection
                  betChoice={betChoice}
                  setBetChoice={setBetChoice}
                  tokenType={tokenType}
                />
              </FlexBox>
            </div>
            <div className='max-w-[1440px] w-full '>
              <div className="flex flex-col">

                {
                  tokenType && Object.values(wallet).length !== 0 &&
                  <TokenChoiceSection
                    tokenAmount={tokenAmount}
                    setTokenAmount={setTokenAmount}
                    tokenType={tokenType}
                    play={() => {
                      submit()
                    }}
                  />
                }
                {/* <button
                  className={styles['btn-submit']}
                  onClick={() => {
                    submit()
                  }}
                  disabled={!tokenAmount || !betChoice}
                >
                  <p className="text-bold text-[16px] leading-[24px] ">PLAY NOW</p>
                </button> */}
                <BetTable />
              </div>
            </div>
          </>
        }
        {
          activeSection === 1 &&
          <>
            <SuccessSection
              onClick={playAgain}
            />
            <ReactHowler
              src='/sounds/win.wav'
              playing={true}
              loop={false}
            />
          </>

        }
        {
          activeSection === 2 &&
          <>
            <FailSection
              onClick={playAgain}
            />
            <ReactHowler
              src='sounds/lost.mp3'
              playing={true}
              loop={false}
            />
          </>
        }
      </main>


    </div>
  )
}
