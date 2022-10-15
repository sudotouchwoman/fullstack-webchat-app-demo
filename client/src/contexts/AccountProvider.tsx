import React, { ReactNode, useContext, useEffect } from 'react'
import useLocalStorage from '../hooks/useLocalStorage'

interface Credentials {
    firstName: string
    lastName: string
    email: string
}
type Account = Credentials & {
    logInAccount: (a: Credentials) => void
}

const isCredentials = (a: any): a is Credentials => {
    return "firstName" in a && "lastName" in a && "email" in a
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

type AccountContextProps = { id: string, children: ReactNode }

export default function AccountProvider({ id, children }: AccountContextProps) {
    // how would one sync LS with backend?
    // like, once we are signed in, account settings
    // in this context must correspond to the id
    // these can me fetched from API...Another hook?
    const [account, setAccount] = useLocalStorage(
        "user-account",
        defaultCredentials(),
        isCredentials
    )
    // drop account info on logouts
    // useEffect(cleanAccount, [id])
    const logInAccount = (a: Partial<Credentials>) => {
        // perform some sort of credentials validation here?
        // then update account info
        // what if we would like to update the account in steps?
        // guess this logic should be managed by the context consumer
        setAccount({...account, ...a})
    }
    return (
        <AccountContext.Provider value={{ ...account, logInAccount }}>
            {children}
        </AccountContext.Provider>
    )
}
