import { NextResponse } from "next/server";

export async function GET() {
  const res = await fetch("http://103.178.235.240:5008/api/");
  const data = await res.json();
  return NextResponse.json(data);
}
