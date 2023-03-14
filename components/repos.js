import React, { useState, useEffect } from 'react';
// import PropTypes from 'prop-types';
import Octicon, { Repo, Star, RepoForked, TriangleDown } from '@primer/octicons-react';
import FlipMove from 'react-flip-move';
import { langColors } from '../utils';
import ReposStyles from './styles/ReposStyles';
import DropdownStyles from './styles/DropdownStyles';
import { Section } from '../style';
import { Heading, Select } from '@chakra-ui/react';

const Repos = ({ repoData }) => {
    const [topRepos, setTopRepos] = useState([]);
    const [sortType, setSortType] = useState('stars');
    const [dropdownOpen, setDropdownOpen] = useState(false);

    const getTopRepos = type => {
        const LIMIT = 8;
        const map = {
            stars: 'stargazers_count',
            forks: 'forks_count',
            size: 'size',
        };
        const sortProperty = map[type];
        const sorted = repoData
            .filter(repo => !repo.fork)
            .sort((a, b) => b[sortProperty] - a[sortProperty])
            .slice(0, LIMIT);

        setTopRepos(sorted);
    };

    useEffect(() => {
        if (repoData.length) {
            getTopRepos();
        }
    }, []);

    useEffect(() => getTopRepos(sortType), [sortType]);

    const toggleDropdown = () => setDropdownOpen(!dropdownOpen);

    const changeRepoSort = sortType => {
        setSortType(sortType);
        toggleDropdown();
    };

    const sortTypes = ['stars', 'forks', 'size'];


    return (
        <Box>
            <Flex>
                <Heading>top repos</Heading>
                <Select variant={'filled'} w={40} />
            </Flex>
            <Box>
                <SimpleGrid columns={[1,2,3,4]} spacing={10}>
                    <Box bg='tomato' height='80px'></Box>
                    <Box bg='tomato' height='80px'></Box>
                    <Box bg='tomato' height='80px'></Box>
                    <Box bg='tomato' height='80px'></Box>
                    <Box bg='tomato' height='80px'></Box>
                </SimpleGrid>
            </Box>
        </Box>
    )
};

Repos.propTypes = {
    repoData: PropTypes.array.isRequired,
};

export default Repos;