import { useEffect, useState } from "react"

export const useWindowDimensions = () => {
    const [windowDimensions, setWindowDimensions] = useState(
        getWindowDimensions()
    )
    const hasWindow = typeof window !== "undefined"

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