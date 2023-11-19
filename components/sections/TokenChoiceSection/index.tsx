"use client"
import React from 'react'
import styles from './index.module.css'
import { TOKEN_ARRAY } from '../../../consts/tokens.consts';
interface TokenChoiceSectionProps {
    tokenAmount: number;
    setTokenAmount: (value: number) => void;
    tokenType: string;
}
const TokenChoiceSection = ({
    tokenAmount, setTokenAmount, tokenType
}: TokenChoiceSectionProps) => {
    console.log("TOKEN_ARRAY[tokenType]", TOKEN_ARRAY[tokenType].choices)
    const getExactFormatValue = (value: number) => {
        if (value > 1000) {
            return value / 1000 + "k"
        }else{
            return value;
        }
    }
    return (
        <div className="sm:gap-1 p-1 md: gap-8 mt-5 inline-flex rounded-[12px] m-auto bg-[#202538] border-[2px] border border-[#2B303E] p-4 ">
            {/* <div className='bg-[#141928] border border-[#2B303E] border-[2px] p-4 rounded-[12px] gap-2 flex'> */}
            {
                tokenType && TOKEN_ARRAY[tokenType].choices.map((choice: number, index: number) => {
                    console.log("choice", choice)
                    return (
                        <button
                            key={index} type="button"
                            className={`${styles['ada-option']} ${tokenAmount === choice ? styles.active : ''}`}
                            onClick={() => setTokenAmount(choice)}
                        >
                            {getExactFormatValue(choice)}
                        </button>
                    )
                })
            }
            {/* </div> */}
        </div>
    )
}

export default TokenChoiceSection