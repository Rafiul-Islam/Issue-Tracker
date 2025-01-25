"use client";

import {Button, TextField} from '@radix-ui/themes';
import SimpleMDE from "react-simplemde-editor";
import "easymde/dist/easymde.min.css";

const CreateIssuePage = () => {
    return (
        <div className='max-w-lg'>
            <form>
                <div className='mb-5'>
                    <TextField.Root variant="surface" placeholder="Title" />
                </div>
                <div className='mb-5'>
                    <SimpleMDE />
                </div>
                <Button>Submit New Issue</Button>
            </form>
        </div>
    );
};

export default CreateIssuePage;