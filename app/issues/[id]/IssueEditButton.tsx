import {Button} from "@radix-ui/themes";
import {Pencil2Icon} from "@radix-ui/react-icons";
import Link from "next/link";

const IssueEditButton = ({issueId}: { issueId: string }) => {
    return (
        <>
            <Link href={`/issues/edit/${issueId}`}>
                <Button className='w-full' role='button'>
                    <Pencil2Icon/>
                    Edit Issue
                </Button>
            </Link>
        </>
    );
};

export default IssueEditButton;