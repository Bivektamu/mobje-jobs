import React, {useState} from 'react'
import { logInUser } from '../../components/context/actions/UserActions'



export default function LogIn() {

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')


  const onSubmit = async (e) => {
    e.preventDefault()
    const formFields = {email, password}
    const res = await logInUser(formFields)

  }

  return (
    <section id="form_wrapper">
      <h1>Log In</h1>

      <form onSubmit = {(e) => onSubmit(e)}>
        <input type="email" name="Email" placeholder='Email'  value={email} required onChange={(e) => setEmail(e.target.value)} />
        <input type="password" name="password" placeholder='passord'  value={password} required onChange={(e) => setPassword(e.target.value)} />

        <input type="submit" name="Submit" value="Submit" />

      </form>

    </section>
  )
}
