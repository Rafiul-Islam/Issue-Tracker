"use client";

import {User} from "@prisma/client";
import axios from "axios";
import {useQuery} from "@tanstack/react-query";
import {Skeleton} from "@/app/components";
import {Select} from "@radix-ui/themes";

const AssigneeSelect = () => {
    const {data: users, error, isLoading} = useQuery<User[]>({
        queryKey: ['users'],
        queryFn: async () => await axios.get('/api/users').then(res => res.data.payload.users),
        staleTime: 1000 * 60,
        retry: 2,
    });

    console.log(users);

    if (isLoading) return <Skeleton/>;
    if (error) return null;
    return (
        <>
            <Select.Root>
                <Select.Trigger placeholder='Assignee....'/>
                <Select.Content>
                    <Select.Group>
                        <Select.Label>Suggestions</Select.Label>
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