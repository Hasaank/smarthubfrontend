import { NextResponse } from "next/server";
import connectDB from "@/lib/mongodb";
import { getUserFromRequest } from "@/lib/auth";
import Automation from "@/models/Automation";

export async function GET(request) {
  const user = getUserFromRequest(request);
  if (!user) {
    return NextResponse.json({ message: "Unauthorized." }, { status: 401 });
  }

  try {
    await connectDB();
    const automations = await Automation.find({ userId: user.userId }).sort({ createdAt: 1 }).lean();
    return NextResponse.json({ data: automations });
  } catch (error) {
    console.error("GET /automations error:", error);
    return NextResponse.json({ message: "Something went wrong." }, { status: 500 });
  }
}

export async function POST(request) {
  const user = getUserFromRequest(request);
  if (!user) {
    return NextResponse.json({ message: "Unauthorized." }, { status: 401 });
  }

  try {
    const body = await request.json();
    if (!body.name || !body.automationId) {
      return NextResponse.json({ message: "automationId and name are required." }, { status: 400 });
    }

    await connectDB();
    const automation = await Automation.create({ ...body, userId: user.userId });
    return NextResponse.json({ message: "Automation created.", data: automation }, { status: 201 });
  } catch (error) {
    console.error("POST /automations error:", error);
    return NextResponse.json({ message: "Something went wrong." }, { status: 500 });
  }
}
