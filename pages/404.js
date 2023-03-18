import { Button, Flex, Heading, Image } from '@chakra-ui/react'
import NextLink from 'next/link'

const NotFound = () => {

    return (

        <Flex height='90vh' alignItems='center' justifyContent='center' pb='10'>
            <Flex direction='column' alignItems='center' backgroundColor={'gray.800'} p={12} rounded={6} gap={6}>
                <Image src='/github-octocat.svg' width={100} height={100} alt={'github-octocat'}/>
                <Heading textTransform={'uppercase'} size={{base: 'lg', md: 'xl'}}>nothing to show here!!!</Heading>
                <Button size={'lg'} as={NextLink} href="/" textTransform={'uppercase'}>get back</Button>
            </Flex>
        </Flex>
    )
}

export default NotFound