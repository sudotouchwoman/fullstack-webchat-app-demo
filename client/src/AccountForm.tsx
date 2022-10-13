import React from 'react'
import FormContentWrapper from './FormContentWrapper'

type Props = {}

function AccountForm({ }: Props) {
    return (
        <FormContentWrapper title='Sign in with Email'>
            <label>Email</label>
            <input autoFocus required type="email" />
            <label>Password</label>
            <input required type="password"></input>
        </FormContentWrapper>
    )
}

export default AccountForm