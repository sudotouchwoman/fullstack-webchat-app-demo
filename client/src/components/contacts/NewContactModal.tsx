import { FormEvent, useRef, useState } from 'react'
import { Modal, Form, Button } from 'react-bootstrap'
import { useContacts } from '../../contexts/ContactsProvider'

type NewContactModalProps = {
    closeModal: () => void
}

function NewContactModal({ closeModal }: NewContactModalProps) {
    const modalErrRef = useRef<string>("")
    const idRef = useRef<HTMLInputElement>(null)
    const nameRef = useRef<HTMLInputElement>(null)
    const { contacts, createContact } = useContacts()

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault()
        const id = idRef.current?.value
        const name = nameRef.current?.value
        if (id === undefined || name === undefined) return
        // make sure user has no contact with such id
        modalErrRef.current = "Sorry, looks like this contact already exists!"
        if (contacts.find(c => c.id === id) !== undefined) return
        modalErrRef.current = ""
        createContact(id, name)
        closeModal()
    }

    const hasError = modalErrRef.current === ""
    return (
        <>
            <Modal.Header closeButton>
                {hasError ? "Create Contact": modalErrRef.current}
            </Modal.Header>
            <Modal.Body>
                <Form onSubmit={handleSubmit}>
                    <Form.Group>
                        <Form.Label>Id</Form.Label>
                        <Form.Control type="text" ref={idRef} required />
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>Name</Form.Label>
                        <Form.Control type="text" ref={nameRef} required />
                    </Form.Group>
                    <Button type="submit">Create Contact</Button>
                </Form>
            </Modal.Body>
        </>
    )
}

export default NewContactModal