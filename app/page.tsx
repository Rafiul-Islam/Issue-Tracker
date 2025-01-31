import Pagination from "@/app/components/Pagination";

const HomePage = () => {
    return (
        <div>
            <Pagination itemsCount={100} pageSize={10} currentPage={2}/>
        </div>
    );
};

export default HomePage;