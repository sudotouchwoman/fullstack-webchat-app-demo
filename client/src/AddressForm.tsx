import React from 'react'
import FormContentWrapper from './FormContentWrapper'

type Props = {}

function AddressForm({ }: Props) {
  return (
    <FormContentWrapper title='Address'>
      <label>Address</label>
      <input autoFocus required type="text" />
      <label>City</label>
      <input autoFocus required type="text" />
      <label>ZIP Code</label>
      <input required type="text" />
    </FormContentWrapper>
  )
}

export default AddressForm