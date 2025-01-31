import Pagination from "@/app/components/Pagination";

interface Props {
    searchParams: Promise<{
        page: string;
    }>;
}

const HomePage = async ({searchParams}: Props) => {
    const {page} = await searchParams;

    return (
        <div>
            <Pagination itemsCount={100} pageSize={10} currentPage={parseInt(page) || 1}/>
        </div>
    );
};

export default HomePage;