"use client";

import {TrashIcon} from "@radix-ui/react-icons";
import {AlertDialog, Button, Flex} from "@radix-ui/themes";

const IssueDeleteButton = ({issueId}: { issueId: string }) => {
    const handleDelete = async () => {
        console.log('Issue Successfully Deleted');
    }

    return (
        <>
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