"use client"
import React, { useEffect, useState } from 'react'
import styles from './index.module.css'
import { TOKEN_ARRAY } from '../../../consts/tokens.consts';
import { FlexBox } from '../../common/FlexBox';
import CustomButton from '../../common/CustomButton';
import styled from 'styled-components';
import { infoAlert } from '../../alerts';
import Image from 'next/image';

interface TokenOptionStyle {
    active?: boolean;
}

const TokenOption = styled.div<TokenOptionStyle>`
    display: flex;
    padding: 4px 8px;
    justify-content: center;
    align-items: center;
    gap: 10px;
    border-radius: 12px;
    background: ${(props) => props.active ? '#286EFF' : '#202538'};
    cursor: pointer;
    color: ${(props) => props.active ? 'white' : '#5E657B'};
    

    font-family: Oxanium;
    font-size: 14px;
    font-style: normal;
    font-weight: 600;
    line-height: 22px;
    @media screen and (max-width: 768px) {
        display: flex;
        padding: 4px 8px;
        justify-content: center;
        align-items: center;
        gap: 10px;
        border-radius: 12px;
        font-family: Oxanium;
        font-size: 10px;
        font-style: normal;
        font-weight: 600;
        line-height: 14px;
    }

`


interface TokenChoiceSectionProps {
    tokenAmount: number;
    setTokenAmount: (value: number) => void;
    tokenType: string;
    play: () => void;
}
const TokenChoiceSection = ({
    tokenAmount, setTokenAmount, tokenType, play
}: TokenChoiceSectionProps) => {
    const storedCountdown = Math.floor((parseInt(localStorage.getItem('tx-pending')) - new Date().getTime()) / 1000);
    console.log("TOKEN_ARRAY[tokenType]", TOKEN_ARRAY[tokenType].choices)
    const [countdown, setCountdown] = useState(storedCountdown > 0 ? storedCountdown : 0);


    useEffect(() => {
        let timer;

        if (countdown > 0) {
            timer = setInterval(() => {
                setCountdown((prevCount) => {
                    if (prevCount === 1) {
                        // setIsButtonDisabled(false);
                        localStorage.removeItem('countdown'); // Remove countdown from storage after it reaches 1
                        clearInterval(timer);
                    } else {
                        localStorage.setItem('countdown', String(prevCount - 1));
                    }
                    return prevCount - 1;
                });
            }, 1000);
        }

        return () => {
            clearInterval(timer);
        };
    }, []);

    const getExactFormatValue = (value: number) => {
        if (value > 1000) {
            return value / 1000 + "k"
        } else {
            return value;
        }
    }
    return (

        <FlexBox padding='24px' border='1px solid #2B303E' bgColor='#202538' borderRadius='12px' gap="16px" direction='row' >
            <FlexBox padding='0px 16px' gap=' 10px' border='1px solid #2B303E' bgColor='#141928' borderRadius='12px' height='56px' alignItems='center' smDirection='row' justifyContent='space-between'>
                <FlexBox width='auto' gap="10px" smDirection='row' smWidth='auto'>
                    <Image src={TOKEN_ARRAY[tokenType].mainImage} alt="token-image" width={24} height={24} />
                    <p className='text-white text-[14px] leading-[24px]'>{tokenAmount && tokenAmount}</p>
                </FlexBox>
                <FlexBox width='auto' smDirection='row' gap="8px" smGap='4px'>
                    {
                        tokenType && TOKEN_ARRAY[tokenType].choices.map((choice: number, index: number) => {
                            console.log("choice", choice)
                            return (
                                <TokenOption key={index}
                                    onClick={() => setTokenAmount(choice)}
                                    active={tokenAmount === choice}
                                >
                                    {
                                        getExactFormatValue(choice)
                                    }
                                </TokenOption>

                            )
                        })
                    }
                </FlexBox>
            </FlexBox>
            {
                countdown > 0
                    ?
                    <CustomButton
                        text={countdown}
                        bgColor='#aaaaaa'
                        smWidth='100%'
                    />
                    :
                    <CustomButton
                        text='PLAY NOW'
                        onClick={() => {
                            play()
                        }}
                        smWidth='100%'
                    />

            }

        </FlexBox>
    )
}

export default TokenChoiceSection