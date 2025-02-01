import LatestIssues from "@/app/_dashboard/LatestIssues";
import IssueSummary from "@/app/_dashboard/issueSummary";
import {prisma} from "@/prisma/client";

const HomePage = async () => {

    const openIssues = await prisma.issue.count({where: {status: "OPEN"}});
    const inProgressIssues = await prisma.issue.count({where: {status: "IN_PROGRESS"}});
    const closedIssues = await prisma.issue.count({where: {status: "CLOSED"}});

    return (
        <div>
            <IssueSummary openIssues={openIssues} inProgressIssues={inProgressIssues} closedIssues={closedIssues}/>
            <LatestIssues/>
        </div>
    );
};

export default HomePage;