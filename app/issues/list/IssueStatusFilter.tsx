"use client";

import {Select} from '@radix-ui/themes';
import React from 'react';
import {Status} from "@prisma/client";
import {useRouter, useSearchParams} from "next/navigation";

const statuses: { label: string, value: (Status | 'all') }[] = [
    {label: 'All', value: 'all'},
    {label: 'Open', value: 'OPEN'},
    {label: 'In Progress', value: 'IN_PROGRESS'},
    {label: 'Closed', value: 'CLOSED'},
]

const IssueStatusFilter = () => {
    const router = useRouter();
    const searchParams =  useSearchParams();

    const handleIssueFilter = (value: Status | 'all') => {
        const params = new URLSearchParams(searchParams);
        if (value === 'all') {
            params.delete('status');
        } else {
            params.set('status', value);
        } if (params.has('page')) {
            params.set('page', '1');
        }
        const query = params.toString();
        router.push(`/issues/list?${query}`);
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