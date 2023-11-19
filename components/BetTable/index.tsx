"use client"
import React, { useEffect, useState } from 'react'
import { Card, Typography } from "@material-tailwind/react";
import styles from './index.module.css'
import { Record } from '../../utils/types';
import { getAllFlips, getMyFlips } from '../../pages/api/functions';
import { useAddress } from '@meshsdk/react';
const TABLE_HEAD = ["Time", "Addr", "Token", "Amount", "Result"];

const BetTable = () => {
    const [showRecord, setShowRecord] = useState<number>(0);
    const [allRecords, setAllRecords] = useState<Record[]>()

    const walletAddr = useAddress();
    console.log("BetTable address", walletAddr)

    const getAllFlipsData = async () => {
        const flipData = await getAllFlips();
        setAllRecords(flipData)
    }

    const getMyFlipsData = async () => {
        const flipData = await getMyFlips(walletAddr)
        setAllRecords(flipData)
    }

    const handleShowRecordChange = (record) => {
        setShowRecord(record);
    };

    useEffect(() => {
        if (showRecord === 0) {
            getAllFlipsData();
        }
        if (showRecord === 0 && walletAddr !== undefined) {
            getMyFlipsData
        }

    }, [showRecord, walletAddr])

    return (
        <div className='w-[1044px]'>
            <div className='flex justify-between'>
                <div className='font-semibold text-[24px] leading-[24px] text-white'> LIVE BET</div>
                <div>
                    <button onClick={() => handleShowRecordChange(0)} className={showRecord === 0 ? styles['bet-record_active'] : styles['bet-record']}>
                        LIVE BET
                    </button>
                    <button onClick={() => handleShowRecordChange(1)} className={showRecord === 1 ? styles['bet-record_active'] : styles['bet-record']}>
                        My BET
                    </button>
                </div>
            </div>
            <table className="w-full min-w-max table-auto text-left mt-[32px]">
                <thead>
                    <tr>
                        {TABLE_HEAD.map((head) => (
                            <th key={head} className="text-[#5E657B] p-4">
                                <Typography
                                    variant="small"
                                    color="blue-gray"
                                    className="font-normal leading-none opacity-70"
                                >
                                    {head}
                                </Typography>
                            </th>
                        ))}
                    </tr>
                </thead>

                <tbody>
                    {
                        allRecords && allRecords.length === 0
                        &&
                        <tr>
                            <td colSpan={5} className='text-center text-white'>NO RECORDS YET</td>
                        </tr>
                    }
                    {allRecords && allRecords.length > 0 && allRecords.map(({ created_at, addr, token, amount, result }, index) => (
                        <tr key={index} className="rounded-[12px] even:bg-[#202538]">
                            <td className="p-4">
                                <Typography variant="small" color="white" className="font-normal">
                                    {created_at}
                                </Typography>
                            </td>
                            <td className="p-4">
                                <Typography variant="small" color="white" className="font-normal">
                                    {addr.slice(0, 10) + "..."}
                                </Typography>
                            </td>
                            <td className="p-4">
                                <Typography variant="small" color="white" className="font-normal uppercase">
                                    {token}
                                </Typography>
                            </td>
                            <td className="p-4">
                                <Typography as="a" href="#" variant="small" color="white" className="font-medium">
                                    {amount}
                                </Typography>
                            </td>
                            <td className="p-4">
                                {
                                    result ?
                                        <Typography as="a" href="#" variant="small" className="font-medium text-[#7af996] uppercase">
                                            + {amount * 2} ${token}
                                        </Typography>
                                        :
                                        <Typography as="a" href="#" variant="small" className="font-medium text-[#f73737] uppercase">
                                            - {amount} ${token}
                                        </Typography>
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