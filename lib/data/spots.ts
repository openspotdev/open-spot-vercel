export async function getSpotForecastByLocation({
  latitude,
  longitude,
}: {
  latitude: string;
  longitude: string;
}) {
  if (!latitude.length && !longitude.length) return [];
  const fullPathRequest = `${process.env.URL_WEATHER}/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${process.env.API_KEY_WEATHER}&lang='es'}`;

  try {
    const response = await fetch(fullPathRequest);
    if (response.status === 404) {
      return [];
    }
    const states = await response.json();
    return states.data;
  } catch (error) {
    console.error(`Failed getting states by country: ${error}`);
  }
}
