import Dashboard from './components/dashboard/Dashboard'
import SignInForm, { SignInFormData } from './components/loginForm/SignInForm'
import AccountProvider from './contexts/AccountProvider'
import ContactsProvider from './contexts/ContactsProvider'
import useLocalStorage from './hooks/useLocalStorage'
import 'bootstrap/dist/css/bootstrap.min.css'

const DEFAULT_ID = ""
const idFound = (id: string) => id !== DEFAULT_ID

function App() {
  const [id, setId] = useLocalStorage("user-id", DEFAULT_ID)
  // id is stored in local storage
  // in case it was not found, ask user to login
  const onSignIn = (d: SignInFormData): string | undefined => {
    // do some validation/fetch data there
    // return a message string on error
    console.log(`Set id: ${d}`)
    setId(d.email)
    return undefined
  }
  if (!idFound(id)) return <SignInForm onSignIn={onSignIn} />
  // Another thing to think of is storage cleanup on logouts
  // which can be achieved with useEffect
  return (
    <AccountProvider id={id}>
      <ContactsProvider id={id}>
        <Dashboard id={id} />
      </ContactsProvider>
    </AccountProvider>
  )
}

export default App
