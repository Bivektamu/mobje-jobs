import React, {useEffect, useState} from 'react'
import { useStore } from '../../components/context'
import { logInUser } from '../../components/context/actions/UserActions'



export default function LogIn() {

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const [state, dispatch] = useStore()


  useEffect(() =>{
    console.log(state)
  }, [state])


  const onSubmit = async (e) => {
    e.preventDefault()
    const formFields = {email, password}
    const res = await logInUser(formFields)
    if(res && res.user) {
      dispatch({
        type: 'LOGGED_IN',
        payload: res.user
      })
    }
    else {
      dispatch({
        type: 'USER_ERROR',
        payload: res.error
      })
    }

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
