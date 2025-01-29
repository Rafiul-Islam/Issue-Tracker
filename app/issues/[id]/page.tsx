import {notFound} from "next/navigation";
import {Box, Flex, Grid} from "@radix-ui/themes";
import {prisma} from "@/prisma/client";
import IssueDetails from "@/app/issues/[id]/IssueDetails";
import IssueEditButton from "@/app/issues/[id]/IssueEditButton";
import IssueDeleteButton from "@/app/issues/[id]/IssueDeleteButton";
import {getServerSession} from "next-auth";
import authOptions from "@/app/api/auth/[...nextauth]/options";
import AssigneeSelect from "@/app/issues/[id]/AssigneeSelect";

interface Props {
    params: Promise<{
        id: string
    }>
}

const IssueDetailsPage = async ({params}: Props) => {
    const session = await getServerSession(authOptions);

    const {id} = await params;
    if (typeof parseInt(id) !== 'number') notFound();

    const issue = await prisma.issue.findUnique({where: {id: parseInt(id)}});

    if (!issue) notFound();
    return (
        <Grid columns={{initial: '1', sm: '3', md: '4'}} gap='5'>
            <Box className='md: col-span-2 lg:col-span-3'>
                <IssueDetails issue={issue}/>
            </Box>
            {session &&
                <Box>
                    <Flex direction='column' gap='3'>
                        <AssigneeSelect issue={issue}/>
                        <IssueEditButton issueId={id}/>
                        <IssueDeleteButton issueId={id}/>
                    </Flex>
                </Box>
            }
        </Grid>
    );
};

export default IssueDetailsPage;