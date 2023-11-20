"use client"
import React from 'react'
import styles from './index.module.css'
import styled from 'styled-components';
import { TOKEN_ARRAY } from '../../../consts/tokens.consts';
import Image from 'next/image';

interface BetChoiceButtonStyle {
    active?: boolean;
}
const BetChoiceButton = styled.div<BetChoiceButtonStyle>`
    border-radius: 12px;
    border: ${(props) => props.active && '2px solid #397aff'};
    display: flex;
    width: 117px;
    height: 48px;
    justify-content: center;
    align-items: center;
    gap: 10px;
    background: ${(props) => props.active ? '#286EFF' : '#0d0f18'};
    cursor: pointer;
    color: ${(props) => props.active ? 'white' : '#5E657B'};

    font-family: Oxanium;
    font-size: 16px;
    font-style: normal;
    font-weight: 600;
    line-height: 24px;
    text-transform: uppercase;
`

const TokenImage = styled.img`
    width: 24px;
    height: 24px;   
`

interface BetChoiceSectionProps {
    betChoice: string;
    setBetChoice: (value: string) => void;
    tokenType: string;
}

const BetChoiceSection = ({
    betChoice,
    setBetChoice,
    tokenType
}: BetChoiceSectionProps) => {
    const choices: string[] = ["Heads", "Tails"]
    return (
        <div className="mt-5 inline-flex 'bg-[#0d0f18] rounded-[12px] flex p-5 mx-auto">
            {
                choices.map((choice: string, index: number) => {
                    return (
                        <BetChoiceButton key={index} active={betChoice === choice} onClick={() => setBetChoice(choice)}>
                         {
                            choice === "Heads" &&
                            <Image src={TOKEN_ARRAY[tokenType].image[choice]} alt = "token-image" width={24} height={24} />   
                         }
                         {choice}
                         {
                            choice === "Tails" &&
                            <Image src={TOKEN_ARRAY[tokenType].image[choice]} alt = "token-image" width={24} height={24}/>   
                         }
                        </BetChoiceButton>
                    )
                })
            }
        </div>
    )
}

export default BetChoiceSection