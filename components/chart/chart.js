import { Badge, Box, Flex, Heading, SimpleGrid, Text } from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import {
    Bar, BarChart, CartesianGrid, Cell, Pie, PieChart, ResponsiveContainer, Tooltip, XAxis,
    YAxis
} from 'recharts';
import { HeadingTitle } from '../base';
import { genLangData, genStarPerLang } from './utils';

export const Chart = ({ id, allRepo }) => {

    const [langChartData, setLangChartData] = useState(null);
    const [starChartData, setStarChartData] = useState(null);
    const [starPerLangData, setStarPerLangData] = useState(null);

    useEffect(() => {
        getRepoData();
        getStarRepoData()
        getStarPerLang()
    }, [allRepo])

    const getRepoData = () => {
        if (allRepo && allRepo.length > 0) {
            setLangChartData(genLangData(allRepo))
        } else {
            console.error('Failed useSWR [chart')
        }

    };
    const getStarRepoData = () => {
        const LIMIT = 5;
        const sortProperty = 'stargazers_count'
        if (allRepo && allRepo.length > 0) {
            const sorted = allRepo
                .filter(repo => !repo.fork)
                .sort((a, b) => b[sortProperty] - a[sortProperty])
                .map((obj) => {
                    const { stargazers_count, ...rest } = obj
                    return { ...rest, stars: stargazers_count }
                })
                .slice(0, LIMIT);
            setStarChartData(sorted)
        } else {
            console.error('Failed to load repoData');
        }
    }

    //     const mostStarredRepos = repoData
    //         .filter(repo => !repo.fork)
    //         .sort((a, b) => b[sortProperty] - a[sortProperty])
    //         .slice(0, 5)
    //     const promises = mostStarredRepos.map((repo) =>
    //         fetch(`https://api.github.com/repos/${id}/${repo.name}`)
    //             .then((response) => {
    //                 if (response.status === 404) {
    //                     return setError({ active: true, type: 404 });
    //                 }
    //                 if (response.status === 403) {
    //                     return setError({ active: true, type: 403 });
    //                 }
    //                 console.log('repos [chart]')
    //                 return response.json()
    //             })
    //             .catch((error) => {
    //                 setError({ active: true, type: 200 });
    //                 console.error('Error:', error);
    //             })
    //     );

    //     const data = await Promise.all(promises);
    //     setStarChartData(data)
    //     return data;
    // };

    const getStarPerLang = async () => {
        if (allRepo && allRepo.length > 0) {
            const mostStarredRepos = allRepo.filter(repo => !repo.fork)
            setStarPerLangData(genStarPerLang(mostStarredRepos))
        } else {
            console.error('Failed to load repoData');
        }

    }

    return (
        <SimpleGrid columns={{ base: 1, md: 2, xl: 3 }} spacing={3} my={12}>
            <Box w={'24em'} maxW={'32em'} p={1} m={'0 auto'} bg={'#011627'} borderRadius={'lg'} py={4}>
                <HeadingTitle title='top languages' />
                <Flex height={300} align='center' justify={'center'} gap={2} px={2}>
                    <LangChart data={langChartData} />
                    <Flex direction='column' gap={1} >
                        {langChartData && langChartData.length > 0 && langChartData.map((item, index) => (
                            <Badge key={index} fontSize={{ base: 'sm', md: 'md' }} bgColor={item.color} align='center'>{item.name}</Badge>
                        ))}
                    </Flex>
                </Flex>
            </Box>
            <Box w={'24em'} maxW={'32em'} p={1} m={'0 auto'} bg={'#011627'} borderRadius={'lg'} py={4}>
                <HeadingTitle title='most starred' />
                <Flex height={300} align='center' mt={1} justify={'center'} >
                    <StarChart data={starChartData} />
                </Flex>
            </Box>
            <Box w={'24em'} maxW={'32em'} p={1} m={'0 auto'} bg={'#011627'} borderRadius={'lg'} py={4}>
                <HeadingTitle title='stars per language' />
                <Flex height={300} align='center' justify={'center'} gap={2} px={2}>
                    <StarPerLangChart data={starPerLangData} />
                    <Flex direction='column' gap={1}>
                        {starPerLangData && starPerLangData.length > 0 && starPerLangData.map((item, index) => (
                            <Badge key={index} fontSize={{ base: 'sm', md: 'md' }} bgColor={item.color} align='center'>{item.name}</Badge>
                        ))}
                    </Flex>
                </Flex>
            </Box>

        </SimpleGrid>


    );
}

const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length > 0) {
        return (
            <Box className="custom-tooltip" w={'240px'} border={0} p={4} m={0} lineHeight={8} bgColor={'#1a202c'}>
                <Heading className="label" size={'md'} letterSpacing={2} textTransform={'uppercase'} color={'#1DB954'}>{`${label}`}</Heading>
                <Text className="intro" fontSize={'md'} letterSpacing={1} color={'#1DB954'}>{`Stars: ${payload[0].payload.stars}`}</Text>
            </Box>
        )

    }
}

const CustomTooltipLangChart = ({ active, payload, label }) => {
    if (active && payload && payload.length > 0) {
        return (
            <Box className="custom-tooltip" w={'240px'} border={0} p={4} m={0} lineHeight={8} bgColor={'#1a202c'}>
                <Heading className="label" size={'md'} letterSpacing={2} textTransform={'uppercase'} color={'#1DB954'}>{`${payload[0].name}`}</Heading>
                <Text className="intro" fontSize={'md'} letterSpacing={1} color={'#1DB954'}>{`Repos: ${payload[0].value}`}</Text>
            </Box>
        )

    }
}


const LangChart = ({ data }) => {
    return (
        <ResponsiveContainer width="60%" height="100%" border='1px'>
            <PieChart width={200} height={200}>
                <Pie
                    dataKey="value"
                    isAnimationActive={false}
                    data={data}
                    cx="50%"
                    cy="50%"
                    outerRadius={80}
                    fill="#8884d8"
                    label
                >
                    {data && data.map((entry, index) => {
                        return (
                            <Cell key={`cell-${index}`} fill={entry.color} />
                        )
                    })}
                    {/* {data.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORSs[index]} />
                    ))} */}
                </Pie>
                <Tooltip content={<CustomTooltipLangChart />} />
            </PieChart >
        </ResponsiveContainer>
    )
}


const StarChart = ({ data }) => {
    return (
        <ResponsiveContainer width="100%" height="100%">
            <BarChart
                width={500}
                height={300}
                data={data}
                margin={{
                    top: 5,
                    right: 30,
                    left: 5,
                    bottom: 5,
                }}
            >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey='name' angle='-25' height={50} interval={0} dy={10} />
                <YAxis />
                <Tooltip content={<CustomTooltip />} />
                {/* <Legend /> */}
                <Bar dataKey='stars' fill="#8884d8" minPointSize={5}>
                    {/* <LabelList dataKey='name' content={renderCustomizedLabel} /> */}
                </Bar>
                {/* <Bar dataKey="uv" fill="#82ca9d" minPointSize={10} /> */}
            </BarChart>
        </ResponsiveContainer>
    )
}

const StarPerLangChart = ({ data }) => {
    return (
        <ResponsiveContainer width="60%" height="100%" border='1px'>
            <PieChart width={200} height={200}>
                <Pie
                    data={data}
                    cx="50%"
                    cy="50%"
                    innerRadius={45}
                    outerRadius={80}
                    fill="#8884d8"
                    // paddingAngle={4}
                    dataKey="starTotal"
                // label
                >
                    {data && data.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                </Pie>
                <Tooltip content={<CustomTooltipLangChart />} />
            </PieChart>
        </ResponsiveContainer>

    );
}