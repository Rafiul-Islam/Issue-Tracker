"use client";

import {Button, TextField} from '@radix-ui/themes';
import SimpleMDE from "react-simplemde-editor";
import "easymde/dist/easymde.min.css";
import {Controller, useForm} from "react-hook-form";
import axios from "axios";
import {toast} from "react-toastify";
import {useRouter} from "next/navigation";
import {zodResolver} from "@hookform/resolvers/zod";
import createIssueSchema from "@/app/api/issues/schema";
import ErrorMessage from "@/app/components/ErrorMessage";

interface IssueForm {
    title: string;
    description: string;
}

const CreateIssuePage = () => {
    const {register, control, handleSubmit, formState: {errors}} = useForm<IssueForm>({
        resolver: zodResolver(createIssueSchema),
    });
    const router = useRouter()

    const onSubmit = async (data: IssueForm) => {
        await axios.post('/api/issues', data)
            .then(({data}) => {
                toast.success(data.message);
                router.push('/issues');
            })
            .catch((err) => {
                console.log("Error:", err);
                toast.error(err.response.data.message);
            });
    }

    return (
        <div className='max-w-screen-lg mx-auto px-10'>
            <form onSubmit={handleSubmit((data) => onSubmit(data))}>
                <div className='mb-5'>
                    <TextField.Root variant="surface" placeholder="Title" {...register('title')} />
                    <ErrorMessage error={errors['title']} />
                </div>
                <div className='mb-5'>
                    <Controller
                        name='description'
                        control={control}
                        render={({field}) => <SimpleMDE {...field} />}
                    />
                    <ErrorMessage error={errors['description']} />
                </div>
                <Button role='button'>Submit New Issue</Button>
            </form>
        </div>
    );
};

export default CreateIssuePage;