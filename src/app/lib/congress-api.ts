const CONGRESS_API_BASE_URL = 'https://api.congress.gov/v3';

export interface BillTextItem {
  text: string;
}

export interface BillTextResponse {
  items?: BillTextItem[];
}

export async function fetchBillTextVersions(congress: string, billType: string, billNumber: string): Promise<string> {
  const apiKey = process.env.CONGRESS_API_KEY;
  const url = `${CONGRESS_API_BASE_URL}/bill/${congress}/${billType}/${billNumber}/text?api_key=${apiKey}&format=json`;
  console.log(url);

  const response = await fetch(url, {
    headers: {
      'Accept': 'application/json', // Ensure response is XML
    },
  });

  if (!response.ok) {
    throw new Error(`Failed to fetch bill text versions: ${response.statusText}`);
  }

  const data: any = await response.json();

  // Access the first URL under <formats>
  const firstUrl = data.textVersions[0].formats.find((entry: { type: string, url: string }) => entry.type === 'Formatted Text')!.url;

  if (!firstUrl) {
    throw new Error('No URL found in the bill text XML');
  }

  // Fetch the text content from the first URL
  const textResponse = await fetch(firstUrl, {
    headers: {
      'Accept': 'text/plain',
    },
  });

  if (!textResponse.ok) {
    throw new Error(`Failed to fetch bill text from URL: ${textResponse.statusText}`);
  }

  const billText = await textResponse.text();
  return billText;
}
