"use client";

import React from 'react';
import {Issue, Status} from "@prisma/client";
import {Select} from '@radix-ui/themes';
import {prisma} from "@/prisma/client";
import {toast} from "react-toastify";
import axios from "axios";

interface Props {
    issue: Issue;
}

const StatusSelect = ({issue}: Props) => {
    const statuses: {
        label: string;
        value: Status;
    }[] = [
        {label: 'Open', value: 'OPEN'},
        {label: 'In Progress', value: 'IN_PROGRESS'},
        {label: 'Closed', value: 'CLOSED'},
    ]

    const handleStatusChange = async (value: Status) => {
        if (value !== issue.status) {
            axios.patch(`/api/issues/${issue.id}`, {status: value})
                .then(() => {
                    toast.success('Status updated successfully');
                })
                .catch(() => {
                    toast.error('Something went wrong');
                });

        }
    }

    return (
        <>
            <Select.Root defaultValue={issue.status} onValueChange={handleStatusChange}>
                <Select.Trigger/>
                <Select.Content>
                    <Select.Group>
                        <Select.Label>Status...</Select.Label>
                        {
                            statuses.map(({label, value}) => (
                                <Select.Item key={value} value={value}>
                                    {label}
                                </Select.Item>
                            ))
                        }
                    </Select.Group>
                </Select.Content>
            </Select.Root>

        </>
    );
};

export default StatusSelect;