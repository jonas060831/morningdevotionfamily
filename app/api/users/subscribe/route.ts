import connectDB from "@/app/config/database";
import Subscriber from "@/app/models/Subscriber";
import { NextResponse } from "next/server";

const POST = async (req: Request) => {

    try {
        await connectDB()

        const body = await req.json()

        const { subscriber } = body

        const email = subscriber.toLowerCase()
        //check if this email already in our database
        const isEnrolled = await Subscriber.findOne({ email: email })

        //email provided is a subscriber already
        if(isEnrolled) return NextResponse.json({ success: false, error: 'Email already in use' }, { status: 409 })
        
        //ok to register
        await Subscriber.create({ email })

        return NextResponse.json({ success: true, message: 'Thank You for Subscribing' }, { status: 201 })

    } catch (error) {
        console.error(error)
        const errMsg = error instanceof Error ? error.message : "Unknown error";
        return NextResponse.json({ success: false, error: errMsg }, { status: 500 }); 
    }

}

export { POST }