import React, { useEffect, useState } from 'react'
import { useStore } from '../context'
export const Alert = () => {

  const [state, dispatch] = useStore()

  const [alertUi, setAlertUi] = useState('')

  const {alert} = state



  useEffect(() => {
    setAlertUi(alert)
  }, [alert])


  if(alert) {
    setTimeout(() => {
      dispatch({
        type:'ERROR_HANDLED'
      })
    }, 500);
  }

  return (
    <div>{alertUi}</div>    
  )
}
