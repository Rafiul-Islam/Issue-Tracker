import {Table} from "@radix-ui/themes";
import {prisma} from "@/prisma/client";
import IssueActions from "@/app/issues/list/issueActions";
import {IssueStatusBadge, Link} from "@/app/components";
import {Status} from "@prisma/client";

interface Props {
    searchParams: Promise<{status: Status}>;
}

const IssuesPage = async ({searchParams}:Props) => {
    const {status} = await searchParams;
    const statuses = Object.values(Status);
    const statusFilter = statuses.includes(status) ? {status} : {};

    const issues = await prisma.issue.findMany({where: statusFilter});

    return (
        <div>
            <IssueActions/>
            <div className="overflow-x-auto">
                <Table.Root variant="surface" className="mt-4 min-w-[700px]">
                    <Table.Header>
                        <Table.Row>
                            <Table.ColumnHeaderCell>Title</Table.ColumnHeaderCell>
                            <Table.ColumnHeaderCell>Status</Table.ColumnHeaderCell>
                            <Table.ColumnHeaderCell>Created At</Table.ColumnHeaderCell>
                        </Table.Row>
                    </Table.Header>
                    <Table.Body>
                        {issues.length === 0 &&
                            <Table.Row>
                                <Table.Cell colSpan={3} align='center' className='text-red-600'>
                                    No issues found
                                </Table.Cell>
                            </Table.Row>
                        }
                        {issues.map((issue) => (
                            <Table.Row key={issue.id}>
                                <Table.RowHeaderCell>
                                    <Link href={`/issues/${issue.id}`}>
                                        {issue.title}
                                    </Link>
                                </Table.RowHeaderCell>
                                <Table.Cell><IssueStatusBadge status={issue.status}/></Table.Cell>
                                <Table.Cell>{issue.createdAt.toDateString()}</Table.Cell>
                            </Table.Row>
                        ))}
                    </Table.Body>
                </Table.Root>
            </div>
        </div>
    );
};

 export const dynamic = 'force-dynamic';

export default IssuesPage;