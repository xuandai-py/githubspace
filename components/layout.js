import { Box, Container } from '@chakra-ui/react'
import Head from 'next/head'
import Footer from './footer'
import Corner from './octoSign'

const Main = ({ children }) => {
    return (
        <Box as="main" >
            <Head>
                <meta name="viewport" content="width=device-width, initial-scale=1" />
                <meta name="description" content="Github profile" />
                <meta name="author" content="xuandai" />
                <meta name="author" content="hermitcrab" />
                <link rel="icon" type="image/x-icon" href="https://res.cloudinary.com/dxhl09emw/image/upload/v1677746843/radio/Frame_16_kqw1wj.svg"></link>
                <meta property="og:site_name" content="Github profile" />
                <meta name="og:title" content="Github profile" />
                <meta property="og:type" content="website" />
                <title>Github profile</title>
            </Head>

            <Corner />

            <Container maxW='container.xl' px={1}>
                {children}
                <Footer />
            </Container>
        </Box>
    )
}

export default Main