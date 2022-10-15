import React, { useEffect, useReducer, useState } from "react"

const LOCAL_STORAGE_PREFIX = "webchat-app-"
const isFuncValue = <T>(f: any): f is () => T => {
    return (typeof f === "function") && (f.length === 0)
}

const useLocalStorage = <T>(key: string, defaultT: T | (() => T), typeGuard: (a: any) => a is T):
    [T, React.Dispatch<T>, () => void] => {
    // convenience hook that wraps useState and localStorage
    // to load/set values persistently between sessions
    const lsKey = LOCAL_STORAGE_PREFIX + key
    const initialT = isFuncValue(defaultT) ? defaultT() : defaultT

    const defValue = () => {
        const jsonValue = localStorage.getItem(lsKey)
        if (jsonValue === null) return isFuncValue(defaultT) ? defaultT() : defaultT
        // this is a bit hacky way to tell TS compiler
        // not to yell about unsafe typing as `JSON.parse` actually
        // returns `any` type
        console.log(`LS: Reads ${key}: ${jsonValue}`)
        const parsed = JSON.parse(jsonValue)
        return typeGuard(parsed) ? parsed : initialT
    }
    // update entry in localStorage any time the value is altered
    const [state, stateDispatcher] = useReducer((prevValue: T, newValue: T) => {
        if (prevValue === newValue) {
            console.log(`${key} save omitted`)
            return prevValue
        }
        const jsonified = JSON.stringify(newValue)
        console.log(`LS: Saves ${key}: ${jsonified}`)
        localStorage.setItem(lsKey, jsonified)
        return newValue
    }, defValue())
    return [state, stateDispatcher, () => {
        console.log(`LS: removes ${key}`)
        localStorage.removeItem(key)
    }]
}

export default useLocalStorage