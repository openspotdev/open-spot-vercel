import { type NextRequest } from "next/server";

export async function GET(req: NextRequest) {
  const fullPathRequest = `${process.env.NEXT_PUBLIC_URL_VISITS}`;

  try {
    const response = await fetch(fullPathRequest);
    if (response.status === 404) {
      return Response.json([]);
    }
    const data = await response.json();
    return Response.json({ data: data.length || 0 });
  } catch (error) {
    console.error(`Failed getting visits from app/api: ${error}`);
    return Response.json({ data: 0 });
  }
}

export async function POST(req: NextRequest) {
  const { latitude, longitude } = await req.json();
  const fullPathRequest = `${process.env.NEXT_PUBLIC_URL_VISITS}`;
  const body = JSON.stringify({
    latitude: latitude.toString(),
    longitude: longitude.toString(),
  });
  try {
    const response = await fetch(fullPathRequest, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body,
    });
    if (response.status === 404) {
      return Response.json({ data: 0 });
    }
    const data = await response.json();
    return Response.json({ data: data.length || 0 });
  } catch (error) {
    console.error(`Failed posting visits from app/api: ${error}`);
    return Response.json({ data: 0 });
  }
}
