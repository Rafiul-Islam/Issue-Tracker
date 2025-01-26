import dynamic from "next/dynamic";
import IssueFormSkeleton from "@/app/issues/_components/IssueFormSkeleton";

const IssueForm = dynamic(
    () => import('@/app/issues/_components/IssueForm'),
    {
        loading: () => <IssueFormSkeleton/>
    }
);

const CreateIssuePage = () => {
    return (
        <>
            <IssueForm/>
        </>
    );
};

export default CreateIssuePage;