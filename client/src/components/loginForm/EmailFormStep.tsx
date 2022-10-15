import { Form } from "react-bootstrap"
import { ModifiableProps } from "./Types"
import FormContentWrapper from "./FormContentWrapper"

type Email = { email: string, error: string | undefined }
type ModEmailProps = ModifiableProps<Email>

const EmailFormStep = ({ email, error, updateFields }: ModEmailProps) => {
    return (
        <FormContentWrapper title={error ?? 'Sign Into Your Account'}>
            <Form.Group>
                <Form.Label>Email Address</Form.Label>
                <Form.Control
                    autoFocus
                    required
                    type="email"
                    value={email}
                    onChange={e => updateFields({ email: e.target.value })}
                />
            </Form.Group>
        </FormContentWrapper>
    )
}

export default EmailFormStep