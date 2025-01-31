import {Box, Button, Flex} from "@radix-ui/themes";
import Link from "next/link";
import IssueStatusFilter from "@/app/issues/list/IssueStatusFilter";

const IssueActions = () => {
    return (
        <Flex justify='between' align='center'>
            <Box>
                <IssueStatusFilter/>
            </Box>
            <Box>
                <Button>
                    <Link href={"/issues/new"}>
                        New Issue
                    </Link>
                </Button>
            </Box>
        </Flex>
    );
};

export default IssueActions;