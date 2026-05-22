import { NextResponse } from "next/server";
import connectDB from "@/lib/mongodb";
import { getUserFromRequest } from "@/lib/auth";
import Document from "@/models/Document";

export async function GET(request) {
  const user = getUserFromRequest(request);
  if (!user) {
    return NextResponse.json({ message: "Unauthorized." }, { status: 401 });
  }

  try {
    await connectDB();
    const docs = await Document.find({ userId: user.userId }).sort({ createdAt: -1 }).lean();
    return NextResponse.json({ data: docs });
  } catch (error) {
    console.error("GET /documents error:", error);
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
      return NextResponse.json({ message: "Document name is required." }, { status: 400 });
    }

    await connectDB();
    const doc = await Document.create({ ...body, userId: user.userId });
    return NextResponse.json({ message: "Document created.", data: doc }, { status: 201 });
  } catch (error) {
    console.error("POST /documents error:", error);
    return NextResponse.json({ message: "Something went wrong." }, { status: 500 });
  }
}
