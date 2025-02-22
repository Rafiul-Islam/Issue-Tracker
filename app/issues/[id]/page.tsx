import {notFound} from "next/navigation";
import {Box, Flex, Grid} from "@radix-ui/themes";
import {prisma} from "@/prisma/client";
import IssueDetails from "@/app/issues/[id]/IssueDetails";
import IssueEditButton from "@/app/issues/[id]/IssueEditButton";
import IssueDeleteButton from "@/app/issues/[id]/IssueDeleteButton";
import {getServerSession} from "next-auth";
import authOptions from "@/app/api/auth/[...nextauth]/options";
import AssigneeSelect from "@/app/issues/[id]/AssigneeSelect";
import {cache} from "react";
import StatusSelect from "@/app/issues/[id]/StatusSelect";

interface Props {
    params: Promise<{
        id: string
    }>
}

const fetchIssues = cache((id: string) => prisma.issue.findUnique({where: {id: parseInt(id)}}));

const IssueDetailsPage = async ({params}: Props) => {
    const session = await getServerSession(authOptions);

    const {id} = await params;
    if (typeof parseInt(id) !== 'number') notFound();

    const issue = await fetchIssues(id);

    if (!issue) notFound();
    return (
        <Grid columns={{initial: '1', sm: '3', md: '4'}} gap='5'>
            <Box className='md: col-span-2 lg:col-span-3'>
                <IssueDetails issue={issue}/>
            </Box>
            {session &&
                <Box>
                    <Flex direction='column' gap='3'>
                        <StatusSelect issue={issue}/>
                        <AssigneeSelect issue={issue}/>
                        <IssueEditButton issueId={id}/>
                        <IssueDeleteButton issueId={id}/>
                    </Flex>
                </Box>
            }
        </Grid>
    );
};

export const generateMetadata = async ({params}: Props) => {
    const {id} = await params;
    const issue = await fetchIssues(id);
    return {
        title: issue?.title,
        description: `Details Of issue - ${issue?.description}`,
    };
};

export default IssueDetailsPage;











