import { NextRequest, NextResponse } from 'next/server';
import { fetchBillTextVersions } from '../../lib/congress-api';

export async function GET(request: NextRequest) {
    const { searchParams } = new URL(request.url);
    const congress = searchParams.get('congress');
    const billType = searchParams.get('billType');
    const billNumber = searchParams.get('billNumber');
  
    if (!congress || !billType || !billNumber) {
      return NextResponse.json({ error: 'Missing required query parameters' }, { status: 400 });
    }
  
    try {
      const billTextVersions = await fetchBillTextVersions(congress, billType, billNumber);
      return NextResponse.json(billTextVersions);
    } catch (error) {
      console.error('Error fetching bill text versions:', error);
      return NextResponse.json({ error: 'Error fetching bill text versions' }, { status: 500 });
    }
  }