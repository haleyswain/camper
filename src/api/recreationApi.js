const API_KEY = import.meta.env.VUE_APP_API_KEY;
const BASE_URL = 'https://ridb.recreation.gov/api/v1';

export async function fetchCampgrounds() {
  const url = `${BASE_URL}/facilityaddresses`;

  try {
    const response = await fetch(url, {
      mode: 'no-cors',
      headers: {
        'accept': 'application/json',
        'apikey': API_KEY
      }
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching campgrounds:', error);
    return [];
  }
}
