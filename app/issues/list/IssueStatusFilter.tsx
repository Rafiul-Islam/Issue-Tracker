"use client";

import {Select} from '@radix-ui/themes';
import React from 'react';
import {Status} from "@prisma/client";

const IssueStatusFilter = () => {
    const statuses: { label: string, value: (Status | 'all') }[] = [
        {label: 'All', value: 'all'},
        {label: 'Open', value: 'OPEN'},
        {label: 'In Progress', value: 'IN_PROGRESS'},
        {label: 'Resolved', value: 'CLOSED'},
    ]

    return (
        <>
            <Select.Root>
                <Select.Trigger placeholder='Filter By Status...'/>
                <Select.Content>
                    <Select.Group>
                        {statuses.map((status, index) => (
                            <Select.Item key={index} value={status.value}>
                                {status.label}
                            </Select.Item>
                        ))}
                    </Select.Group>
                </Select.Content>
            </Select.Root>

        </>
    );
};

export default IssueStatusFilter;