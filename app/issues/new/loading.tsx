import {Skeleton} from "@/app/components";

const Loading = () => {
    return (
        <div className='max-w-screen-lg mx-auto px-10'>
            <div className='mb-5'>
                <Skeleton height='3rem'/>
            </div>
            <div className='mb-5'>
                <Skeleton height='20rem'/>
            </div>
            <Skeleton height='3rem' width='10rem'/>
        </div>
    );
};

export default Loading;