import { NextResponse } from "next/server";
import connectDB from "@/lib/mongodb";
import { getUserFromRequest } from "@/lib/auth";
import Document from "@/models/Document";

export async function GET(request, { params }) {
  const user = getUserFromRequest(request);
  if (!user) {
    return NextResponse.json({ message: "Unauthorized." }, { status: 401 });
  }

  try {
    await connectDB();
    const doc = await Document.findOne({ _id: params.id, userId: user.userId }).lean();
    if (!doc) {
      return NextResponse.json({ message: "Document not found." }, { status: 404 });
    }
    return NextResponse.json({ data: doc });
  } catch (error) {
    console.error("GET /documents/[id] error:", error);
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

    const doc = await Document.findOneAndUpdate(
      { _id: params.id, userId: user.userId },
      body,
      { new: true, runValidators: true },
    ).lean();

    if (!doc) {
      return NextResponse.json({ message: "Document not found." }, { status: 404 });
    }

    return NextResponse.json({ message: "Document updated.", data: doc });
  } catch (error) {
    console.error("PUT /documents/[id] error:", error);
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
    await Document.findOneAndDelete({ _id: params.id, userId: user.userId });
    return NextResponse.json({ message: "Document deleted." });
  } catch (error) {
    console.error("DELETE /documents/[id] error:", error);
    return NextResponse.json({ message: "Something went wrong." }, { status: 500 });
  }
}
