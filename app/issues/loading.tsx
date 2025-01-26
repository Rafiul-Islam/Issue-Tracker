import React from 'react';
import IssueActions from "@/app/issues/issueActions";
import {Table} from "@radix-ui/themes";
import {Skeleton} from "@/app/components";

const Loading = () => {
    const issues = [1,2,3,4,5]

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
                            <Table.Row key={issue}>
                                <Table.Cell><Skeleton /></Table.Cell>
                                <Table.Cell><Skeleton /></Table.Cell>
                                <Table.Cell><Skeleton /></Table.Cell>
                            </Table.Row>
                        ))}
                    </Table.Body>
                </Table.Root>
            </div>
        </div>
    );
};

export default Loading;