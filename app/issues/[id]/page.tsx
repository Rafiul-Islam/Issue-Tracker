import React from 'react';
import {prisma} from "@/prisma/client";
import {notFound} from "next/navigation";
import {Card, Flex, Heading, Text} from "@radix-ui/themes";
import IssueStatusBadge from "@/app/components/IssueStatusBadge";

interface Props {
    params: Promise<{
        id: string
    }>
}

const IssueDetailsPage = async ({params}: Props) => {
    const {id} = await params;
    if (typeof parseInt(id) !== 'number') notFound();

    const issue = await prisma.issue.findUnique({where: {id: parseInt(id)}});

    if (!issue) notFound();
    return (
        <div>
            <Heading>{issue?.title}</Heading>
            <Flex gap='4' my='2' align='center'>
                <IssueStatusBadge status={issue?.status}/>
                <Text>{issue?.createdAt.toDateString()}</Text>
            </Flex>
            <Card>{issue?.description}</Card>
        </div>
    );
};

export default IssueDetailsPage;