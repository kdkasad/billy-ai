import { NextRequest, NextResponse } from 'next/server';
import { generateBillWithBedrock } from '../../lib/bedrock-query';

export async function POST(req: NextRequest) {
  const { congress, billType, billNumber, userQuery } = await req.json();

  if (!congress || !billType || !billNumber || !userQuery) {
    return NextResponse.json({ error: 'Missing required parameters' }, { status: 400 });
  }

  try {
    const newBill = await generateBillWithBedrock(congress, billType, billNumber, userQuery);
    return NextResponse.json({ bill: newBill });
  } catch (error) {
    console.error('Error generating bill:', error);
    return NextResponse.json({ error: 'Failed to generate bill' }, { status: 500 });
  }
}
