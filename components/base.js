import { Stack, Heading, Text } from '@chakra-ui/react'

export const ProfileLabel = ({ title, des }) => (
    <Stack
        direction={'column'}
        align='center'
        bg={'rgb(36, 41, 46)'}
        borderRadius='md'
        px={{base: 1, sm: 3}}
        py={2}
        justify='center'
    >
        <Heading size={{base: 'sm', md: 'md'}}>{title}</Heading>
        <Text fontSize={{base: '2xs', sm: 'sm'}} textTransform={'uppercase'}>{des}</Text>
    </Stack>
)

export const HeadingTitle = ({title}) => {
    
    const result = title.charAt(0).toUpperCase() + title.slice(1)
    return (
        <Heading w={'max-content'} size={'lg'} borderBottom='2px dashed ' pb={1} mx={4}>{result}</Heading>
    )
}