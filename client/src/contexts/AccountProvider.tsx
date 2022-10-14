import React, { ReactNode, useContext } from 'react'
import useLocalStorage from '../hooks/useLocalStorage'

interface Credentials {
    firstName: string
    lastName: string
    email: string
}
type Account = Credentials & {
    logInAccount: (a: Credentials) => void
}

const defaultCredentials = (): Credentials => {
    return { firstName: '', lastName: '', email: '' }
}
const AccountContext = React.createContext<Account>({
    ...defaultCredentials(),
    logInAccount: (a: Credentials) => { }
})

export function useAccount() {
    return useContext(AccountContext)
}

type AccountContextProps = { children: ReactNode }

export default function AccountProvider({ children }: AccountContextProps) {
    const [account, setAccount] = useLocalStorage("user-account", defaultCredentials)
    const logInAccount = (a: Partial<Credentials>) => {
        // perform some sort of credentials validation here?
        // then update account info
        // what if we would like to update the account in steps?
        // guess this logic should be managed by the context consumer
        setAccount(prev => {
            return { ...prev, ...a }
        })
    }
    return (
        <AccountContext.Provider value={{ ...account, logInAccount }}>
            {children}
        </AccountContext.Provider>
    )
}
