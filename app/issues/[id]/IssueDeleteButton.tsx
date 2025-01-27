"use client";

import {TrashIcon} from "@radix-ui/react-icons";
import {AlertDialog, Button, Flex} from "@radix-ui/themes";
import axios from "axios";
import {toast} from "react-toastify";
import {useRouter} from "next/navigation";
import {useState} from "react";
import {Spinner} from "@/app/components";

const IssueDeleteButton = ({issueId}: { issueId: string }) => {
    const router = useRouter();
    const [isLoading, setIsLoading] = useState(false);

    const handleDelete = () => {
        setIsLoading(true);
        axios.delete(`/api/issues/${issueId}`)
            .then(({data}) => {
                toast.success(data.message);
                router.push('/issues');
                router.refresh();
            })
            .catch((err) => {
                console.log("Error:", err);
                toast.error(err.response.data.message);
            })
            .finally(() => {
                setIsLoading(false)
            })
    }

    return (
        <>
            {isLoading && <Spinner/>}
            <AlertDialog.Root>
                <AlertDialog.Trigger>
                    <Button role='button' color='red'>
                        <TrashIcon/>
                        Delete Issue
                    </Button>
                </AlertDialog.Trigger>
                <AlertDialog.Content maxWidth="450px">
                    <AlertDialog.Title>Confirm Deletion</AlertDialog.Title>
                    <AlertDialog.Description size="2">
                        Are you sure to delete this issue? You won't be able to revert this!
                    </AlertDialog.Description>

                    <Flex gap="3" mt="4" justify="end">
                        <AlertDialog.Cancel>
                            <Button role='button' variant="soft" color="gray">
                                Cancel
                            </Button>
                        </AlertDialog.Cancel>
                        <AlertDialog.Action>
                            <Button role='button' variant="solid" color="red" onClick={handleDelete}>
                                Delete Issue
                            </Button>
                        </AlertDialog.Action>
                    </Flex>
                </AlertDialog.Content>
            </AlertDialog.Root>
        </>
    );
};

export default IssueDeleteButton;