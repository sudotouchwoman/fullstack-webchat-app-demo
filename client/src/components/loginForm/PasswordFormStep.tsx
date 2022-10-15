import { Form } from "react-bootstrap"
import FormContentWrapper from "./FormContentWrapper"
import { ModifiableProps } from "./Types"

type Password = { password: string, error: string | undefined }
type ModPasswordProps = ModifiableProps<Password>

const PasswordFormStep = ({ password, error, updateFields }: ModPasswordProps) => {
    return (
        <FormContentWrapper title={error ?? 'Sign Into Your Account'}>
            <Form.Group>
                <Form.Label>Password</Form.Label>
                <Form.Control
                    autoFocus
                    required
                    type="password"
                    value={password}
                    onChange={e => updateFields({ password: e.target.value })}
                />
            </Form.Group>
        </FormContentWrapper>
    )
}

export default PasswordFormStep