import { NextResponse } from "next/server";
import connectDB from "@/lib/mongodb";
import { getUserFromRequest } from "@/lib/auth";
import Lead from "@/models/Lead";

export async function GET(request, { params }) {
  const user = getUserFromRequest(request);
  if (!user) {
    return NextResponse.json({ message: "Unauthorized." }, { status: 401 });
  }

  try {
    await connectDB();
    const lead = await Lead.findOne({ _id: params.id, userId: user.userId }).lean();
    if (!lead) {
      return NextResponse.json({ message: "Lead not found." }, { status: 404 });
    }
    return NextResponse.json({ data: lead });
  } catch (error) {
    console.error("GET /leads/[id] error:", error);
    return NextResponse.json({ message: "Something went wrong." }, { status: 500 });
  }
}

export async function PUT(request, { params }) {
  const user = getUserFromRequest(request);
  if (!user) {
    return NextResponse.json({ message: "Unauthorized." }, { status: 401 });
  }

  try {
    const body = await request.json();
    await connectDB();

    const lead = await Lead.findOneAndUpdate(
      { _id: params.id, userId: user.userId },
      body,
      { new: true, runValidators: true },
    ).lean();

    if (!lead) {
      return NextResponse.json({ message: "Lead not found." }, { status: 404 });
    }

    return NextResponse.json({ message: "Lead updated.", data: lead });
  } catch (error) {
    console.error("PUT /leads/[id] error:", error);
    return NextResponse.json({ message: "Something went wrong." }, { status: 500 });
  }
}

export async function DELETE(request, { params }) {
  const user = getUserFromRequest(request);
  if (!user) {
    return NextResponse.json({ message: "Unauthorized." }, { status: 401 });
  }

  try {
    await connectDB();
    await Lead.findOneAndDelete({ _id: params.id, userId: user.userId });
    return NextResponse.json({ message: "Lead deleted." });
  } catch (error) {
    console.error("DELETE /leads/[id] error:", error);
    return NextResponse.json({ message: "Something went wrong." }, { status: 500 });
  }
}
