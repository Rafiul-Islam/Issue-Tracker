import React from 'react';
import {Skeleton} from "@/app/components";

const IssueFormSkeleton = () => {
    return (
        <div className='max-w-3xl mx-auto px-5'>
            <div className='mb-5'>
                <Skeleton height='3rem'/>
            </div>
            <div className='mb-5'>
                <Skeleton height='23rem'/>
            </div>
            <Skeleton height='3rem' width='10rem'/>
        </div>
    );
};

export default IssueFormSkeleton;