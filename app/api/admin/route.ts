
import { currentRole } from "@/lib/custom-auth"
import { UserRole } from "@prisma/client"
import { NextResponse } from "next/server"

export async function GET() {
    const role = await currentRole()

    if(role !== UserRole.ADMIN) {
        return new NextResponse(null, {status : 403})
    }

    return new NextResponse(null,{status : 200})
}