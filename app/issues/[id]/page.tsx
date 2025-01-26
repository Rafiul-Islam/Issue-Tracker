import ReactMarkdown from "react-markdown";
import {notFound} from "next/navigation";
import {Box, Card, Flex, Heading, Text} from "@radix-ui/themes";
import {prisma} from "@/prisma/client";
import {IssueStatusBadge} from "@/app/components";

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
        <Box>
            <Heading>{issue?.title}</Heading>
            <Flex gap='4' my='3' align='center'>
                <IssueStatusBadge status={issue?.status}/>
                <Text>{issue?.createdAt.toDateString()}</Text>
            </Flex>
            <Card className='prose'>
                <ReactMarkdown>
                    {issue?.description}
                </ReactMarkdown>
            </Card>
        </Box>
    );
};

export default IssueDetailsPage;