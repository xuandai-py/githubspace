import NextLink from 'next/link'
import { useState, useEffect } from 'react'
import { withRouter, useRouter as router } from 'next/router'
import { Container, Box, Button, Flex, Tag, TagLabel, SimpleGrid, Heading, Text, Icon, Stack, TagLeftIcon, Link, Grid, GridItem, Center, Image, Badge, Divider } from '@chakra-ui/react'
import { useUser } from '../../components/helper/help'
import useSWR from 'swr'
import { VscCalendar, VscLocation, VscTarget, VscGlobe, VscReply } from 'react-icons/vsc'
import { HeadingTitle, ProfileLabel } from '../../components/base'
import RateLimit from '../../components/ratelimit'
import Corner from '../../components/octoSign'
import { Chart } from '../../components/chart/chart'
import Repos from '../../components/repos'
import Cookies from 'js-cookie'

const User = () => {
    const id = Cookies.get('userId')

    const { userSWR: data, isLoading, isError, request } = useUser(`https://api.github.com/users/`, id)
    const { data: allRepo } = useSWR(`https://api.github.com/users/${id}/repos?per_page=100`);
    const { data: userEvent } = useSWR(`/api/hello?id=${id}`)

    // useEffect(() => { data, allRepo, userEvent }, [])

    const rateLimit = request.rate
    const options = { year: 'numeric', month: 'short', day: 'numeric' };
    const dateJoined = new Date(data?.created_at).toLocaleDateString('en-US', options);
    return (
        <>
            {rateLimit && <RateLimit rateLimit={rateLimit} />}
            <Box align="center" position={'fixed'} right={1} bottom={5} zIndex={100}>
                <Link as={NextLink} href="/"  >
                    <Icon as={VscReply} color={'grey.100'} boxSize={'28px'}/>
                </Link>
            </Box>
            {/* <Corner /> */}
            {data ?
                <Container maxW='container.xl' p={5} >
                    <Flex direction={{ base: 'column', lg: 'row' }} gap={4}>
                        <Flex flex='1' justify={'center'} >
                            <Flex direction={'column'} align={'center'} gap={3}>
                                <Box position={'relative'}>
                                    <Image boxSize={8} alt={data.login} position={'absolute'} bottom={3} right={8} src={`https://res.cloudinary.com/dxhl09emw/image/upload/v1677746843/radio/Frame_16_kqw1wj.svg`} borderRadius={'100%'} border={'3px solid #000'} />
                                    <Image boxSize={56} alt={data.login} src={data.avatar_url} borderRadius={'100%'} border={'8px solid #1DB954'} />
                                </Box>
                                <Tag size={'lg'} variant='subtle' colorScheme='cyan'>
                                    <Link as={NextLink} href={data.html_url} target='_blank' >
                                        @{data.login}
                                    </Link>
                                </Tag>
                                <Center>
                                    <Flex direction={{ base: 'row', lg: 'column' }} px={4} align={'center'} gap={{ base: 1, sm: 3 }} flexWrap={'wrap'}>
                                        {data.company &&
                                            <Tag size={'md'} >
                                                <TagLeftIcon boxSize='20px' as={VscTarget} />
                                                <TagLabel>{data.company}</TagLabel>
                                            </Tag>
                                        }
                                        {data.company &&
                                            <Tag size={'md'} >
                                                <TagLeftIcon boxSize='20px' as={VscLocation} />
                                                <TagLabel>{data.location}</TagLabel>
                                            </Tag>
                                        }
                                        {data.company &&
                                            <Tag size={'md'} >
                                                <TagLeftIcon boxSize='20px' as={VscGlobe} />
                                                <TagLabel>{data.blog}</TagLabel>
                                            </Tag>
                                        }
                                        <Tag size={'md'} >
                                            <TagLeftIcon boxSize='20px' as={VscCalendar} />
                                            <TagLabel>Joined {dateJoined}</TagLabel>
                                        </Tag>
                                        <Text fontSize={'sm'}></Text>
                                    </Flex>
                                </Center>
                                <Flex gap={3}>
                                    <ProfileLabel title={data.public_repos} des='repositories' />
                                    <ProfileLabel title={data.following} des='following' />
                                    <ProfileLabel title={data.followers} des='followers' />
                                </Flex>
                            </Flex>
                        </Flex>
                        <Stack flex='3' pl={2} gap={4}>
                            <SimpleGrid columns={[1, 2, 3, 3]} spacing={3}>
                                {userEvent && userEvent.achievements && userEvent.achievements.length > 0
                                    ?
                                    userEvent.achievements.map((item, index) => (
                                        <Flex key={index} border={'1px solid #9ea7b3'} gap={4} align={'center'} py={4} borderRadius={'md'} direction={'column'}>
                                            <Image boxSize={28} objectFit={'cover'} src={item.cover} alt={item.title}/>
                                            <Flex direction={'row'} gap={2} pt={1} align={'center'} borderTop={'1px'} >
                                                <Heading size={{ base: 'sm', lg: 'md' }}>{item.title}</Heading>
                                                {item.number_at_achievement && <Badge variant={'outline'} borderRight={'2px'} borderBottom={'2px'} colorScheme='green'>{item.number_at_achievement}</Badge>}
                                            </Flex>
                                        </Flex>
                                    ))
                                    :
                                    <HeadingTitle title='No achievement here.' />
                                }
                            </SimpleGrid>
                            <Flex w={'auto'} direction='column' gap={3} border={'1px solid #9ea7b3'} p={4} borderRadius={'md'} >
                                <HeadingTitle title='contributions' />
                                <Image src={userEvent && userEvent.contributions} alt='contributions' />
                            </Flex>
                        </Stack>
                    </Flex>
                    <Chart id={id} allRepo={allRepo} />
                    <Repos id={id} repoData={allRepo} />

                </Container>
                :
                <Flex height='100vh' alignItems='center' justifyContent='center' pb='10'>
                    <Flex direction='column' alignItems='center' backgroundColor={'gray.800'} p={12} rounded={6} gap={6}>
                        <Image src='/github-octocat.svg' width={100} height={100} />
                        <Heading textTransform={'uppercase'}>nothing to show here!!!</Heading>
                        <Button size={'lg'} as={NextLink} href="/" textTransform={'uppercase'}>get back</Button>
                    </Flex>
                </Flex>
            }
        </>
    )
}

export default withRouter(User)