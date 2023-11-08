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


