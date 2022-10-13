import { FormEvent, useState } from 'react'
import AccountForm from './AccountForm'
import AddressForm from './AddressForm'
import useMultistepForm from './useMultistepForm'
import UserForm from './UserForm'

interface FormData {
  firstName: string
  lastName: string
  age: string
  email: string
  password: string
  city: string
  address: string
  zip: string
}

const INITIAL_FORM_DATA: FormData = {
  firstName: '',
  lastName: '',
  age: '',
  email: '',
  password: '',
  city: '',
  address: '',
  zip: ''
}

function App() {
  const [formData, setFormData] = useState(INITIAL_FORM_DATA)
  const { steps, step, currentStepIndex, isFirstStep, isLastStep, back, next } =
    useMultistepForm([<UserForm />, <AddressForm />, <AccountForm />])

  const onFormSubmit = (e: FormEvent) => {
    e.preventDefault()
    next()
  }

  return <div
    style={{
      position: "relative",
      background: "white",
      border: "1px solid black",
      padding: "2rem",
      margin: "1rem",
      borderRadius: ".5rem",
      fontFamily: 'serif'
    }}>

    <form onSubmit={onFormSubmit}>
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
        {!isFirstStep && <button type='button' onClick={back}>Back</button>}
        <button type='submit' onClick={next}>
          {isLastStep ? "Finish" : "Next"}
        </button>
      </div>
    </form>
  </div>
}

export default App
