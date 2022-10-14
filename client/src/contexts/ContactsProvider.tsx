import React, { ReactNode, useContext } from 'react'
import useLocalStorage from '../hooks/useLocalStorage'

export type Contact = {
    id: string
    name: string
}
export type ContactsContent = {
    contacts: Contact[]
    createContact: (id: string, name: string) => void
}

const ContactsContext = React.createContext<ContactsContent>({
    contacts: [],
    createContact: () => { }
})

export function useContacts() {
    return useContext(ContactsContext)
}

type ContactsContextProps = { children: ReactNode }

export default function ContactsProvider({ children }: ContactsContextProps) {
    const [contacts, setContacts] = useLocalStorage("contacts", (): Contact[] => [])
    const createContact = (id: string, name: string) => {
        // if user already has a contact with this id, omit the update
        // generally, the underlying component should perform such a check
        // on its own (passing error via context might be clumsy)
        if (contacts.find(c => c.id === id) !== undefined) return
        setContacts((prev: Contact[]) => [...prev, { id, name }])
    }
    return (
        <ContactsContext.Provider value={{ contacts, createContact }}>
            {children}
        </ContactsContext.Provider>
    )
}
