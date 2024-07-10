const API_KEY = import.meta.env.VITE_API_KEY;
const BASE_URL = 'https://developer.nps.gov/api/v1/parks?';

export async function exploreParks() {
  const url = `${BASE_URL}&api_key=${API_KEY}`;

  try {
    const response = await fetch(url, {
      headers: {
        'accept': 'application/json',
      }
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const { data } = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching campgrounds:', error);
    return [];
  }
}
