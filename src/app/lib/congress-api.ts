export interface BillTextItem {
  text: string;
}

export interface BillTextResponse {
  items?: BillTextItem[];
}

import fetch from 'node-fetch';
import dotenv from 'dotenv';

dotenv.config();

const CONGRESS_API_BASE_URL = 'https://api.congress.gov/v3';

export async function fetchBillTextVersions(congress: string, billType: string, billNumber: string): Promise<BillTextResponse> {
  const apiKey = process.env.CONGRESS_API_KEY;
  const url = `${CONGRESS_API_BASE_URL}/bill/${congress}/${billType}/${billNumber}/text?api_key=${apiKey}`;
  console.log(url)
  const response = await fetch(url, {
    headers: {
      'Accept': 'application/json',
    },
  });

  if (!response.ok) {
    throw new Error(`Failed to fetch bill text versions: ${response.statusText}`);
  }

  const data: BillTextResponse = await response.json() as BillTextResponse;
  return data;
}