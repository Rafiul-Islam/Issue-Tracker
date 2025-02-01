import LatestIssues from "@/app/_dashboard/LatestIssues";
import IssueSummary from "@/app/_dashboard/issueSummary";
import {prisma} from "@/prisma/client";
import IssueChart from "@/app/_dashboard/IssueChart";

const HomePage = async () => {

    const openIssues = await prisma.issue.count({where: {status: "OPEN"}});
    const inProgressIssues = await prisma.issue.count({where: {status: "IN_PROGRESS"}});
    const closedIssues = await prisma.issue.count({where: {status: "CLOSED"}});

    return (
        <div>
            <IssueChart openIssues={openIssues} inProgressIssues={inProgressIssues} closedIssues={closedIssues}/>
        </div>
    );
};

export default HomePage;