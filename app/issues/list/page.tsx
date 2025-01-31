import {prisma} from "@/prisma/client";
import IssueActions from "@/app/issues/list/issueActions";
import {Status} from "@prisma/client";
import Pagination from "@/app/components/Pagination";
import IssueTable, {columnNames, IssueQuery} from "@/app/issues/list/IssueTable";

interface Props {
    searchParams: Promise<IssueQuery>;
}


const IssuesPage = async ({searchParams}: Props) => {
    const {status, orderBy, page} = await searchParams;
    const statuses = Object.values(Status);
    const statusFilter = statuses.includes(status) ? {status} : {};

    const validOrderBy = columnNames.some(column => column.value === orderBy) ? orderBy : 'createdAt';

    const currentPage = parseInt(page) || 1;
    const pageSize = 10;
    const skip = (currentPage - 1) * pageSize;

    const issues = await prisma.issue.findMany(
        {
            where: statusFilter,
            orderBy: {
                [validOrderBy]: 'asc'
            },
            skip,
            take: pageSize
        }
    );

    const issueCount = await prisma.issue.count({where: statusFilter});

    return (
        <div>
            <IssueActions/>
            <IssueTable searchParams={searchParams} issues={issues}/>
            <Pagination itemsCount={issueCount} pageSize={pageSize} currentPage={currentPage}/>
        </div>
    );
};

export const dynamic = 'force-dynamic';

export default IssuesPage;