import { NextResponse } from "next/server";
import connectDB from "@/lib/mongodb";
import { getUserFromRequest } from "@/lib/auth";
import Appointment from "@/models/Appointment";

export async function GET(request, { params }) {
  const user = getUserFromRequest(request);
  if (!user) {
    return NextResponse.json({ message: "Unauthorized." }, { status: 401 });
  }

  try {
    await connectDB();
    const appointment = await Appointment.findOne({ _id: params.id, userId: user.userId }).lean();
    if (!appointment) {
      return NextResponse.json({ message: "Appointment not found." }, { status: 404 });
    }
    return NextResponse.json({ data: appointment });
  } catch (error) {
    console.error("GET /appointments/[id] error:", error);
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

    const appointment = await Appointment.findOneAndUpdate(
      { _id: params.id, userId: user.userId },
      body,
      { new: true, runValidators: true },
    ).lean();

    if (!appointment) {
      return NextResponse.json({ message: "Appointment not found." }, { status: 404 });
    }

    return NextResponse.json({ message: "Appointment updated.", data: appointment });
  } catch (error) {
    console.error("PUT /appointments/[id] error:", error);
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
    await Appointment.findOneAndDelete({ _id: params.id, userId: user.userId });
    return NextResponse.json({ message: "Appointment deleted." });
  } catch (error) {
    console.error("DELETE /appointments/[id] error:", error);
    return NextResponse.json({ message: "Something went wrong." }, { status: 500 });
  }
}
