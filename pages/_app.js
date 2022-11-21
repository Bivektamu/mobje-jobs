import { StoreProvider } from '../components/context'
import { Alert } from '../components/layout/Alert'
import {SessionProvider} from 'next-auth/react'

import '../styles/globals.css'

function MyApp({ Component, pageProps: {session, ...pageProps} }) {
  return (
    <StoreProvider>
      <SessionProvider session={session}>
      <Alert />
      <Component {...pageProps} />
      </SessionProvider>
    </StoreProvider>
    
  ) 
  
}

export default MyApp
