import React, {useEffect, useState} from 'react'
import { useStore } from '../../components/context'
import { addUser, deletaAll } from '../../components/context/actions/UserActions'
import { useRouter } from 'next/navigation';


export default function SignUp() {

  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const { push } = useRouter();
  const[state, dispatch] = useStore();

  useEffect(()=>{

    async function deleteAll() {

    const res = await deletaAll()
    if(res) {
      dispatch({
        type: 'ALL_USER_DELETED',
        payload: res.user
      })
    }
    else {
      console.log(res)
      dispatch({
        type: 'USER_ERROR',
        payload: res.error
      })
    }
  }

  // deleteAll()

  }, [])

  const onSubmit = async (e) => {
    e.preventDefault()

    const formFields = {firstName, lastName, email, password}

    const res = await addUser(formFields)


    if(res && res.user) {
      dispatch({
        type: 'USER_ADDED',
        payload: res.user
      })

      push('/login')
    }
    else {
      console.log(res)
      dispatch({
        type: 'USER_ERROR',
        payload: res.error
      })


    }
  }

  return (
    <section id="form_wrapper">
      <h1>Sign Up</h1>

      <form onSubmit = {(e) => onSubmit(e)}>
        <input type="text" name="First Name" placeholder='First Name' value={firstName} required onChange={(e) => setFirstName(e.target.value)} />
        <input type="text" name="Last Name" placeholder='Last Name'  value={lastName} required onChange={(e) => setLastName(e.target.value)} />
        <input type="email" name="Email" placeholder='Email'  value={email} required onChange={(e) => setEmail(e.target.value)} />
        <input type="password" name="password" placeholder='passord'  value={password} required onChange={(e) => setPassword(e.target.value)} />

        <input type="submit" name="Submit" value="Submit" />

      </form>

    </section>
  )
}
