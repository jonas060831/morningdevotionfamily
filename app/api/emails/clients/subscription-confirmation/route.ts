import connectDB from "@/app/config/database";
import createTransporter from "@/app/utils/nodeMailer";
import { NextRequest, NextResponse } from "next/server";

const POST = async (req: NextRequest) => {
    try {
        await connectDB()
        const transporter = await createTransporter()
        const body = await req.json()
        const { clientEmail, emailTemplate } = body

        await transporter.sendMail({
            from: `Morning Devotion Family <${process.env.GOOGLE_EMAIL}>`,
            to: clientEmail,
            subject: "You are now Subscribe!",
            html: emailTemplate
        })

        return NextResponse.json(
         { success: true, data: "Email sent to client" },
         { status: 200 }
        )

    } catch (error) {
        console.error(error);
        const errMsg = error instanceof Error ? error.message : "Unknown error";
        return NextResponse.json(
        { success: false, error: errMsg },
        { status: 500 }
        );
    }
}


export { POST }