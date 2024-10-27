// pages/api/shorten-url.ts
// import type { NextApiRequest, NextApiResponse } from "next";

import { type NextRequest } from "next/server";

export async function GET(req: NextRequest) {
  const searchParams = req.nextUrl.searchParams;
  const country = searchParams.get("country");
  const state = searchParams.get("state");
  const fullPathRequest = `${process.env.NEXT_PUBLIC_URL_SHORT_URL}/location/country/${country}/state/${state}/cities`;
  try {
    const response = await fetch(fullPathRequest);
    if (response.status === 404) {
      return Response.json([]);
    }
    const data = await response.json();
    return Response.json({ data });
  } catch (error) {
    console.error(`Failed getting cities from app/api: ${error}`);
  }
}
