import {NextRequest, NextResponse} from "next/server";
import {IssueSchema} from "@/app/validationSchema";
import {prisma} from "@/prisma/client";

export const PATCH = async (req: NextRequest, {params}: { params: Promise<{ id: string }> }) => {
    const {id} = await params;
    const body = await req.json();
    const validation = IssueSchema.partial().safeParse(body);
    if (!validation.success) {
        return NextResponse.json({
            success: false,
            message: validation.error.errors[0].message,
            payload: null
        }, {status: 400});
    } else {
        try {
            const issue = await prisma.issue.findUnique({where: {id: +id}});
            if (!issue) return NextResponse.json({
                success: false,
                message: "Issue not found",
                payload: null
            }, {status: 404});

            const updatedIssue = await prisma.issue.update({
                where: {id: +id},
                data: body
            });
            return NextResponse.json({
                success: true,
                message: "Issue updated successfully",
                payload: {issue: updatedIssue}
            }, {status: 200});
        } catch (err) {
            return NextResponse.json({
                success: false,
                message: "Something went wrong",
                payload: {error: err}
            }, {status: 500});
        }
    }
}