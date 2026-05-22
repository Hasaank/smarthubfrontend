import { NextResponse } from "next/server";
import connectDB from "@/lib/mongodb";
import { getUserFromRequest } from "@/lib/auth";
import Lead from "@/models/Lead";

export async function GET(request) {
  const user = getUserFromRequest(request);
  if (!user) {
    return NextResponse.json({ message: "Unauthorized." }, { status: 401 });
  }

  try {
    await connectDB();
    const { searchParams } = new URL(request.url);
    const stage = searchParams.get("stage");

    const query = { userId: user.userId };
    if (stage) query.pipelineStage = stage;

    const leads = await Lead.find(query).sort({ createdAt: -1 }).lean();
    return NextResponse.json({ data: leads });
  } catch (error) {
    console.error("GET /leads error:", error);
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
    if (!body.name) {
      return NextResponse.json({ message: "Lead name is required." }, { status: 400 });
    }

    await connectDB();
    const lead = await Lead.create({ ...body, userId: user.userId });
    return NextResponse.json({ message: "Lead created.", data: lead }, { status: 201 });
  } catch (error) {
    console.error("POST /leads error:", error);
    return NextResponse.json({ message: "Something went wrong." }, { status: 500 });
  }
}
