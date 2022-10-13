import FormContentWrapper from './FormContentWrapper'
import { FormStepProps } from './Types'
type Address = {
  address: string
  city: string
  zip: string
}
type AddressProps = FormStepProps<Address>

function AddressForm({ address, city, zip, updateFields }: AddressProps) {
  return (
    <FormContentWrapper title='Address'>
      <label>Address</label>
      <input
        autoFocus
        required
        type="text"
        value={address}
        onChange={e => updateFields({ address: e.target.value })}
      />
      <label>City</label>
      <input
        required
        type="text"
        value={city}
        onChange={e => updateFields({ city: e.target.value })}
      />
      <label>ZIP Code</label>
      <input
        required
        type="text"
        value={zip}
        onChange={e => updateFields({ zip: e.target.value })}
      />
    </FormContentWrapper>
  )
}

export default AddressForm