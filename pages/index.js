import { useRouter } from 'next/router'
import { Button, Flex, Heading, Input, useColorMode, useColorModeValue } from '@chakra-ui/react'
import Image from 'next/image'
import { useState } from 'react'
import axios from 'axios'

export default function Home() {
  const { toggleColorMode } = useColorMode()
  const formBackground = useColorModeValue('gray.100', 'gray.800')
  const [user, setUser] = useState('')
  const [userData, setUserData] = useState('')
  const router = useRouter()

 
  const handleKeyDown = () => {
    if (event.key === 'Enter') {
      // router.push({
      //   pathname: '/user',
      //   query: {user}
      // })
      fetchUserByName()
    }
  }

  const fetchUserByName = () => {
    axios.get('https://api.github.com/users/' + user)
      .then(res => {
        if (res.status === 404) {
            
          }
          const result = res.data
          console.log(result);
            //setUserData(result)
        })
        .then()
        .catch(err => console.error(err))
}

  return (
    <Flex height='100vh' alignItems='center' justifyContent='center'>
      <Flex direction='column' alignItems='center' backgroundColor={formBackground} p={12} rounded={6} gap={6}>
        <Image src='/github-octocat.svg' width={100} height={100} />
        <Heading size='xl' fontSize='2.2rem'>Find Your Github Space</Heading>
        <Input
          color='blue.200'
          backgroundColor='rgb(38,48,60)'
          outline='none'
          border='none'
          padding='2.2rem'
          size='md'
          fontSize='2.2rem'
          textAlign='center'
          fontWeight={400}
          onChange={e => setUser(e.target.value)}
          onKeyDown={handleKeyDown}
        />

        {/* <Button onClick={toggleColorMode}>color</Button> */}
      </Flex>
    </Flex>
  )
}
