import React from 'react'
import { Box, Icon, Link, Text } from '@chakra-ui/react';
import NextLink from 'next/link';
import { HiOutlineHeart, HiOutlinePlusSm } from 'react-icons/hi';
const links = [
    {
        name: 'Next.js',
        link: 'https://nextjs.org/',
        target: '_blank',
        rel: 'noopener noreferrer'
    },
    {
        name: 'ChakraUI',
        link: 'https://chakra-ui.com/',
        target: '_blank',
        rel: 'noopener noreferrer'
    },
    {
        name: 'React Flip Move',
        link: 'https://joshwcomeau.github.io/react-flip-move/',
        target: '_blank',
        rel: 'noopener noreferrer'
    },
    {
        name: 'SWR',
        link: 'https://swr.vercel.app/',
        target: '_blank',
        rel: 'noopener noreferrer'
    },
    {
        name: 'Recharts',
        link: 'https://recharts.org/en-US',
        target: '_blank',
        rel: 'noopener noreferrer'
    },
]

const Footer = () => (
    <Box align={'center'} justify={'center'} mb={5}>
        <Text>Built with</Text>
        {links.map((link) => (
            <React.Fragment key={link.name}>
                <Link as={NextLink} href={link.link} target={link.target} rel={link.ref} color={'#1DB954'} mx={1}>
                    @{link.name}
                </Link>
                <Icon as={HiOutlinePlusSm} mx={1} boxSize={'10px'}/>
            </React.Fragment>
        ))}
        <Icon as={HiOutlineHeart} ml={1} mb={'-2px'} color={'#1DB954'} boxSize={'18px'} borderBottom={'2px dashed'}/>
    </Box>
);

export default Footer;