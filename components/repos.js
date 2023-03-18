import React, { useState, useEffect, forwardRef } from 'react';
import PropTypes from 'prop-types';
import FlipMove from 'react-flip-move';
import { VscRepo, VscTerminalPowershell, VscRepoForked, VscStarEmpty } from 'react-icons/vsc'
import { Heading, Select, Box, Flex, SimpleGrid, Button, Text, HStack, Icon } from '@chakra-ui/react';
import { HeadingTitle } from './base';

const Repos = ({ repoData }) => {
    const [topRepos, setTopRepos] = useState([]);
    const [sortType, setSortType] = useState('stars');

    useEffect(() => {
        getTopRepos();
    }, [repoData]);

    useEffect(() => getTopRepos(sortType), [sortType]);

    const getTopRepos = (type = 'stars') => {
        const LIMIT = 8;
        const map = {
            stars: 'stargazers_count',
            forks: 'forks_count',
            size: 'size',
        };
        const sortProperty = map[type];
        if (repoData && repoData.length > 0) {
            const sorted = repoData
                .filter(repo => !repo.fork)
                .sort((a, b) => b[sortProperty] - a[sortProperty])
                .slice(0, LIMIT);
            setTopRepos(sorted);
        } else {
            console.error('Failed to load repoData');
        }
    };


    const sortTypes = ['stars', 'forks', 'size'];
    return (
        <Box my={12}>
            <Flex gap={4} align={'center'} mb={10}>
                <HeadingTitle title={'top repos'} />
                <Text fontSize={'sm'}>by</Text>
                <Select variant='filled' w={40} onChange={(e) => setSortType(e.target.value)} >
                    {sortTypes.map((item, index) => (
                        <option key={index} value={item}>{item}</option>
                    ))}
                </Select>
            </Flex>
            <Box>
                {topRepos.length > 0 ? (
                    <SimpleGrid columns={[1, 2, 3, 4]} spacing={4}>
                        {
                            topRepos.map((repo, index) => (
                                <FlipMove >
                                    <Repo key={repo.id} {...repo} />
                                </FlipMove>
                            ))
                        }
                    </SimpleGrid>
                )
                    :
                    (
                        <Heading size={'md'}>No available repositories!</Heading>
                    )
                }
            </Box>
        </Box>
    )
};

const Repo = forwardRef((props, ref) => (
    <Flex direction='column' h='100%' justify={'space-between'} p={4} bg='teal' borderRadius={'md'} ref={ref}>
        <Flex direction={'column'} gap={3} mb={5}>
            <HStack align={'center'}>
                <Icon as={VscRepo} />
                <Heading size={'sm'}>{props.name}</Heading>
            </HStack>
            <Text fontSize={'md'}>{props.description}</Text>
        </Flex>
        <Flex justify={'space-between'}>
            <Flex align={'center'} gap={2}>
                <Flex align={'center'} gap={1}>
                    {/* <Box w={2} h={2} bgColor='red' borderRadius={'100%'} /> */}
                    <Icon as={VscTerminalPowershell} />
                    <Text fontSize={'xs'}>{props.language}</Text>
                </Flex>
                <Flex align={'center'} gap={1}>
                    <Icon as={VscStarEmpty} />
                    <Text fontSize={'xs'}>{props.stargazers_count.toLocaleString()}</Text>
                </Flex>
                <Flex align={'center'} gap={1}>
                    <Icon as={VscRepoForked} />
                    <Text fontSize={'xs'}>{props.forks_count.toLocaleString()}</Text>
                </Flex>
            </Flex>
            <Text fontSize={'xs'}>{props.size.toLocaleString()} KB</Text>
        </Flex>
    </Flex>
))

Repos.propTypes = {
    repoData: PropTypes.array.isRequired,
};

export default Repos;