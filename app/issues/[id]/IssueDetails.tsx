import React from 'react';
import {Card, Flex, Heading, Text} from "@radix-ui/themes";
import {IssueStatusBadge} from "@/app/components";
import ReactMarkdown from "react-markdown";
import {Issue} from "@prisma/client"

const IssueDetails = ({issue}: {issue: Issue}) => {
    return (
        <>
            <Heading>{issue?.title}</Heading>
            <Flex gap='4' my='3' align='center'>
                <IssueStatusBadge status={issue?.status}/>
                <Text>{issue?.createdAt.toDateString()}</Text>
            </Flex>
            <Card className='prose max-w-full'>
                <ReactMarkdown>
                    {issue?.description}
                </ReactMarkdown>
            </Card>
        </>
    );
};

export default IssueDetails;