export async function getSpotWeatherByLocation({
  latitude,
  longitude,
  language,
}: {
  latitude: string;
  longitude: string;
  language: string;
}) {
  console.log("latitude", latitude);
  console.log("longitude", longitude);
  console.log("language", language);
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

export async function getNearestSpotByLocation({
  latitude,
  longitude,
  radius,
}: {
  latitude: number;
  longitude: number;
  radius: number;
}) {
  if (!latitude || !longitude) return [];
  const fullPathRequest = `/api/google-maps?latitude=${latitude}&longitude=${longitude}&radius=${radius}`;

  try {
    const response = await fetch(fullPathRequest);

    const spots = await response.json();
    return { spots: spots.data.results };
  } catch (error) {
    console.error(`Failed getting nearest spots: ${error}`);
    return { data: [], error: error.message }; // Return empty data with error
  }
}

export async function getSpotDistanceByLocation({
  latitude1,
  longitude1,
  latitude2,
  longitude2,
}: {
  latitude1: string;
  longitude1: string;
  latitude2: string;
  longitude2: string;
}) {
  if (!latitude1 || !longitude1 || !latitude2 || !longitude2) return [];
  const fullPathRequest = `/api/distance?latitude1=${latitude1}&longitude1=${longitude1}&latitude2=${latitude2}&longitude2=${longitude2}`;

  try {
    const response = await fetch(fullPathRequest);

    const distance = await response.json();
    return { distance: distance.data.rows[0].elements[0].distance.text };
  } catch (error) {
    console.error(`Failed getting nearest spots: ${error}`);
    return { data: [], error: error.message }; // Return empty data with error
  }
}
