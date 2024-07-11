const API_KEY = import.meta.env.VITE_API_KEY;
const BASE_URL = 'https://developer.nps.gov/api/v1/parks?';

// handles the actual API call, given a starting index and a limit
async function fetchParksPage(start, limit) {
  const url = `${BASE_URL}&api_key=${API_KEY}&limit=${limit}&start=${start}`;
  const response = await fetch(url, {
    headers: {
      'accept': 'application/json',
    }
  });

  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }

  return response.json();
}
// This API is paginated, so we need to make multiple requests to get all results for a
// given state

// Uses fetchAllPages to recursively fetch all pages until all parks are retrieved.
export async function exploreParks() {
  // Number of results per request
  const limit = 50;
  // Initializes allParks to store all retrieved parks
  let allParks = [];
  // start tracks the starting index for each page.
  let start = 0;
  let total;

  async function fetchAllPages() {
    const result = await fetchParksPage(start, limit);
    allParks = allParks.concat(result.data);
    total = result.total;

    start += limit;
    // If allParks length is less than total, it makes another recursive call to fetchAllPages.
    if (allParks.length < total) {
      await fetchAllPages(); // Recursive call to fetch the next page
    }
  }

  try {
    await fetchAllPages();
    return allParks;
  } catch (error) {
    console.error('Error fetching parks:', error);
    return [];
  }
}
