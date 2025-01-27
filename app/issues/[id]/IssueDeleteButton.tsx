import {TrashIcon} from "@radix-ui/react-icons";
import {Button} from "@radix-ui/themes";

const IssueDeleteButton = ({issueId}: { issueId: string }) => {
    return (
        <>
            <Button role='button' color='red'>
             <TrashIcon/>
                Delete
            </Button>
        </>
    );
};

export default IssueDeleteButton;