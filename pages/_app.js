import { StoreProvider } from '../components/context'
import { Alert } from '../components/layout/Alert'
import '../styles/globals.css'

function MyApp({ Component, pageProps }) {
  return (
    <StoreProvider>
      <Alert />
      <Component {...pageProps} />
    </StoreProvider>
  ) 
  
}

export default MyApp
