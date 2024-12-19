export async function getSpotWeatherByLocation({
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
    const wheater = await response.json();

    return { data: wheater };
  } catch (error) {
    console.error(`Failed getting states by country: ${error}`);
  }
}

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
  const fullPathRequest = `${process.env.NEXT_PUBLIC_URL_WEATHER}/data/2.5/forecast?lat=${latitude}&lon=${longitude}&appid=${process.env.NEXT_PUBLIC_API_KEY_WEATHER}&lang=${language}`;
  try {
    const response = await fetch(fullPathRequest);
    if (response.status === 404) {
      return {};
    }
    const forecast = await response.json();

    return { data: forecast };
  } catch (error) {
    console.error(`Failed getting states by country: ${error}`);
  }
}
