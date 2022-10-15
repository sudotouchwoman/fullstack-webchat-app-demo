import { FormEvent, useState } from 'react'
import { Button, Form } from 'react-bootstrap'
import useMultistepForm from "../../hooks/useMultistepForm"
import EmailFormStep from './EmailFormStep'
import PasswordFormStep from './PasswordFormStep'

export interface SignInFormData {
    email: string
    password: string
}

const DEFAULT_SIGN_IN_ERR: string | undefined = undefined
const DEFAULT_SIGN_IN_DATA: SignInFormData = {
    email: '',
    password: '',
}

type SignInFormProps = {
    onSignIn: (data: SignInFormData) => string | undefined
}

export default function SignInForm({ onSignIn }: SignInFormProps) {
    const [signInData, setSignInData] = useState(DEFAULT_SIGN_IN_DATA)
    const [errMsg, setErrMsg] = useState(DEFAULT_SIGN_IN_ERR)
    const updateFields = (fields: Partial<SignInFormData>) => setSignInData(prev => {
        return { ...prev, ...fields }
    })
    const { steps, step, currentStepIndex, isFirstStep, isLastStep, back, next } =
        useMultistepForm(
            [<EmailFormStep {...signInData} error={errMsg} updateFields={updateFields} />,
            <PasswordFormStep {...signInData} error={errMsg} updateFields={updateFields} />]
        )
    const onFormSubmit = (e: FormEvent) => {
        e.preventDefault()
        if (!isLastStep) return next()
        // which of the components should be responsible for
        // page redirects and credential validation?
        setErrMsg(onSignIn(signInData))
    }

    return <div
        style={{
            // position: "relative",
            background: "white",
            border: "1px solid black",
            padding: "2rem",
            margin: "1rem",
            borderRadius: ".5rem",
            fontFamily: 'serif',
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            outline: "3px solid #4287f5"
        }}>
        <Form onSubmit={onFormSubmit}>
            <div style={{ position: "absolute", top: ".5rem", right: ".5rem" }}>
                {currentStepIndex + 1} / {steps.length}
            </div>
            {step}
            <div
                style={{
                    marginTop: "1rem",
                    display: "flex",
                    gap: ".5rem",
                    justifyContent: "flex-end"
                }}>
                {!isFirstStep && <Button type='button' onClick={back}>Back</Button>}
                <Button type='submit'>
                    {isLastStep ? "Sign in" : "Next"}
                </Button>
            </div>
        </Form>
    </div>
}
