'use client';

import React from 'react';
import {Button, Flex, Text} from "@radix-ui/themes";
import {ChevronLeftIcon, ChevronRightIcon, DoubleArrowLeftIcon, DoubleArrowRightIcon} from "@radix-ui/react-icons";
import {useRouter, useSearchParams} from "next/navigation";

interface Props {
    itemsCount: number;
    pageSize: number;
    currentPage: number;
}

const Pagination = ({itemsCount, pageSize, currentPage}: Props) => {
    const router = useRouter();
    const  searchParams = useSearchParams();

    const pagesCount = Math.ceil(itemsCount / pageSize);

    const changePage = (page: number) => {
      const params = new URLSearchParams(searchParams);
      params.set('page', page.toString());
      router.push("?" + params.toString());
    }

    if(pagesCount <= 1) return null;
    return (
        <Flex align='center' gap='3'>
            <Text>{currentPage} of {pagesCount}</Text>
            <Button role='button' variant='soft' disabled={currentPage === 1} onClick={() => changePage(1)}>
                <DoubleArrowLeftIcon />
            </Button>
            <Button role='button' variant='soft' disabled={currentPage === 1} onClick={() => changePage(currentPage - 1)}>
                <ChevronLeftIcon />
            </Button>
            <Button role='button' variant='soft' disabled={currentPage === pagesCount} onClick={() => changePage(currentPage + 1)}>
                <ChevronRightIcon />
            </Button>
            <Button role='button' variant='soft' disabled={currentPage === pagesCount} onClick={() => changePage(pagesCount)}>
                <DoubleArrowRightIcon />
            </Button>
        </Flex>
    );
};

export default Pagination;