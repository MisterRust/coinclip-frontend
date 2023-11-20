"use client"
import React, { useCallback, useEffect, useState } from 'react'
import { Card, Typography } from "@material-tailwind/react";
import styles from './index.module.css'
import { Record } from '../../utils/types';
import { getAgedTimes, getAllFlips, getMyFlips } from '../../pages/api/functions';
import { useAddress } from '@meshsdk/react';
import { useMedia } from 'react-use';
import { useWindowDimensions } from '../../hooks/useWindowDimensions';
const TABLE_HEAD = ["Time", "Address", "Token", "Amount", "Result"];

const BetTable = () => {
    const [showRecord, setShowRecord] = useState<number>(0);
    const [allRecords, setAllRecords] = useState<Record[]>()
    const [isMobile, setIsMobile] = useState<boolean>(false);

    const { height, width } = useWindowDimensions()
    const breakpoint = 768
    const walletAddr = useAddress();
    console.log("BetTable address", walletAddr)


    useEffect(() => {
        if (width < breakpoint) {
            setIsMobile(true)
        } else {
            setIsMobile(false)
        }
    }, [width, breakpoint])

    const getAllFlipsData = useCallback(async () => {
        try {
            const flipData = await getAllFlips();
            setAllRecords(flipData);
        } catch (error) {
            console.error("Error fetching all flips:", error);
        }
    }, []);

    const getMyFlipsData = useCallback(async () => {
        try {
            if (walletAddr !== undefined) {
                const flipData = await getMyFlips(walletAddr);
                setAllRecords(flipData);
            }
        } catch (error) {
            console.error("Error fetching my flips:", error);
        }
    }, [walletAddr]);


    const handleShowRecordChange = (record) => {
        setShowRecord(record);
    };
    useEffect(() => {
        const fetchData = async () => {
            if (showRecord === 0) {
                await getAllFlipsData();
            } else if (showRecord === 1) {
                await getMyFlipsData();
            }
        };

        fetchData();
    }, [showRecord, getAllFlipsData, getMyFlipsData]);


    return (
        <div className='mt-[40px]'>
            <div className='flex justify-between items-center'>
                {
                    !isMobile && <div className='font-semibold text-[24px] leading-[24px] text-white'> LIVE BET</div>
                }
                {
                    !isMobile &&
                    <div className='w-auto'>
                        <button onClick={() => handleShowRecordChange(0)} className={showRecord === 0 ? styles['bet-record_active'] : styles['bet-record']}>
                            LIVE BET
                        </button>
                        <button onClick={() => handleShowRecordChange(1)} className={showRecord === 1 ? styles['bet-record_active'] : styles['bet-record']}>
                            My BET
                        </button>
                    </div>
                }
                {
                    isMobile &&
                    <div className='w-full'>
                        <button onClick={() => handleShowRecordChange(0)} className={showRecord === 0 ? styles['bet-record_active'] : styles['bet-record']}>
                            LIVE BET
                        </button>
                        <button onClick={() => handleShowRecordChange(1)} className={showRecord === 1 ? styles['bet-record_active'] : styles['bet-record']}>
                            My BET
                        </button>
                    </div>
                }
            </div>
            <table className="w-full min-w-max table-auto text-left mt-[32px]">
                {
                    !isMobile &&
                    <thead>
                        <tr>
                            {TABLE_HEAD.map((head) => (
                                <th key={head} className="text-[#c0c4d4] p-4 font-normal leading-none opacity-70">

                                    {head}

                                </th>
                            ))}
                        </tr>
                    </thead>
                }

                <tbody>
                    {
                        allRecords && allRecords.length === 0
                        &&
                        <tr>
                            <td colSpan={100} className='text-center text-white'>NO RECORDS YET</td>
                        </tr>
                    }
                    {!isMobile && allRecords && allRecords.length > 0 && allRecords.map(({ created_at, addr, token, amount, result }, index) => (
                        <tr key={index} className="rounded-[12px] even:bg-[#202538]">
                            <td className="p-4 font-normal text-[#c0c4d4]">

                                {getAgedTimes(created_at)}

                            </td>
                            <td className="p-4 font-normal text-white">

                                {addr.slice(0, 10) + "..."}

                            </td>
                            <td className="p-4 font-normal text-white uppercase">
                                {token}

                            </td>
                            <td className="p-4 font-normal text-white">
                                {amount}

                            </td>
                            <td className="p-4 font-medium uppercase">
                                {
                                    result ?
                                        <p className='text-[#7af996]'>+ {amount * 2} ${token}</p>

                                        :
                                        <p className='text-[#f73737]'>- {amount} ${token}</p>

                                }

                            </td>
                        </tr>
                    ))}
                    {isMobile && allRecords && allRecords.length > 0 && allRecords.map(({ created_at, addr, token, amount, result }, index) => (
                        <tr key={index} className="rounded-[12px] even:bg-[#202538]">

                            <td className="p-4">

                                <p className='text-white font-normal'> {addr.slice(0, 10) + "..."}</p>

                                <p className='font-normal text-[#c0c4d4] text-white'>{getAgedTimes(created_at)}</p>



                            </td>

                            <td className="p-4 font-medium uppercase">
                                {
                                    result ?
                                        <p className='text-[#7af996]'>+ {amount * 2} ${token}</p>

                                        :
                                        <p className='text-[#f73737]'>- {amount} ${token}</p>

                                }

                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>

    )
}

export default BetTable