import { useState, useEffect } from 'react'
import { withRouter, useRouter } from 'next/router'
import { Container, Box, Avatar, Flex, Tag, TagLabel, SimpleGrid, Heading, Text, Stack, TagLeftIcon, Select, Grid, GridItem } from '@chakra-ui/react'
import { useUser } from '../../components/helper/help'
import { CalendarIcon } from '@chakra-ui/icons'
import { ProfileLabel } from '../../components/base'
import RateLimit from '../../components/ratelimit'
import Corner from '../../components/octoSign'
// import mockRepoData from '../utils/mockRepoData'

import { Chart } from '../../components/chart/chart'
import Repos from '../../components/repos'

const User = (props) => {
    const url = `https://api.github.com/users/`


    const [repoData, setRepoData] = useState(null)
    const router = useRouter()
    const { id } = router.query
    const { userSWR: data, isLoading, isError, request } = useUser(url, id)
    const rateLimit = request.rate
    console.log(data)
    console.log(request)
    console.log(props)

    // const user = JSON.parse(props.router.query.data)
    // const [userData, setUserData] = useState({})

    // useEffect(() => {
    //     setUserData(user);
    // }, []);

    const options = { year: 'numeric', month: 'short', day: 'numeric' };
    const dateJoined = new Date(data?.created_at).toLocaleDateString('en-US', options);

    return (
        <>
            {rateLimit && <RateLimit rateLimit={rateLimit} />}
            <Corner />
            <Container maxW='container.xl' p={1}>
                <Flex direction={{ base: 'column', lg: 'row' }} gap={4}>
                    <Flex flex='1' border='1px ' justify={'center'} >
                        <Flex direction={'column'} align={'center'} gap={3}>
                            <Avatar size='2xl' alt={data?.login} src={data?.avatar_url} />
                            <Tag size={'lg'} variant='subtle' colorScheme='cyan'>
                                @{data?.login}
                            </Tag>
                            <Tag size={'md'} >
                                <TagLeftIcon boxSize='12px' as={CalendarIcon} />
                                <TagLabel>Joined {dateJoined}</TagLabel>
                            </Tag>
                            <Text fontSize={'sm'}></Text>
                            <Flex gap={3}>
                                <ProfileLabel title={data?.public_repos} des='repositories' />
                                <ProfileLabel title={data?.following} des='following' />
                                <ProfileLabel title={data?.followers} des='followers' />
                            </Flex>
                        </Flex>
                    </Flex>
                    <Stack flex='3' border='1px'>
                        <SimpleGrid columns={3} spacing={3}>

                            <Box border={'1px solid '} height={200}></Box>
                            <Box border={'1px solid '} height={200}></Box>
                            <Box border={'1px solid '} height={200}></Box>
                        </SimpleGrid>
                    </Stack>
                </Flex>
                {/* <Chart id={id} /> */}
                <Box>
                    <Flex gap={4}>
                        <Heading>TOP REPOS</Heading>
                        <Select variant='filled' placeholder='Filled' w={40} />
                    </Flex>
                    <Repos />
                </Box>

            </Container>
        </>
    )
}

export default withRouter(User)