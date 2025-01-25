import React from 'react';
import {Button, Table} from "@radix-ui/themes";
import Link from "next/link";
import {prisma} from "@/prisma/client";
import IssueStatusBadge from "@/app/components/IssueStatusBadge";

const IssuesPage = async () => {
    const issues = await prisma.issue.findMany();

    return (
        <div>
            <div className='text-right'>
                <Button>
                    <Link href={"/issues/new"}>
                        New Issue
                    </Link>
                </Button>
            </div>
            <div className="overflow-x-auto">
                <Table.Root variant="surface" className="mt-4" style={{minWidth: "700px"}}>
                    <Table.Header>
                        <Table.Row>
                            <Table.ColumnHeaderCell>Title</Table.ColumnHeaderCell>
                            <Table.ColumnHeaderCell>Description</Table.ColumnHeaderCell>
                            <Table.ColumnHeaderCell>Status</Table.ColumnHeaderCell>
                            <Table.ColumnHeaderCell>Created At</Table.ColumnHeaderCell>
                        </Table.Row>
                    </Table.Header>

                    <Table.Body>
                        {issues.map((issue) => (
                            <Table.Row key={issue.id}>
                                <Table.RowHeaderCell>{issue.title}</Table.RowHeaderCell>
                                <Table.Cell>{issue.description}</Table.Cell>
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

export default IssuesPage;