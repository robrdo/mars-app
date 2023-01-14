import { Dispatch, SetStateAction, useState } from "react"

export type Timer = {
    timerId: string
    initTime: number
}

export function useStateWithInterceptor<T>(initialState: T, setInterceptor: (value:SetStateAction<T>, setMethod: Dispatch<SetStateAction<T>>) => void):
    [T, (value: SetStateAction<T>) => void] {
    const [state, setMethod] = useState(initialState)

    const wrappedMethod = (value: SetStateAction<T>) => {
        return setInterceptor(value, setMethod)
    }

    return [state, wrappedMethod]
}