export async function PostVisits({ body }: { body: string }) {
  try {
    const urlPost = `api/visits`;
    const requestOptions: RequestInit = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body,
    };
    const response = await fetch(urlPost, requestOptions);
    if (response.ok) {
      const json = await response.json();
      console.log("response ::", json);
      return json;
    }
  } catch (error) {
    console.error(`Failed post a new provider: ${error}`);
  }
}
