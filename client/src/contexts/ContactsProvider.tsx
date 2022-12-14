import React, { ReactNode, useContext, useEffect } from 'react'
import useLocalStorage from '../hooks/useLocalStorage'

export type Contact = {
    id: string
    name: string
}
export type ContactsContent = {
    contacts: Contact[]
    createContact: (id: string, name: string) => void
}

const isContact = (a: any): a is Contact => {
    return "id" in a && "name" in a
}
const ContactsContext = React.createContext<ContactsContent>({
    contacts: [],
    createContact: (id: string, name: string) => { }
})

export function useContacts() {
    return useContext(ContactsContext)
}

type ContactsContextProps = { id: string, children: ReactNode }

export default function ContactsProvider({ id, children }: ContactsContextProps) {
    const [contacts, setContacts] = useLocalStorage(
        "user-contacts",
        (): Contact[] => [],
        (a: any): a is Contact[] => { return Array.isArray(a) && a.every(isContact) }
    )
    //  drop account info on logouts
    // useEffect(cleanContacts, [id])
    const createContact = (id: string, name: string) => {
        // if user already has a contact with this id, omit the update
        // generally, the underlying component should perform such a check
        // on its own (passing error via context might be clumsy)
        if (contacts.find(c => c.id === id) !== undefined) return
        // one would like to make a POST request there or drop
        // a message via WebSockets. For now, contacts are merely stored in LS
        setContacts([...contacts, { id, name }])
    }
    return (
        <ContactsContext.Provider value={{ contacts, createContact }}>
            {children}
        </ContactsContext.Provider>
    )
}
