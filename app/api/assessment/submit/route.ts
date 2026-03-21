import { NextResponse } from 'next/server';
import { assessmentSubmissionSchema } from '../../../../lib/assessment/schema';
import { insertAssessmentSubmission } from '../../../../lib/mongodb';

export const runtime = 'nodejs';

export async function POST(request: Request) {
  try {
    const json = await request.json();
    const payload = assessmentSubmissionSchema.parse(json);

    await insertAssessmentSubmission({
      ...payload,
      createdAt: new Date().toISOString(),
    });

    return NextResponse.json({ ok: true });
  } catch (error) {
    if (error instanceof Error) {
      const status = error.message.includes('MONGODB_URI') ? 500 : 400;
      return NextResponse.json({ error: error.message }, { status });
    }

    return NextResponse.json({ error: 'Invalid submission payload.' }, { status: 400 });
  }
}
