import { avatarAnatomy } from '@chakra-ui/anatomy'
import { createMultiStyleConfigHelpers, defineStyle } from '@chakra-ui/react'

const { definePartsStyle, defineMultiStyleConfig } =
    createMultiStyleConfigHelpers(avatarAnatomy.keys)

const superLg = defineStyle({
    width: 4,
    height: 4,
    fontSize: "6xl",
    border: '2px solid bgGradient: linear(to-r, gray.300, yellow.400, pink.200)'
})

const sizes = {
    superLg: definePartsStyle({ container: superLg }),
}

export const avatarTheme = defineMultiStyleConfig({ sizes })
