import {Flex, Table} from "@radix-ui/themes";
import {prisma} from "@/prisma/client";
import IssueActions from "@/app/issues/list/issueActions";
import {IssueStatusBadge, Link} from "@/app/components";
import NextLink from "next/link";
import {Issue, Status} from "@prisma/client";
import {ArrowUpIcon} from "@radix-ui/react-icons";

interface Props {
    searchParams: Promise<{
        status: Status,
        orderBy: keyof Issue
    }>;
}

const columns : {label: string, value: keyof Issue}[]= [
    {label: 'Title', value: 'title'},
    {label: 'Status', value: 'status'},
    {label: 'Created At', value: 'createdAt'},
]

const IssuesPage = async ({searchParams}:Props) => {
    const {status, orderBy} = await searchParams;
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
                            {columns.map((column) => (
                                <Table.RowHeaderCell key={column.label}>
                                    <Flex gap='1' align='center'>
                                        <NextLink href={{
                                            pathname: `/issues/list`,
                                            query: {status, orderBy: column.value}
                                        }}>
                                            {column.label}
                                        </NextLink>
                                        {orderBy === column.value && <ArrowUpIcon/>}
                                    </Flex>
                                </Table.RowHeaderCell>
                            ))}
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