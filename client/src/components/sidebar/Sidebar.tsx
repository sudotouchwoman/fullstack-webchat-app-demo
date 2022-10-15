import { useState } from "react"
import { Button, Modal, Nav, Tab } from "react-bootstrap"
import Contacts from "../contacts/ContactsList"
import NewContactModal from "../contacts/NewContactModal"

type SidebarProps = { id: string }

const CONTACTS_PANE = "contacts-pane"
const CHATS_PANE = "chats-pane"

export default function ChatSidebar({ id }: SidebarProps) {
    const [activePane, setActivePane] = useState(CONTACTS_PANE)
    const [modalOpen, setModalOpen] = useState(false)
    const chatsOpen = activePane === CHATS_PANE
    const closeModal = () => setModalOpen(false)

    return (
        <div style={{
            width: '250px'
        }}
            className="d-flex flex-column" >
            <Tab.Container
                activeKey={activePane}
                onSelect={(p: string | null) => setActivePane(p ?? CONTACTS_PANE)}
            >
                <Nav variant="tabs" className="justify-content-center">
                    <Nav.Item>
                        <Nav.Link eventKey={CONTACTS_PANE}>Contacts</Nav.Link>
                    </Nav.Item>
                    <Nav.Item>
                        <Nav.Link eventKey={CHATS_PANE}>Chats</Nav.Link>
                    </Nav.Item>
                </Nav>
                <Tab.Content className="border-right overflow-auto flex-grow-1">
                    <Tab.Pane eventKey={CONTACTS_PANE}>
                        <Contacts />
                    </Tab.Pane>
                    <Tab.Pane eventKey={CHATS_PANE}>
                        {/* <Contacts /> */}
                    </Tab.Pane>
                </Tab.Content>
                <div className="p-2 border-top border-right small">
                    Your Id: <span className="text-muted">{id}</span>
                </div>
                <Button onClick={() => setModalOpen(true)} className="rounded-0">
                    New {chatsOpen ? 'Chat' : 'Contact'}
                </Button>
            </Tab.Container>
            <Modal show={modalOpen} onHide={closeModal}>
                {chatsOpen ?
                    <div>Stub for new chat creation</div> :
                    <NewContactModal closeModal={closeModal} />
                }
            </Modal>
        </div >
    )
}
