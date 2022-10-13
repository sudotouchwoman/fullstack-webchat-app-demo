import FormContentWrapper from './FormContentWrapper'
import { FormStepProps } from './Types'

type UserData = {
    firstName: string
    lastName: string
    age: string
}
type UserProps = FormStepProps<UserData>

function UserForm({ firstName, lastName, age, updateFields }: UserProps) {
    return (
        <FormContentWrapper title='About You'>
            <label>First Name</label>
            <input
                autoFocus
                required
                type="text"
                value={firstName}
                onChange={e => updateFields({ firstName: e.target.value })}
            />
            <label>Last Name</label>
            <input
                required
                type="text"
                value={lastName}
                onChange={e => updateFields({ lastName: e.target.value })}
            />
            <label>Age</label>
            <input
                required
                min={1}
                type="number"
                value={age}
                onChange={e => updateFields({ age: e.target.value })}
            />
        </FormContentWrapper>
    )
}

export default UserForm