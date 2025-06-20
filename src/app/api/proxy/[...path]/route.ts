import { NextRequest } from "next/server";
import { handleProxyRequest } from "../../../../../libs/api/proxy-service";
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ path: string | string[] }> }
) {
  return handleProxyRequest(request, params, "GET");
}

export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ path: string | string[] }> }
) {
  return handleProxyRequest(request, params, "POST");
}

export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ path: string | string[] }> }
) {
  return handleProxyRequest(request, params, "PUT");
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ path: string | string[] }> }
) {
  return handleProxyRequest(request, params, "DELETE");
}

export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ path: string | string[] }> }
) {
  return handleProxyRequest(request, params, "PATCH");
}
