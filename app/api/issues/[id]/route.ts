import {NextRequest, NextResponse} from "next/server";
import {IssueSchema} from "@/app/validationSchema";
import {prisma} from "@/prisma/client";
import {getServerSession} from "next-auth";
import authOptions from "@/app/api/auth/[...nextauth]/options";

export const GET = async (req: NextRequest, {params}: { params: Promise<{ id: string }> }) => {
    const {id} = await params;
    try {
        const issue = await prisma.issue.findUnique({where: {id: +id}});
        if (!issue) return NextResponse.json({success: false, message: "Issue not found"}, {status: 404});
        return NextResponse.json({success: true, message: "Issue fetched successfully", payload: {issue}}, {status: 200});
    } catch (err) {
        return NextResponse.json({success: false, message: "Something went wrong", payload: {error: err}}, {status: 500});
    }
}

export const PATCH = async (req: NextRequest, {params}: { params: Promise<{ id: string }> }) => {
    const session = await getServerSession(authOptions);
    if (!session) {
        return NextResponse.json({
            success: false,
            message: "Unauthorized",
            payload: null
        }, {status: 401});
    }

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

export const DELETE = async (req: NextRequest, {params}: { params: Promise<{ id: string }> }) => {
    const session = await getServerSession(authOptions);
    if (!session) {
        return NextResponse.json({
            success: false,
            message: "Unauthorized",
            payload: null
        }, {status: 401});
    }

    const {id} = await params;
    try {
        const issue = await prisma.issue.findUnique({where: {id: +id}});
        if (!issue) return NextResponse.json({success: false, message: "Issue not found"}, {status: 404});
        await prisma.issue.delete({where: {id: +id}})
        return NextResponse.json({success: true, message: "Issue deleted successfully"}, {status: 200})
    } catch (err) {
        return NextResponse.json({success: false, message: "Something went wrong", payload: {error: err}}, {status: 500})
    }
}