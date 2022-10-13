import FormContentWrapper from './FormContentWrapper'
import { FormStepProps } from './Types'

type Account = {
    email: string
    password: string
}
type AccountProps = FormStepProps<Account>

function AccountForm({ email, password, updateFields }: AccountProps) {
    return (
        <FormContentWrapper title='Sign in with Email'>
            <label>Email</label>
            <input autoFocus
                required
                type="email"
                value={email}
                onChange={e => updateFields({ email: e.target.value })}
            />
            <label>Password</label>
            <input
                required
                type="password"
                value={password}
                onChange={e => updateFields({ password: e.target.value })}
            />
        </FormContentWrapper>
    )
}

export default AccountForm