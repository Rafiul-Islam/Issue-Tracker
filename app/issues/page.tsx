import React from 'react';
import {Table} from "@radix-ui/themes";
import {prisma} from "@/prisma/client";
import IssueStatusBadge from "@/app/components/IssueStatusBadge";
import IssueActions from "@/app/issues/issueActions";
import Link from "@/app/components/Link";

const IssuesPage = async () => {
    const issues = await prisma.issue.findMany();

    return (
        <div>
            <IssueActions/>
            <div className="overflow-x-auto">
                <Table.Root variant="surface" className="mt-4" style={{minWidth: "700px"}}>
                    <Table.Header>
                        <Table.Row>
                            <Table.ColumnHeaderCell>Title</Table.ColumnHeaderCell>
                            <Table.ColumnHeaderCell>Status</Table.ColumnHeaderCell>
                            <Table.ColumnHeaderCell>Created At</Table.ColumnHeaderCell>
                        </Table.Row>
                    </Table.Header>

                    <Table.Body>
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

export default IssuesPage;