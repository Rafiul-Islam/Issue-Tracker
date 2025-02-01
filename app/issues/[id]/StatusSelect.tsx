import React from 'react';
import {Issue, Status} from "@prisma/client";
import {Select} from '@radix-ui/themes';

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

    return (
        <>
            <Select.Root defaultValue={issue.status}>
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