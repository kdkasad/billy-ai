import { NextRequest, NextResponse } from 'next/server';
import { generateBillWithBedrock } from '../../lib/bedrock-query';

export async function POST(req: NextRequest) {
  const { legislation, currentEvents, userQuery } = await req.json();
  
  try {
    const newBill = await generateBillWithBedrock(legislation, currentEvents, userQuery);
    return NextResponse.json({ bill: newBill });
  } catch (error) {
    console.error('Error generating bill:', error);
    return NextResponse.json({ error: 'Failed to generate bill' }, { status: 500 });
  }
}
