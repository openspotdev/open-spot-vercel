import { type NextRequest } from "next/server";

export async function GET(req: NextRequest) {
  const searchParams = req.nextUrl.searchParams;
  const latitude = searchParams.get("latitude1");
  const longitude = searchParams.get("longitude1");
  const latitude2 = searchParams.get("latitude2");
  const longitude2 = searchParams.get("longitude2");
  const fullPathRequest = `${process.env.NEXT_PUBLIC_URL_DISTANCE}origins=${latitude},${longitude}&destinations=${latitude2},${longitude2}&key=${process.env.NEXT_PUBLIC_MAPS_API_KEY}`;

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
