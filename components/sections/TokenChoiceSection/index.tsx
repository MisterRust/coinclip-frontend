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
        <div className="mt-5 inline-flex rounded-full m-auto bg-[#008BF0]">
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
        </div>
    )
}

export default TokenChoiceSection