import {Box, Card, Flex} from "@radix-ui/themes";
import {Skeleton} from "@/app/components";

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