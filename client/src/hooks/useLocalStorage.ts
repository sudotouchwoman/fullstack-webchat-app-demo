import { useEffect, useState } from "react"

const LOCAL_STORAGE_PREFIX = "webchat-app-"
const isFuncValue = <T>(f: any): f is () => T => {
    return (typeof f === "function") && (f.length === 0)
}

const useLocalStorage = <T>(key: string, defaultT: T | (() => T)): [T, React.Dispatch<React.SetStateAction<T>>] => {
    // convenience hook that wraps useState and localStorage
    // to load/set values persistently between sessions
    const lsKey = LOCAL_STORAGE_PREFIX + key
    const [value, setValue] = useState(() => {
        const jsonValue = localStorage.getItem(lsKey)
        if (jsonValue === null) {
            return isFuncValue<T>(defaultT) ? defaultT() : defaultT
        }
        // this is a bit hacky way to tell TS compiler
        // not to yell about unsafe typing as `JSON.parse` actually
        // returns `any` type
        const parsed = JSON.parse(jsonValue)
        return parsed as T ? parsed : undefined
    })

    // update entry in localStorage any time the value is altered
    useEffect(() => {
        localStorage.setItem(lsKey, JSON.stringify(value))
    }, [lsKey, value])
    return [value, setValue]
}

export default useLocalStorage