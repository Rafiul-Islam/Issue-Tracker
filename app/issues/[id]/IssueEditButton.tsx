import {Button} from "@radix-ui/themes";
import {Pencil2Icon} from "@radix-ui/react-icons";
import Link from "next/link";

const IssueEditButton = ({issueId}: { issueId: string }) => {
    return (
        <>
            <Link href={`/issues/${issueId}/edit`}>
                <Button role='button'>
                    <Pencil2Icon/>
                    Edit
                </Button>
            </Link>
        </>
    );
};

export default IssueEditButton;