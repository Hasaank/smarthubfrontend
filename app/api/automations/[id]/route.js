import { NextResponse } from "next/server";
import connectDB from "@/lib/mongodb";
import { getUserFromRequest } from "@/lib/auth";
import Automation from "@/models/Automation";

export async function GET(request, { params }) {
  const user = getUserFromRequest(request);
  if (!user) {
    return NextResponse.json({ message: "Unauthorized." }, { status: 401 });
  }

  try {
    await connectDB();
    const automation = await Automation.findOne({ _id: params.id, userId: user.userId }).lean();
    if (!automation) {
      return NextResponse.json({ message: "Automation not found." }, { status: 404 });
    }
    return NextResponse.json({ data: automation });
  } catch (error) {
    console.error("GET /automations/[id] error:", error);
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

    const automation = await Automation.findOneAndUpdate(
      { _id: params.id, userId: user.userId },
      body,
      { new: true, runValidators: true },
    ).lean();

    if (!automation) {
      return NextResponse.json({ message: "Automation not found." }, { status: 404 });
    }

    return NextResponse.json({ message: "Automation updated.", data: automation });
  } catch (error) {
    console.error("PUT /automations/[id] error:", error);
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
    await Automation.findOneAndDelete({ _id: params.id, userId: user.userId });
    return NextResponse.json({ message: "Automation deleted." });
  } catch (error) {
    console.error("DELETE /automations/[id] error:", error);
    return NextResponse.json({ message: "Something went wrong." }, { status: 500 });
  }
}
