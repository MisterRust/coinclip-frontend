import Image from 'next/image'
import React from 'react'
interface Props{
    onClick: () =>void;
  }
const SuccessSection = (
    {
      onClick
    }: Props
  ) => {
    return (
        <div className="h-full flex flex-col justify-center max-w-screen-lg mx-auto px-5 pb-5"><div className="flex flex-col justify-center mt-10">
            <p className=" text-black text-center text-2xl text-bold">Congratulations, you doubled ;)</p>
            <Image className="mx-auto mt-10" src="/icons/success.png" width="100" height="100" alt={`success-icon`} />
            <button className="mt-10 m-auto text-white bg-[#008BF0] w-60 h-10 text-sm rounded-full border border-[#008BF0]" onClick={onClick}>
                <p className="text-bold text-xl">Play Again</p>
            </button>
            <button className="mt-10"><a  href = "/myrecord" className="text-[#008BF0] text-center text-sm hover:text-linkhighlight">Show My Record</a></button><p className=" text-black mt-10 text-center text-lg text-bold">Share the result</p><div className="flex flex-row justify-center">
                {/* <button title="Wow, I just doubled my ADA check it out!" aria-label="facebook" className="react-share__ShareButton w-8" style="background-color: transparent; border: none; padding: 0px; font: inherit; color: inherit; cursor: pointer;">
                    <img src="/01a470d813915c298403.png" /></button>
                <button aria-label="twitter" className="react-share__ShareButton w-8 ml-2" style="background-color: transparent; border: none; padding: 0px; font: inherit; color: inherit; cursor: pointer;">
                    <img src="/c6e48e60f856cb822273.png" /></button>
                <button aria-label="telegram" className="react-share__ShareButton w-8 ml-2" style="background-color: transparent; border: none; padding: 0px; font: inherit; color: inherit; cursor: pointer;">
                    <img src="/e9722f26cc228e817986.png" /></button>
                <button aria-label="reddit" className="react-share__ShareButton w-8 ml-2" style="background-color: transparent; border: none; padding: 0px; font: inherit; color: inherit; cursor: pointer;"><img src="/1202d9af567c1c424a58.png" />

                </button> */}
            </div>
        </div>
        </div>
    )
}

export default SuccessSection