import connectDB from "@/app/config/database";
import Subscriber from "@/app/models/Subscriber";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    await connectDB();

    const body = await req.json();
    const { subscriber } = body;

    if (!subscriber || typeof subscriber !== "string") {
      return NextResponse.json(
        { success: false, error: "Invalid email address" },
        { status: 400 }
      );
    }

    const email = subscriber.trim().toLowerCase();

    // Check if already subscribed
    const isEnrolled = await Subscriber.findOne({ email });
    if (isEnrolled) {
      return NextResponse.json(
        { success: false, error: "Email already subscribed" },
        { status: 409 }
      );
    }

    // Register new subscriber
    await Subscriber.create({ email });

    return NextResponse.json(
      { success: true, message: "Thank you for subscribing!" },
      { status: 201 }
    );
  } catch (error) {
    console.error("Subscription error:", error);
    const errMsg = error instanceof Error ? error.message : "Unknown error";
    return NextResponse.json(
      { success: false, error: errMsg },
      { status: 500 }
    );
  }
}
