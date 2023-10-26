import Image from 'next/image'
import React from 'react'
interface Props{
  onClick: () =>void;
}
const FailSection = (
  {
    onClick
  }: Props
) => {
  return (
    <div className="h-full flex flex-col justify-center max-w-screen-lg mx-auto px-5 pb-5"><div className="flex flex-col justify-center mt-10"><p className=" text-black text-center text-2xl text-bold">Sorry, you got rugged</p>
      <Image className="mx-auto mt-10" src="/icons/fail.png" width="100" height="100" alt={`fail-icon`} />
      <button  onClick ={onClick} className="mt-10 m-auto text-white bg-[#008BF0] w-60 h-10 text-sm rounded-full border border-[#008BF0]"><p className="text-bold text-xl">Play Again</p></button>
      <button className="mt-10"><a className="text-[#008BF0] text-center text-sm hover:text-linkhighlight">Show My Record</a></button><p className=" text-black mt-10 text-center text-lg text-bold">Share the result</p>

    </div>
    </div>
  )
}

export default FailSection