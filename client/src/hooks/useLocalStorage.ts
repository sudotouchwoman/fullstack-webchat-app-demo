import React, { useEffect, useState } from "react"

const LOCAL_STORAGE_PREFIX = "webchat-app-"
const isFuncValue = <T>(f: any): f is () => T => {
    return (typeof f === "function") && (f.length === 0)
}

const useLocalStorage = <T>(key: string, defaultT: T | (() => T) | undefined):
    [T, React.Dispatch<React.SetStateAction<T>>, () => void] => {
    // convenience hook that wraps useState and localStorage
    // to load/set values persistently between sessions
    const lsKey = LOCAL_STORAGE_PREFIX + key
    const defValue = isFuncValue(defaultT) ? defaultT() : defaultT
    const [value, setValue] = useState(() => {
        const jsonValue = localStorage.getItem(lsKey)
        if (jsonValue === null) return defValue
        // this is a bit hacky way to tell TS compiler
        // not to yell about unsafe typing as `JSON.parse` actually
        // returns `any` type
        console.log(`Loaded ${key} from LS: ${jsonValue}`)
        const parsed = JSON.parse(jsonValue)
        return parsed as T ? parsed : undefined
    })
    // update entry in localStorage any time the value is altered
    useEffect(() => {
        if (value === defValue) return console.log(`${key} save omitted`)
        const jsonified = JSON.stringify(value)
        console.log(`Saves ${key} in local storage: ${jsonified}`)
        localStorage.setItem(lsKey, jsonified)
    }, [value])
    return [value, setValue, () => {
        console.log(`${key} dropped from LS`)
        localStorage.removeItem(key) 
    }]
}

export default useLocalStorage