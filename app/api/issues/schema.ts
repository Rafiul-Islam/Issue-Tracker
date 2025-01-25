import {z} from "zod";

const createIssueSchema = z.object({
    title: z.string().min(1, {message: "Title is required"}).max(255, {message: "Title must be less than or equal to 255 characters"}),
    description: z.string().min(1, {message: "Description is required"}),
    status: z.enum(["OPEN", "IN_PROGRESS", "CLOSED"], {message: "Status must be one of OPEN, IN_PROGRESS, or CLOSED"}).default("OPEN"),
});

export default createIssueSchema;