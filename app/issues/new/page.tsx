import {Button, TextArea, TextField} from '@radix-ui/themes';

const CreateIssuePage = () => {
    return (
        <div className='max-w-lg'>
            <form>
                <div className='mb-5'>
                    <TextField.Root variant="surface" placeholder="Title" />
                </div>
                <div className='mb-5'>
                    <TextArea placeholder="Description" />
                </div>
                <Button>Submit New Issue</Button>
            </form>
        </div>
    );
};

export default CreateIssuePage;