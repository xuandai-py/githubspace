import {
    PieChart, Pie, Sector, Tooltip, ResponsiveContainer,
    BarChart,
    Bar,
    Cell,
    XAxis,
    YAxis,
    CartesianGrid,
    Legend,
    LabelList,
    LineChart,
    Line
} from 'recharts';
import { useState, useEffect, } from 'react'
import { SimpleGrid, Box, Flex, Badge, VStack } from '@chakra-ui/react';
import { pickChakraRandomColor } from '../helper/help';
import { genLangData, genStarPerLang, renderCustomizedLabel } from './utils';
import useSWR from 'swr'

export const Chart = (props) => {
    const { id } = props

    const { data: allRepo } = useSWR(`https://api.github.com/users/${id}/repos?per_page=100`);
    // const { data: products } = useSWR(`https://api.github.com/repos/${id}/${repo}`);

    // const [url, setUrl] = useState('')
    // Create chart with langData
    const [repoData, setRepoData] = useState([]);
    const [langChartData, setLangChartData] = useState(null);
    const [starChartData, setStarChartData] = useState(null);
    const [starPerLangData, setStarPerLangData] = useState(null);

    const [error, setError] = useState(null)
    const [activeIndex, setActiveIndex] = useState(0)

    useEffect(() => {
        allRepo
        getRepoData();
    }, [id])

    useEffect(() => {
        // fetchData()
        getStarPerLang()
    }, [id, repoData])

    const getRepoData = () => {
        // setUrl(url)
        if (allRepo) {
            setLangChartData(genLangData(allRepo))
            setRepoData(allRepo)
        } else {
            console.log('Failed useSWR')
        }

    };
    // const getRepoData = () => {
    //     fetch(`https://api.github.com/users/${id}/repos?per_page=100`)
    //         .then(response => {
    //             if (response.status === 404) {
    //                 return setError({ active: true, type: 404 });
    //             }
    //             if (response.status === 403) {
    //                 return setError({ active: true, type: 403 });
    //             }
    //             return response.json()
    //         })
    //         .then(data => {
    //             setLangChartData(genLangData(data))
    //             setRepoData(data)
    //         })
    //         .catch(error => {
    //             setError({ active: true, type: 200 })
    //             console.error('Error:', error)
    //         })
    // };

    const fetchData = async () => {
        const sortProperty = 'stargazers_count';
        const mostStarredRepos = repoData
            .filter(repo => !repo.fork)
            .sort((a, b) => b[sortProperty] - a[sortProperty])
            .slice(0, 5);
        const promises = mostStarredRepos.map((repo) =>
            fetch(`https://api.github.com/repos/${id}/${repo.name}`)
                .then((response) => {
                    if (response.status === 404) {
                        return setError({ active: true, type: 404 });
                    }
                    if (response.status === 403) {
                        return setError({ active: true, type: 403 });
                    }
                    console.log('repos')
                    return response.json();
                })
                .catch((error) => {
                    setError({ active: true, type: 200 });
                    console.error('Error:', error);
                })
        );

        const data = await Promise.all(promises);
        setStarChartData(data)
        return data;
    };

    const getStarPerLang = async () => {
        const mostStarredRepos = repoData.filter(repo => !repo.fork)
        const promises = mostStarredRepos.map((repo) =>
            fetch(`https://api.github.com/repos/${id}/${repo.name}`)
                .then((response) => {
                    if (response.status === 404) {
                        return setError({ active: true, type: 404 });
                    }
                    if (response.status === 403) {
                        return setError({ active: true, type: 403 });
                    }
                    console.log('repos')
                    return response.json()
                })
                .catch((error) => {
                    setError({ active: true, type: 200 })
                    console.error('Error:', error);
                })
        );

        const data = await Promise.all(promises);
        setStarPerLangData(genStarPerLang(data))
        console.log('Fetch: ', data)
        return data;
    }


    console.log(starPerLangData);

    return (
        <SimpleGrid columns={3} spacing={3}>

            <Flex border='1px solid red' height={300} align='center'>
                <LangChart data={langChartData} />
                <Flex direction='column' gap={1}>
                    {langChartData && langChartData.length > 0 && langChartData.map((item, index) => (
                        <Badge key={index} fontSize='md' bgColor={item.color} align='center'>{item.name}</Badge>
                    ))}
                </Flex>
            </Flex>
            <Box height={300}>
                <StarChart data={starChartData} />
            </Box>
            <Flex border='1px solid red' height={300} align='center'>

                <StarPerLangChart2 data={starPerLangData} />
                <Flex direction='column' gap={1}>
                    {starPerLangData && starPerLangData.length > 0 && starPerLangData.map((item, index) => (
                        <Badge key={index} fontSize='md' bgColor={item.color} align='center'>{item.name}</Badge>
                    ))}
                </Flex>
            </Flex>

        </SimpleGrid>


    );
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
                <Tooltip />

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
                    left: 20,
                    bottom: 5,
                }}
            >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey='name' />
                <YAxis />
                <Tooltip />
                {/* <Legend /> */}
                <Bar dataKey='stargazers_count' fill="#8884d8" minPointSize={5}>
                    <LabelList dataKey='name' content={renderCustomizedLabel} />
                </Bar>
                {/* <Bar dataKey="uv" fill="#82ca9d" minPointSize={10} /> */}
            </BarChart>
        </ResponsiveContainer>
    )
}


const StarPerLangChart = ({ data }) => {
    return (
        <ResponsiveContainer width="100%" height="100%">
            <LineChart
                width={500}
                height={300}
                data={data}
                margin={{
                    top: 5,
                    right: 30,
                    left: 20,
                    bottom: 5,
                }}
            >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="language" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line type="monotone" name='s' dataKey="starTotal" stroke="#82ca9d" activeDot={{ r: 8 }} />
                {/* <Line type="monotone" dataKey="uv" stroke="#82ca9d" /> */}
            </LineChart>
        </ResponsiveContainer>
    )
}

// const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];
const COLORS = [
    'red',
    'orange',
    'yellow',
    'green',
    'teal',
    'blue',
    'cyan',
    'purple',
    'pink',
];




const StarPerLangChart2 = ({ data }) => {
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
                <Tooltip />
            </PieChart>
        </ResponsiveContainer>

    );
}