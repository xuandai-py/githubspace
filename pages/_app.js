import { ChakraProvider } from '@chakra-ui/react'
import { SWRConfig } from 'swr'
import Layout from '../components/layout'
import '../styles/globals.css'


function MyApp({ Component, pageProps }) {

  // const fetcher = (...args) => axios.get(...args).then(res => res.json())
  // const fetcher = (...args) => fetch(...args).then(res => res.json())
  const fetcher = async (...args) => {
    const res = await fetch(...args)
    if (!res.ok) {
      const error = new Error('An error occurred while fetching the data.')
      // Attach extra info to the error object.
      error.info = await res.json()
      error.status = res.status
      throw error
    }

    return res.json()
  };

  const globalConfig = {
    fetcher,
    refreshInterval: 10000,
    revalidateOnFocus: false,
    revalidateOnReconnect: false,
    shouldRetryOnError: false,
  };


  return (
    <SWRConfig value={globalConfig}>
      <Layout>
        <ChakraProvider>
          <Component {...pageProps} />
        </ChakraProvider>
      </Layout>
    </SWRConfig>
  )

}

export default MyApp
