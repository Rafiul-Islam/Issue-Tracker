import {z} from "zod";

export const IssueSchema = z.object({
    title: z.string().min(1, {message: "Title is required"}).max(255, {message: "Title must be less than or equal to 255 characters"}),
    description: z.string().min(1, {message: "Description is required"}).max(65000, {message: "Description must be less than or equal to 65000 characters"}),
    status: z.enum(["OPEN", "IN_PROGRESS", "CLOSED"], {message: "Status must be one of OPEN, IN_PROGRESS, or CLOSED"}).default("OPEN"),
});


export const patchIssueSchema = z.object({
    title: z.string().min(1, {message: "Title is required"}).max(255, {message: "Title must be less than or equal to 255 characters"}).optional(),
    description: z.string().min(1, {message: "Description is required"}).max(65000, {message: "Description must be less than or equal to 65000 characters"}).optional(),
    status: z.enum(["OPEN", "IN_PROGRESS", "CLOSED"], {message: "Status must be one of OPEN, IN_PROGRESS, or CLOSED"}).default("OPEN").optional(),
    assignedToUserId: z.string().min(1, {message: "Assigned to user ID is required"}).max(255, {message: "Assigned to user ID must be less than or equal to 255 characters"}).optional().nullable(),
});