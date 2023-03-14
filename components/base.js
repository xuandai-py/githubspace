import {Stack, Heading, Text} from '@chakra-ui/react'

export const ProfileLabel = ({ title, des }) => (
    <Stack
        direction={'column'}
        align='center'
        bg={'rgb(36, 41, 46)'}
        borderRadius='md'
        p={3}
    >
        <Heading size={'md'}>{title}</Heading>
        <Text fontSize={'xs'} textTransform={'uppercase'}>{des}</Text>
    </Stack>
)