import React from 'react';
import {prisma} from "@/prisma/client";
import {Avatar, Card, Flex, Heading, Table} from "@radix-ui/themes";
import Link from "next/link";
import {IssueStatusBadge} from "@/app/components";

const LatestIssues = async () => {
    const issues = await prisma.issue.findMany({
        take: 5,
        orderBy: {
            id: 'desc'
        },
        include: {
            assignedToUser: true,
        }
    });

    return (
        <Card className='p-0'>
            <Heading size='4' m='5'>Latest Issues</Heading>
            <Table.Root className='px-5'>
                <Table.Body>
                    {issues.map(issue => (
                        <Table.Row key={issue.id}>
                            <Table.Cell>
                                <Flex justify='between' align='center'>
                                    <Flex direction='column' align='start' gap='2'>
                                        <Link href={`/issues/${issue.id}`}>
                                            {issue.title}
                                        </Link>
                                        <IssueStatusBadge status={issue.status}/>
                                    </Flex>
                                    {issue.assignedToUser && (
                                        <Avatar fallback='?'
                                                src={issue.assignedToUser.image!}
                                                size='3'
                                                radius='full'
                                                className='border-2 border-gray-300'
                                        />
                                    )}
                                </Flex>
                            </Table.Cell>
                        </Table.Row>
                    ))}
                </Table.Body>
            </Table.Root>
        </Card>
    );
};

export default LatestIssues;






