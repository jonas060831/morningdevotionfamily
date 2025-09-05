import connectDB from "@/app/config/database";
import createTransporter from "@/app/utils/nodeMailer";
import { NextResponse } from "next/server";


export async function POST(req: Request) {
    try {
       await connectDB()
        const transporter = await createTransporter()
        const body = await req.json()
        const { emailTemplate } = body

        await transporter.sendMail({
            from: `Automatic Reply <${process.env.GOOGLE_EMAIL}>`,
            to: process.env.GOOGLE_EMAIL,
            subject: "Someone is trying to reach us",
            html: emailTemplate
        })

        return NextResponse.json(
         { success: true, data: "Email sent to Morning Devotion Family Admin" },
         { status: 200 }
        )

    } catch (error) {
       console.error("Message sending failed:", error);
        const errMsg = error instanceof Error ? error.message : "Unknown error";
        return NextResponse.json(
        { success: false, error: errMsg },
        { status: 500 }
        ); 
    }
}