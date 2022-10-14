import { ListGroup } from "react-bootstrap"
import { useContacts } from "../../contexts/ContactsProvider"

export default function Contacts() {
    const { contacts } = useContacts()
    // ContactContext consumer
    // creates list of contacts of currently logged user
    return (
        <ListGroup variant="flush">
            {contacts.map(contact => (
                <ListGroup.Item key={contact.id}>
                    {contact.name}
                </ListGroup.Item>
            ))}
        </ListGroup>
    )
}
