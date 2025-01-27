"use client";

import axios from "axios";
import {toast} from "react-toastify";
import {useRouter} from "next/navigation";
import {z} from "zod";
import {Button, TextField} from '@radix-ui/themes';
import {Controller, useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import SimpleMDE from "react-simplemde-editor";
import {ErrorMessage, Spinner} from "@/app/components";
import {IssueSchema} from "@/app/validationSchema";
import {Issue} from "@prisma/client";
import "easymde/dist/easymde.min.css";

type IssueFormData = z.infer<typeof IssueSchema>;

const IssueForm = ({issue}: { issue?: Issue }) => {
    const {register, control, handleSubmit, formState: {errors, isSubmitting}} = useForm<IssueFormData>({
        resolver: zodResolver(IssueSchema),
        defaultValues: {
            title: issue?.title,
            description: issue?.description
        }
    });
    const router = useRouter();

    const onSubmit = (data: IssueFormData) => {
        if (issue) {
            axios.patch(`/api/issues/${issue.id}`, data)
                .then(({data}) => {
                    toast.success(data.message);
                    router.push('/issues/list');
                    router.refresh();
                })
                .catch((err) => {
                    console.log("Error:", err);
                    toast.error(err.response.data.message);
                });
        } else {
             axios.post('/api/issues', data)
                .then(({data}) => {
                    toast.success(data.message);
                    router.push('/issues/list');
                    router.refresh();
                })
                .catch((err) => {
                    console.log("Error:", err);
                    toast.error(err.response.data.message);
                });
        }
    }

    if (isSubmitting) return <Spinner/>
    return (
        <div className='max-w-3xl mx-auto px-5'>
            <form onSubmit={handleSubmit((data) => onSubmit(data))}>
                <div className='mb-5'>
                    <TextField.Root variant="surface" placeholder="Title" {...register('title')} />
                    <ErrorMessage error={errors['title']}/>
                </div>
                <div className='mb-5'>
                    <Controller
                        name='description'
                        control={control}
                        render={({field}) => <SimpleMDE {...field} />}
                    />
                    <ErrorMessage error={errors['description']}/>
                </div>
                <Button role='button'>
                    {issue ? 'Update Issue' : 'Submit New Issue'}
                </Button>
            </form>
        </div>
    );
};

export default IssueForm;