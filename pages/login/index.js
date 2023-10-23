import React, {useEffect, useState} from 'react'
import { useStore } from '../../components/context'
// import { logInUser } from '../../components/context/actions/UserActions'
import {useSession, signIn} from 'next-auth/react'


export default function LogIn() {

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const [state, dispatch] = useStore()
  const { data: session, status } = useSession()
  useEffect(() => {
    console.log(session)
  
  }, [session, status])

  const onSubmit = async (e) => {
    e.preventDefault()
    const formFields = {email, password}
 
    try {
      const res = await signIn('credentials', {...formFields, redirect: false})
      if(res.error) {
        throw new Error(res.error)
      }
      console.group(res)

    } catch (error) {
      console.log(error.message)
    }

    // 
    // const res = await logInUser(formFields)
    // if(res && res.user) {
    //   dispatch({
    //     type: 'LOGGED_IN',
    //     payload: res.user
    //   })
    // }
    // else {
    //   dispatch({
    //     type: 'USER_ERROR',
    //     payload: res.error
    //   })
    // }

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
