
// src/types/medical-records.ts
export interface PatientMetadata {
    patientId: string;
    ipfsCid: string;
    timestamp: bigint | number;
    recordHash: string;
    accessControl: string[];
}

export interface StoreRecordRequest {
    patientId: string;
    ipfsCid: string;
    recordHash: string;
    accessControl: string[];
}

export interface ApiResponse<T = any> {
    data?: T;
    error?: string;
    message?: string;
}

// src/lib/ic-actor.ts
import { Actor, HttpAgent } from '@dfinity/agent';

export interface MedicalRecordsActor {
    storeRecord: (
        patientId: string,
        ipfsCid: string,
        recordHash: string,
        accessControl: string[]
    ) => Promise<void>;
    getRecord: (patientId: string) => Promise<PatientMetadata | undefined>;
}

// IDL definition for your canister
export const medicalRecordsIdlFactory = ({ IDL }: any) => {
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

export async function createMedicalRecordsActor(
    canisterId: string,
    host: string = 'https://ic0.app'
): Promise<MedicalRecordsActor> {
    const agent = new HttpAgent({ host });

    // Only fetch root key in development
    if (process.env.NODE_ENV === 'development') {
        await agent.fetchRootKey();
    }

    return Actor.createActor(medicalRecordsIdlFactory, {
        agent,
        canisterId,
    }) as MedicalRecordsActor;
}

// src/lib/validation.ts
import { z } from 'zod';

export const storeRecordSchema = z.object({
    patientId: z.string().min(1, 'Patient ID is required'),
    ipfsCid: z.string().min(1, 'IPFS CID is required'),
    recordHash: z.string().min(1, 'Record hash is required'),
    accessControl: z.array(z.string()).min(1, 'At least one access control entry is required'),
});

export const getRecordSchema = z.object({
    patientId: z.string().min(1, 'Patient ID is required'),
});

// package.json dependencies to add:
/*
{
  "dependencies": {
    "@dfinity/agent": "^0.19.2",
    "@dfinity/candid": "^0.19.2",
    "@dfinity/principal": "^0.19.2",
    "zod": "^3.22.4"
  }
}
*/
