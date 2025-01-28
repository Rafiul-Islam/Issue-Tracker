"use client";

import {useEffect, useState} from "react";
import {User} from "@prisma/client";
import axios from "axios";
import { Select } from "@radix-ui/themes";

const AssigneeSelect = () => {
    const [users, setUsers] = useState<User[]>([]);

    useEffect(() => {
        axios.get('/api/users')
            .then((res) => setUsers(res.data.payload?.users))
            .catch(() => console.log('error'));
    }, []);

    return (
        <>
            <Select.Root>
                <Select.Trigger placeholder='Assignee....'/>
                <Select.Content>
                    <Select.Group>
                        <Select.Label>Suggestions</Select.Label>
                        {users.length > 0 && users.map(user => (
                            <Select.Item key={user.id} value={user.id}>{user.name}</Select.Item>
                        ))}
                    </Select.Group>
                </Select.Content>
            </Select.Root>
        </>
    );
};

export default AssigneeSelect;