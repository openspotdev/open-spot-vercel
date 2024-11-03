export async function getSpotForecastByLocation({
  latitude,
  longitude,
  language,
}: {
  latitude: string;
  longitude: string;
  language: string;
}) {
  if (!latitude.length && !longitude.length) return [];
  const fullPathRequest = `${process.env.NEXT_PUBLIC_URL_WEATHER}/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${process.env.NEXT_PUBLIC_API_KEY_WEATHER}&lang=${language}`;
  try {
    const response = await fetch(fullPathRequest);
    if (response.status === 404) {
      return {};
    }
    const states = await response.json();

    return { data: states };
  } catch (error) {
    console.error(`Failed getting states by country: ${error}`);
  }
}
