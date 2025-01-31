import React from 'react';
import {Flex, Table} from "@radix-ui/themes";
import NextLink from "next/link";
import {ArrowUpIcon} from "@radix-ui/react-icons";
import {IssueStatusBadge, Link} from "@/app/components";
import {Issue, Status} from "@prisma/client";

export interface IssueQuery {
    status: Status,
    orderBy: keyof Issue,
    page: string
}

interface Props {
    searchParams: Promise<IssueQuery>;
    issues: Issue[];
}

const IssueTable = async ({searchParams, issues}: Props) => {
    const {status, orderBy} = await searchParams;

    return (
        <div className="overflow-x-auto mb-4">
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
    );
};

const columns: { label: string, value: keyof Issue }[] = [
    {label: 'Title', value: 'title'},
    {label: 'Status', value: 'status'},
    {label: 'Created At', value: 'createdAt'},
]

export {columns as columnNames};

export default IssueTable;