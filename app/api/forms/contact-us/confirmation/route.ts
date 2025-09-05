import connectDB from "@/app/config/database";
import createTransporter from "@/app/utils/nodeMailer";
import { NextResponse } from "next/server";


export async function POST(req: Request) {
    try {
       await connectDB()
        const transporter = await createTransporter()
        const body = await req.json()
        const { emailTemplate, clientEmail } = body

        await transporter.sendMail({
            from: `Automatic Reply <${process.env.GOOGLE_EMAIL}>`,
            to: clientEmail,
            subject: "We Received Your Message",
            html: emailTemplate
        })

        return NextResponse.json(
         { success: true, data: "Automatic Email Response sent to user" },
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