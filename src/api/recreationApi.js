const API_KEY = import.meta.env.VITE_API_KEY;
const BASE_URL = 'https://developer.nps.gov/api/v1';

// Function to handle the actual API call, given a starting index and a limit
async function fetchPage(url, start, limit) {
  const fullUrl = `${url}&api_key=${API_KEY}&limit=${limit}&start=${start}`;
  const response = await fetch(fullUrl, {
    headers: {
      'accept': 'application/json',
    }
  });
  if (!response.ok) {
    if (response.status === 401) {
      throw new Error('Unauthorized: Invalid API key');
    } else if (response.status === 403) {
      throw new Error('Forbidden: You do not have access to this resource');
    } else if (response.status === 404) {
      throw new Error('Not Found: The requested resource could not be found');
    } else {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
  }
  return response.json();
}

// Generic function to fetch all pages
async function fetchAllPages(fetchPageFunction, url) {
  // Number of results per request
  const limit = 50;
  // Initializes allItems to store all retrieved items
  let allItems = [];
  // start tracks the starting index for each page.
  let start = 0;
  let total;

  async function fetchPages() {
    const result = await fetchPageFunction(url, start, limit);
    allItems = allItems.concat(result.data);
    total = result.total;
    start += limit;
    // If allItems length is less than total, it makes another recursive call to fetchPages.
    if (allItems.length < total) {
      // Recursive call to fetch the next page
      await fetchPages();
    }
  }

  try {
    await fetchPages();
    return allItems;
  } catch (error) {
    console.error('Error fetching data:', error);
    return [];
  }
}

// This function fetches all parks
export async function exploreParks() {
  const parksUrl = `${BASE_URL}/parks?`;
  return fetchAllPages(fetchPage, parksUrl);
}

// This function fetches all stamp locations
export async function exploreStampLocations() {
  const stampLocationsUrl = `${BASE_URL}/passportstamplocations?`;
  return fetchAllPages(fetchPage, stampLocationsUrl);
}
