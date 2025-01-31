import React from 'react';
import {Button, Flex, Text} from "@radix-ui/themes";
import {ChevronLeftIcon, ChevronRightIcon, DoubleArrowLeftIcon, DoubleArrowRightIcon} from "@radix-ui/react-icons";

interface Props {
    itemsCount: number;
    pageSize: number;
    currentPage: number;
}

const Pagination = ({itemsCount, pageSize, currentPage}: Props) => {
    const pagesCount = Math.ceil(itemsCount / pageSize);

    if(pagesCount <= 1) return null;
    return (
        <Flex align='center' gap='3'>
            <Text>{currentPage} of {pagesCount}</Text>
            <Button role='button' variant='soft' disabled={currentPage === 1}>
                <DoubleArrowLeftIcon />
            </Button>
            <Button role='button' variant='soft' disabled={currentPage === 1}>
                <ChevronLeftIcon />
            </Button>
            <Button role='button' variant='soft' disabled={currentPage === pagesCount}>
                <ChevronRightIcon />
            </Button>
            <Button role='button' variant='soft' disabled={currentPage === 1}>
                <DoubleArrowRightIcon />
            </Button>
        </Flex>
    );
};

export default Pagination;