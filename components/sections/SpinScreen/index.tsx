import Image from 'next/image'
import React from 'react'
import styles from './index.module.css'
const LostSpinScreen = () => {
    return (
        <div className={styles['spin-screen']}>
            <Image
                src={`/lost.gif`}
                alt="nebula-gif"
                width={250}
                height={250}
            />
        </div>
    )
}

const WinSpinScreen = () => {
    return (
        <div className={styles['spin-screen']}>
            <Image
                src={`/win.gif`}
                alt="nebula-gif"
                width={250}
                height={250}
            />
        </div>
    )
}

export {
    LostSpinScreen,
    WinSpinScreen
}