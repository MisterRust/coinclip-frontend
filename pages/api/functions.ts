import axios from "axios";
import { BASE_URL } from "../../consts/url.consts";

export function message() {

    const utcDate = new Date();

    // Get the UTC timestamp in milliseconds
    const utcTimestamp = utcDate.getTime();

    const ud = "nebulacoinflip" + Math.floor(utcTimestamp / 120000).toString();


    const s = 3;

    let cc = "";
    for (let i = 0; i < ud.length; i++) {
        let char = ud[i];
        if (char.match(/[a-z]/i)) {
            const isUpperCase = char === char.toUpperCase();
            char = char.toLowerCase();
            let charCode = char.charCodeAt(0);
            charCode = ((charCode - 'a'.charCodeAt(0) + s) % 26) + 'a'.charCodeAt(0);
            if (isUpperCase) {
                charCode -= 32; // Convert back to uppercase
            }
            cc += String.fromCharCode(charCode);
        } else {
            cc += char;
        }
    }
    return cc;
}

export function getAgedTimes(timestamp: number) {
    const currentTimestamp = Math.floor(Date.now() / 1000); // Current UTC timestamp in seconds
    const givenTimestamp = timestamp / 1000; // Given timestamp in seconds

    const timeDifference = currentTimestamp - givenTimestamp;

    if (timeDifference < 60) {
        return `${Math.floor(timeDifference)} secs ago`;
    } else if (timeDifference < 3600) {
        return `${Math.floor(timeDifference / 60)} mins ago`;
    } else if (timeDifference < 86400) {
        return `${Math.floor(timeDifference / 3600)} hrs ago`;
    } else {
        return `${Math.floor(timeDifference / 86400)} days ago`;
    }
}


export function getObjectArray(key) {
    const storedValue = localStorage.getItem(key);
    return storedValue ? JSON.parse(storedValue) : [];
}

export function setObjectArray(key, value) {
    localStorage.setItem(key, JSON.stringify(value));
}

export const postFlips = async (reqData: any) => {
    console.log("calling postFlips", reqData)
    try {
        const response = await axios.post(`${BASE_URL}flips`,
            JSON.stringify(reqData),
            {
                headers: {
                    'Content-Type': 'application/json',
                },
            }
        );

        // Handle the response as needed
        console.log(response.data);
    } catch (error) {
        // Handle errors
        console.error(error);
    }
}

export const withdraw = async (reqData: any) => {
    console.log("withdraw reqData", reqData)
    try {
        const response = await axios.post(`${BASE_URL}tx/withdraw`,
            JSON.stringify(reqData),
            {
                headers: {
                    'Content-Type': 'application/json',
                },
            }
        );
        console.log("response.data", response.data)

        // Handle the response as needed
        return response.data;
    } catch (error) {
        // Handle errors
        console.error(error);
    }
}

export const getAllFlips = async () => {
    console.log("calling getFlips")
    try {
        const response = await axios.get(`${BASE_URL}flips`);
        console.log("getFlips response", response.data)
        return response.data.reverse()
    } catch (error) {
        // Handle errors
        console.error("getFlips error", error);
    }
}

export const getMyFlips = async (addr: string) => {
    console.log("calling getFlips")
    try {
        const response = await axios.get(`${BASE_URL}flips`);
        console.log("getFlips response", response.data)
        return response.data.reverse()
    } catch (error) {
        // Handle errors
        console.error("getFlips error", error);
    }
}

