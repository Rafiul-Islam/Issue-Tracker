import LatestIssues from "@/app/_dashboard/LatestIssues";
import IssueSummary from "@/app/_dashboard/issueSummary";
import {prisma} from "@/prisma/client";
import IssueChart from "@/app/_dashboard/IssueChart";
import {Flex, Grid} from "@radix-ui/themes";

const HomePage = async () => {

    const openIssues = await prisma.issue.count({where: {status: "OPEN"}});
    const inProgressIssues = await prisma.issue.count({where: {status: "IN_PROGRESS"}});
    const closedIssues = await prisma.issue.count({where: {status: "CLOSED"}});

    return (
        <Grid columns={{initial: '1', md:'2'}} gap={'5'}>
                <Flex gap='5' direction={'column'}>
                <IssueSummary openIssues={openIssues} inProgressIssues={inProgressIssues} closedIssues={closedIssues}/>
                <IssueChart openIssues={openIssues} inProgressIssues={inProgressIssues} closedIssues={closedIssues}/>
            </Flex>
            <LatestIssues/>
        </Grid>
    );
};

export default HomePage;