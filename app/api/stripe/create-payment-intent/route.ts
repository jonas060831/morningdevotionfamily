import connectDB from "@/app/config/database";
import { NextResponse } from "next/server";
import Stripe from "stripe"

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!)


export const POST = async (req: Request) => {
    try {
        await connectDB()
        
        const { amount } = await req.json();

        if (!amount || isNaN(amount)) {
        return NextResponse.json({ error: "Invalid amount" }, { status: 400 });
        }

        const paymentIntent = await stripe.paymentIntents.create({
        amount, // in cents
        currency: "usd",
        automatic_payment_methods: { enabled: true },
        });

        return NextResponse.json({ clientSecret: paymentIntent.client_secret });


    } catch (error:any) {
        console.error(error);
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}