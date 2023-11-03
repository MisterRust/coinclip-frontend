"use client"
import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import Header from '../components/layouts/Header'
import FailSection from '../components/sections/FailSection'
import { useEffect, useState } from 'react';
import BetChoiceSection from '../components/sections/BetChoiceSection'
import TokenChoiceSection from '../components/sections/TokenChoiceSection'
import { useWallet } from "@meshsdk/react";
import { Blockfrost, Lucid } from 'lucid-cardano'
import SuccessSection from '../components/sections/SucessSection'
import { infoAlert } from '../components/alerts'
import { TOKEN_ARRAY } from '../consts/tokens.consts'
import { LostSpinScreen, WinSpinScreen } from '../components/sections/SpinScreen'
import { TWITTER_URL } from '../consts/url.consts'
import axios from 'axios'
import ReactHowler from 'react-howler'
export default function Home() {
  const { wallet, connected } = useWallet();
  console.log("wallet", wallet)
  const [activeSection, setActiveSection] = useState<number>(0)
  const [betChoice, setBetChoice] = useState<string>()
  const [tokenType, setTokenType] = useState<string>("ada")
  const [tokenAmount, setTokenAmount] = useState<number>()
  const [loading, setLoading] = useState<boolean>(false)
  const [isWin, setIsWin] = useState<boolean>();
  const [playWin, setPlayWin] = useState<boolean>(false)
  const [playLost, setPlayLost] = useState<boolean>(false)
  const playAgain = () => {
    location.href = "/"
  }

  const submit = async () => {
    console.log("wallet", wallet)
    if (Object.keys(wallet).length === 0) {
      infoAlert("Your wallet is not connected!!!")
      return;
    }
    // const address = await wallet.getChangeAddress()
    // console.log("address", address, tokenAmount)
    const lucid = await Lucid.new(
      new Blockfrost(
        "https://cardano-mainnet.blockfrost.io/api/v0",
        "mainnetGY4Dy2Odu9EN6N7cQTq8z2EoW9BqdRlH"
      ),
      "Mainnet"
    );
    const receiver: string = "addr1q9m863n9rukl0e7ley0t2mqeqpu069datc6qs4gdukhaxxnr8lv7uxlmykp28rhdc0vsyynqnpt3jhk7uj407u6q5pxq34fuh7"
    const _token_amount = tokenAmount * Math.pow(10, TOKEN_ARRAY[tokenType].decimals);

    const policy = TOKEN_ARRAY[tokenType].policyId
    const asset = TOKEN_ARRAY[tokenType].asset

    let api = undefined
    // @ts-ignore
    window.connect = async function connect(walletName) {
      // @ts-ignore
      api = await window.cardano[walletName].enable();
      localStorage.setItem('wallet', walletName);
    }
    // @ts-ignore
    var walletName = "nami"
    // @ts-ignore
    api = await window.cardano[walletName].enable();
    // @ts-ignore
    lucid.selectWallet(api);
    // @ts-ignore
    let _address = await lucid.wallet.address();
    try {
      let tx;

      if (tokenType === "ada") {
        tx = await lucid.newTx()
          // @ts-ignore
          .payToAddress(receiver, { "lovelace": 1000000n })
          // @ts-ignore
          .payToAddress(receiver, { "lovelace": _token_amount })
          .complete();

      } else {

        tx = await lucid.newTx()
          // @ts-ignore
          .payToAddress(receiver, { "lovelace": 1000000n })
          // @ts-ignore
          .payToAddress(receiver, { [policy + asset]: _token_amount })
          .complete();
      }
      const signedTx = await tx.sign().complete();

      const txHash = await signedTx.submit();
      // const txHash = true;
      if (txHash) {
        const result = isSuccess()
        setIsWin(result)
        setLoading(true)

        console.log("Result", result)
        setTimeout(() => {
          setLoading(false)
          if (result) {
            setActiveSection(1)
            // setPlayWin(true)
          } else {
            setActiveSection(2)
            // setPlayLost(true)
          }
          withDraw(result, _address, _token_amount)
        }, 5000)

      }
    } catch (err) {
      console.log("err", err)
    }

  }

  const withDraw = async (result: boolean, _address: string, _token_amount: number) => {
    if (result) {
      // if success
      setActiveSection(1)
      const lucid = await Lucid.new(
        new Blockfrost(
          "https://cardano-mainnet.blockfrost.io/api/v0",
          'mainnetGY4Dy2Odu9EN6N7cQTq8z2EoW9BqdRlH'
        ),
        "Mainnet"
      );
      const response = await axios.get("https://nebula-coinflip-backend.vercel.app/")
      const seed = response.data.key
      await lucid.selectWalletFromSeed(seed);
      let tx;
      if (tokenType === "ada") {
        tx = await lucid.newTx()
          .payToAddress(_address, { lovelace: BigInt(_token_amount * 2) })
          .complete();

      } else {
        tx = await lucid.newTx()
          // @ts-ignore
          .payToAddress(_address, { [policy + asset]: _token_amount * 2 })
          .complete();
      }
      const signedTx = await tx.sign().complete();

      const txHash = await signedTx.submit();
      console.log("txhash", txHash)

    } else {
      // if fail
      setActiveSection(2)
    }
  }

  const isSuccess = () => {
    const num = Math.random() * 2;
    console.log("num", num)
    return num > 1 ? true : false;
  }

  const handleTokenType = (event) => {
    setTokenType(event.target.value);
  };

  ////////////////////////////


  return (
    <div className={styles.container}>
      <Head>
        <title>Nebula CoinFlip Game</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <Header />
        {
          loading && (isWin ?
            <WinSpinScreen />
            :
            <LostSpinScreen />)
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
        <div>
          <select id="countries" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            value={tokenType} onChange={handleTokenType}
          >
            <option selected>Choose a token</option>
            {
              Object.keys(TOKEN_ARRAY).map((item, index) => {
                return (
                  <option
                    value={item} key={index}

                  >
                    {
                      TOKEN_ARRAY[item].value
                    }
                  </option>
                )
              })
            }
          </select>
        </div>
        {
          activeSection === 0 &&
          <div className="h-full flex flex-col justify-center max-w-screen-lg mx-auto px-5 pb-5">
            <div className="flex flex-col mt-10"><div className="m-auto"><p className="text-black text-4xl font-bold text-center">Nebula Coin Flip</p>
              <a href={TWITTER_URL} target="_blank" className='flex justify-center'>
                <Image src={`/nebula.png`} width={200} height={200} alt='logo-icon' />
              </a></div>
              <p className="text-black text-xl font-bold text-center">Going for</p>
              <BetChoiceSection
                betChoice={betChoice}
                setBetChoice={setBetChoice}
              />
              {
                tokenType &&
                <TokenChoiceSection
                  tokenAmount={tokenAmount}
                  setTokenAmount={setTokenAmount}
                  tokenType={tokenType}
                />
              }


              <p className="mt-5 text-black text-xl font-bold text-center">For</p>

              <button
                className={styles['btn-submit']}
                onClick={() => {
                  submit()
                }}
                disabled={!tokenAmount || !betChoice}
              >
                <p className="text-bold text-xl">Double or nothing</p>
              </button>
              <button className="mt-5"><a className="text-[#008BF0] text-center text-sm hover:text-linkhighlight">Show My Record</a></button>
            </div>
          </div>
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
