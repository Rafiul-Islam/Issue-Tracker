import React from 'react';
import {Box, Card, Flex, Heading, Text} from "@radix-ui/themes";
import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'

const Loading = () => {
    return (
        <Box className='max-w-xl'>
            <Skeleton/>
            <Flex gap='4' my='3' align='center'>
                <Skeleton width='5rem'/>
                <Skeleton width='8rem'/>
            </Flex>
            <Card>
                <Skeleton/>
                <Skeleton/>
                <Skeleton/>
            </Card>
        </Box>
    );
};

export default Loading;