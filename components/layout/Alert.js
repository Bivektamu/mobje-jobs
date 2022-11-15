import React, { useEffect, useState } from 'react'
import { useStore } from '../context'
export const Alert = () => {

  const [state, dispatch] = useStore()

  const [alert, setAlert] = useState('')

  const {error} = state



  useEffect(() => {
    setAlert(error)
  }, [error])


  if(error) {
    setTimeout(() => {
      dispatch({
        type:'ERROR_HANDLED'
      })
    }, 2000);
  }

  return (
    <div>{alert}</div>    
  )
}
