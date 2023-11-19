"use client"
import React from 'react'
import styles from './index.module.css'

interface BetChoiceSectionProps {
    betChoice: string;
    setBetChoice: (value: string) => void;
}

const BetChoiceSection = ({
    betChoice,
    setBetChoice,
}: BetChoiceSectionProps) => {

    const choices: string[] = ["Heads", "Tails"]
    return (
        <div className="mt-5 inline-flex rounded-full m-auto bg-[#202538] p-1 rounded-[6px]">
            {/* <div className='bg-[#141928] rounded-[6px]'> */}
                {
                    choices.map((choice: string, index: number) => {
                        return (
                            <button
                                key={index}
                                type="button"
                                className={`${styles['btn-choice']} ${betChoice === choice ? styles.active : ''}`}
                                onClick={() => setBetChoice(choice)}
                            >
                                {choice}
                            </button>
                        )
                    })
                }
            {/* </div> */}
        </div>
    )
}

export default BetChoiceSection