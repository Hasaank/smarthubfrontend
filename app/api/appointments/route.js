import { NextResponse } from "next/server";
import connectDB from "@/lib/mongodb";
import { getUserFromRequest } from "@/lib/auth";
import Appointment from "@/models/Appointment";

export async function GET(request) {
  const user = getUserFromRequest(request);
  if (!user) {
    return NextResponse.json({ message: "Unauthorized." }, { status: 401 });
  }

  try {
    await connectDB();
    const { searchParams } = new URL(request.url);
    const status = searchParams.get("status");
    const date = searchParams.get("date");

    const query = { userId: user.userId };
    if (status) query.status = status;
    if (date) {
      const start = new Date(date);
      const end = new Date(date);
      end.setDate(end.getDate() + 1);
      query.date = { $gte: start, $lt: end };
    }

    const appointments = await Appointment.find(query).sort({ date: 1, time: 1 }).lean();
    return NextResponse.json({ data: appointments });
  } catch (error) {
    console.error("GET /appointments error:", error);
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
    if (!body.student) {
      return NextResponse.json({ message: "Student name is required." }, { status: 400 });
    }

    await connectDB();
    const appointment = await Appointment.create({ ...body, userId: user.userId });
    return NextResponse.json({ message: "Appointment created.", data: appointment }, { status: 201 });
  } catch (error) {
    console.error("POST /appointments error:", error);
    return NextResponse.json({ message: "Something went wrong." }, { status: 500 });
  }
}
