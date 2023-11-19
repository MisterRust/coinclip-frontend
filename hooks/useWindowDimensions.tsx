import { useEffect, useState } from "react"

let hasWindow = typeof window !== "undefined"
export const useWindowDimensions = () => {
    const [windowDimensions, setWindowDimensions] = useState(
        getWindowDimensions()
    )
    

    useEffect(() => {
        if (hasWindow) {
            const handleResize = () => {
                setWindowDimensions(getWindowDimensions())
            }

            window.addEventListener("resize", handleResize)
            return () => window.removeEventListener("resize", handleResize)
        }
    }, [hasWindow])
    function getWindowDimensions() {
        const width = hasWindow ? window.innerWidth : null
        const height = hasWindow ? window.innerHeight : null
        return {
            width,
            height,
        }
    }

    return windowDimensions
}