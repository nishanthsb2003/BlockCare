// src/app/api/medical-records/route.ts
import { Actor, HttpAgent } from '@dfinity/agent';
import { NextRequest, NextResponse } from 'next/server';

// Define the interface for your Motoko actor
interface MedicalRecordsActor {
  storeRecord: (
    patientId: string,
    ipfsCid: string,
    recordHash: string,
    accessControl: string[]
  ) => Promise<void>;
  getRecord: (patientId: string) => Promise<PatientMetadata | undefined>;
}

interface PatientMetadata {
  patientId: string;
  ipfsCid: string;
  timestamp: bigint;
  recordHash: string;
  accessControl: string[];
}

// IDL definition for your canister
const idlFactory = ({ IDL }: any) => {
  const PatientMetadata = IDL.Record({
    patientId: IDL.Text,
    ipfsCid: IDL.Text,
    timestamp: IDL.Int,
    recordHash: IDL.Text,
    accessControl: IDL.Vec(IDL.Text),
  });

  return IDL.Service({
    storeRecord: IDL.Func(
      [IDL.Text, IDL.Text, IDL.Text, IDL.Vec(IDL.Text)],
      [],
      []
    ),
    getRecord: IDL.Func([IDL.Text], [IDL.Opt(PatientMetadata)], ['query']),
  });
};

// Configuration
const CANISTER_ID = process.env.MEDICAL_RECORDS_CANISTER_ID!;
const IC_HOST = process.env.IC_HOST || 'https://ic0.app';

// Create actor instance
export async function createActor(): Promise<MedicalRecordsActor> {
  const agent = new HttpAgent({ host: IC_HOST });

  // Only fetch root key in development
  if (process.env.NODE_ENV === 'development') {
    await agent.fetchRootKey();
  }

  return Actor.createActor(idlFactory, {
    agent,
    canisterId: CANISTER_ID,
  }) as MedicalRecordsActor;
}

// POST - Store a medical record
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { patientId, ipfsCid, recordHash, accessControl } = body;

    // Validation
    if (!patientId || !ipfsCid || !recordHash || !Array.isArray(accessControl)) {
      return NextResponse.json(
        { error: 'Missing required fields: patientId, ipfsCid, recordHash, accessControl' },
        { status: 400 }
      );
    }

    const actor = await createActor();
    await actor.storeRecord(patientId, ipfsCid, recordHash, accessControl);

    return NextResponse.json(
      { message: 'Medical record stored successfully', patientId },
      { status: 201 }
    );
  } catch (error) {
    console.error('Error storing medical record:', error);
    return NextResponse.json(
      { error: 'Failed to store medical record' },
      { status: 500 }
    );
  }
}

// GET - Retrieve a medical record by patient ID
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const patientId = searchParams.get('patientId');

    if (!patientId) {
      return NextResponse.json(
        { error: 'patientId query parameter is required' },
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

    // Convert BigInt timestamp to number for JSON serialization
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
