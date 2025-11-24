import clientPromise from "@/lib/mongodb";
import { NextResponse } from "next/server";

const DB_NAME = "production";
const COLLECTION_NAME = "leads";

export async function POST(request) {
  try {
    const client = await clientPromise;
    const db = client.db(DB_NAME);
    const body = await request.json();
    
    const lead = {
      ...body,
      createdAt: new Date(),
    };

    await db.collection(COLLECTION_NAME).insertOne(lead);

    return NextResponse.json({ success: true, message: "Lead saved successfully" }, { status: 201 });
  } catch (e) {
    console.error("Failed to save lead", e);
    return NextResponse.json({ success: false, error: "Failed to save lead" }, { status: 500 });
  }
}

export async function GET() {
  try {
    const client = await clientPromise;
    const db = client.db(DB_NAME);
    
    const leads = await db
      .collection(COLLECTION_NAME)
      .find({})
      .sort({ createdAt: -1 })
      .toArray();

    return NextResponse.json({ success: true, leads }, { status: 200 });
  } catch (e) {
    console.error("Failed to fetch leads", e);
    return NextResponse.json({ success: false, error: "Failed to fetch leads" }, { status: 500 });
  }
}

