import '../styles/globals.css'
import { ChakraProvider } from '@chakra-ui/react'
import { SWRConfig } from 'swr'
import axios from 'axios'


function MyApp({ Component, pageProps }) {

  // const fetcher = (...args) => axios.get(...args).then(res => res.json())
  // const fetcher = (...args) => fetch(...args).then(res => res.json())
  const fetcher = async (...args) => {
    const res = await fetch(...args)
    return res.json();
  };

  const globalConfig = {
    fetcher,
    localStorageProvider,
    refreshInterval: 1000,
    revalidateOnFocus: false,
    revalidateOnReconnect: false,
    shouldRetryOnError: false,
  };

  function localStorageProvider() {
    // When initializing, we restore the data from `localStorage` into a map.
    const map = new Map(JSON.parse(localStorage.getItem('app-cache') || '[]'))

    // Before unloading the app, we write back all the data into `localStorage`.
    window.addEventListener('beforeunload', () => {
      const appCache = JSON.stringify(Array.from(map.entries()))
      localStorage.setItem('app-cache', appCache)
    })

    // We still use the map for write & read for performance.
    return map
  }
  return (
    <SWRConfig value={globalConfig}>
      <ChakraProvider>
        <Component {...pageProps} />
      </ChakraProvider>
    </SWRConfig>
  )

}

export default MyApp
