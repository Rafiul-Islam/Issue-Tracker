import {NextRequest, NextResponse} from "next/server";
import {IssueSchema} from "@/app/validationSchema";
import {prisma} from "@/prisma/client";

export const GET = async () => {
    try {
        const issues = await prisma.issue.findMany();
        return NextResponse.json({
            success: true,
            message: "Issues fetched successfully",
            payload: {issues}
        });
    } catch (err) {
        return NextResponse.json({
            success: false,
            message: "Something went wrong",
            payload: {error: err}
        }, {status: 500});
    }
}

export const POST = async (req: NextRequest) => {
    const body = await req.json();
    const validation = IssueSchema.safeParse(body);
    if (!validation.success) {
        return NextResponse.json({
            success: false,
            message: validation.error.errors[0].message,
            payload: null
        }, {status: 400});
    } else {
        try {
            const newIssue = await prisma.issue.create({
                data: {
                    title: body.title,
                    description: body.description,
                    status: body.status,
                }
            })
            return NextResponse.json({
                success: true,
                message: "Issue created successfully",
                payload: {issue: newIssue}
            }, {status: 201});
        } catch (err) {
            return NextResponse.json({
                success: false,
                message: "Something went wrong",
                payload: {error: err}
            }, {status: 500});
        }
    }
}