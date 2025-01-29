"use client";

import {Issue, User} from "@prisma/client";
import axios from "axios";
import {useQuery} from "@tanstack/react-query";
import {Skeleton} from "@/app/components";
import {Select} from "@radix-ui/themes";
import {toast} from "react-toastify";

const AssigneeSelect = ({issue}: { issue: Issue }) => {
    const {data: users, error, isLoading} = useQuery<User[]>({
        queryKey: ['users'],
        queryFn: async () => await axios.get('/api/users').then(res => res.data.payload.users),
        staleTime: 1000 * 60,
        retry: 2,
    });

    const handleAssigneeChange = async (userId: string) => {
        try {
            await axios.patch(`/api/issues/${issue.id}`, {assignedToUserId: userId !== '-1' ? userId : null});
            toast.success('Assignee updated successfully');
        } catch (err) {
            console.log(err);
            toast.error('Failed to update assignee');
        }
    }

    if (isLoading) return <Skeleton/>;
    if (error) return null;
    return (
        <>
            <Select.Root defaultValue={issue.assignedToUserId || "-1"} onValueChange={handleAssigneeChange}>
                <Select.Trigger placeholder='Assignee....'/>
                <Select.Content>
                    <Select.Group>
                        <Select.Label>Suggestions</Select.Label>
                        <Select.Item value='-1'>Unassigned</Select.Item>
                        {users?.map(user => (
                            <Select.Item key={user.id} value={user.id}>{user.name}</Select.Item>
                        ))}
                    </Select.Group>
                </Select.Content>
            </Select.Root>
        </>
    );
};

export default AssigneeSelect;