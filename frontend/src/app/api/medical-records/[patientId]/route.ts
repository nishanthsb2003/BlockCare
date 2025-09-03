// Create a separate file: src/app/api/medical-records/[patientId]/route.ts
// Alternative endpoint with path parameter for cleaner URLs

import { NextRequest, NextResponse } from 'next/server';
import { createActor } from '../route';

// flaky
export async function GET(
    _request: NextRequest,
    { params }: { params: { patientId: string } }
) {
    try {
        const { patientId } = await params;

        if (!patientId) {
            return NextResponse.json(
                { error: 'Patient ID is required' },
                { status: 400 }
            );
        }

        const actor = await createActor();
        const record = await actor.getRecord(patientId);

        if (!record) {
            return NextResponse.json(
                { error: 'Medical record not found' },
                { status: 404 }
            );
        }

        console.log(record)
        const serializedRecord = {
            ...record,
            timestamp: Number(record.timestamp),
        };

        return NextResponse.json(serializedRecord, { status: 200 });
    } catch (error) {
        console.error('Error retrieving medical record:', error);
        return NextResponse.json(
            { error: 'Failed to retrieve medical record' },
            { status: 500 }
        );
    }
}
