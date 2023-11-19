import axios from "axios";

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
        const response = await axios.post("https://nebula-coinflip-backend.up.railway.app/flips",
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

export const getAllFlips = async () => {
    console.log("calling getFlips")
    try {
        const response = await axios.get("https://nebula-coinflip-backend.up.railway.app/flips");
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
        const response = await axios.get("https://nebula-coinflip-backend.up.railway.app/flips/" + addr);
        console.log("getFlips response", response.data)
        return response.data.reverse()
    } catch (error) {
        // Handle errors
        console.error("getFlips error", error);
    }
}

