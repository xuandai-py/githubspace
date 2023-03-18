import { Box, Flex, Text } from "@chakra-ui/react";
import PropTypes from 'prop-types';

const RateLimit = ({ rateLimit }) => (
    <Flex>
        {rateLimit && (
            <Flex
                position={'absolute'}
                top={0}
                right={0}
                bg={'rgb(36, 41, 46)'}
                p={2}
                direction='column'
                align={'center'}
            >
                <Text
                    color={'grey.700'}
                    fontSize={{ base: 'md',sm: 'lg', md: 'xl' }}
                // mb={8}
                >
                    {`${rateLimit.remaining} / ${rateLimit.limit}`}
                </Text>
                <Text
                    textTransform={'uppercase'}
                    fontSize={{base: '2xs', sm: 'sm'}}
                    // letterSpacing={1}
                    m={0}
                    color={'grey.300'}
                >
                    Requests Left
                </Text>
            </Flex>
        )}
    </Flex>
);

RateLimit.propTypes = {
    rateLimit: PropTypes.object.isRequired,
};

export default RateLimit;