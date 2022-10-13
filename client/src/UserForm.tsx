import React from 'react'
import FormContentWrapper from './FormContentWrapper'

type Props = {}

function UserForm({ }: Props) {
    return (
        <FormContentWrapper title='About You'>
            <label>First Name</label>
            <input autoFocus required type="text" />
            <label>Age</label>
            <input required min={1} type="number" />
        </FormContentWrapper>
    )
}

export default UserForm