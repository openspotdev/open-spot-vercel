import { type NextRequest } from "next/server";

export async function GET(req: NextRequest) {
  const searchParams = req.nextUrl.searchParams;
  const latitude = searchParams.get("latitude");
  const longitude = searchParams.get("longitude");
  const radius = searchParams.get("radius");
  const fullPathRequest = `${process.env.NEXT_PUBLIC_URL_NEAREST_SPOT}location=${latitude},${longitude}&radius=${radius}&keyword=skatepark&key=${process.env.NEXT_PUBLIC_MAPS_API_KEY}`;
  try {
    const response = await fetch(fullPathRequest);
    if (response.status === 404) {
      return Response.json([]);
    }
    const data = await response.json();
    return Response.json({ data });
  } catch (error) {
    console.error(`Failed getting spots from app/api: ${error}`);
  }
}
