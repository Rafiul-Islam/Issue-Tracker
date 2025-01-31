"use client";

import {Select} from '@radix-ui/themes';
import React from 'react';
import {Status} from "@prisma/client";
import {useRouter} from "next/navigation";

const statuses: { label: string, value: (Status | 'all') }[] = [
    {label: 'All', value: 'all'},
    {label: 'Open', value: 'OPEN'},
    {label: 'In Progress', value: 'IN_PROGRESS'},
    {label: 'Closed', value: 'CLOSED'},
]

const IssueStatusFilter = () => {
    const router = useRouter();
    const handleIssueFilter = (value: Status | 'all') => {
        if (value === 'all') {
            router.push('/issues/list');
        } else {
            router.push(`/issues/list?status=${value}`);
        }
    }

    return (
        <>
            <Select.Root onValueChange={handleIssueFilter}>
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