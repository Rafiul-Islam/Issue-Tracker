import React from 'react';
import {Card, Flex, Text} from "@radix-ui/themes";
import Link from "next/link";
import {Status} from "@prisma/client";
import {IssueStatusBadge} from "@/app/components";

interface Props {
    openIssues: number;
    inProgressIssues: number;
    closedIssues: number;

}

const IssueSummary = ({openIssues, inProgressIssues, closedIssues}: Props) => {
    const containers: {
        label: string;
        value: number;
        status: Status
    }[] = [
        {
            label: 'Open Issues',
            value: openIssues,
            status: "OPEN"
        },
        {
            label: 'In-Progress Issues',
            value: inProgressIssues,
            status: "IN_PROGRESS"
        },
        {
            label: 'Closed Issues',
            value: closedIssues,
            status: "CLOSED"
        }
    ]

    return (
        <Flex gap='3'>
            {containers.map((container, index) => (
                <Card key={index} className='p-5 shadow-lg'>
                    <Flex direction='column' gap='2'>
                        <Link className='text-sm font-medium text-gray-400' href='/issues/list?status=OPEN'>{container.label}</Link>
                        <Text className='text-2xl'>{container.value}</Text>
                    </Flex>
                </Card>
            ))}
        </Flex>
    );
};

export default IssueSummary;