import { notFound } from "next/navigation";
import { Box, Grid } from "@radix-ui/themes";
import { prisma } from "@/prisma/client";
import IssueDetails from "@/app/issues/[id]/IssueDetails";
import IssueEditButton from "@/app/issues/[id]/IssueEditButton";

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
        <Grid columns={{initial: '1', md: '2'}} gap='5'>
            <Box>
                <IssueDetails issue={issue}/>
            </Box>
            <Box>
                <IssueEditButton issueId={id}/>
            </Box>
        </Grid>
    );
};

export default IssueDetailsPage;