import { NextResponse } from 'next/server';
import { auditWebsite } from '../../../../lib/assessment/audit';
import { auditRequestSchema } from '../../../../lib/assessment/schema';

export const runtime = 'nodejs';

export async function POST(request: Request) {
  try {
    const json = await request.json();
    const payload = auditRequestSchema.parse(json);
    const response = await auditWebsite(payload);
    return NextResponse.json(response);
  } catch (error) {
    if (error instanceof Error) {
      return NextResponse.json({ error: error.message }, { status: 400 });
    }

    return NextResponse.json({ error: 'Invalid audit request.' }, { status: 400 });
  }
}
