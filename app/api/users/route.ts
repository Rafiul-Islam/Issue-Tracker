import {NextResponse} from "next/server";
import {prisma} from "@/prisma/client";

export const GET = async (req: NextResponse) => {
    const users = await prisma.user.findMany({orderBy: {name: 'asc'}});
    return NextResponse.json({
        success: true,
        message: "Users fetched successfully",
        payload: {users}
    });
}