import Time "mo:base/Time";
import Array "mo:base/Array";

type PatientMetadata = {
  patientId: Text;
  ipfsCid: Text;
  timestamp: Time.Time;
  recordHash: Text;
  accessControl: [Text];
};

actor MedicalRecords {
  stable var records: [PatientMetadata] = [];

  public func storeRecord(patientId: Text, ipfsCid: Text, recordHash: Text, accessControl: [Text]) : async () {
    let timestamp = Time.now();
    let metadata: PatientMetadata = {
      patientId = patientId;
      ipfsCid = ipfsCid;
      timestamp = timestamp;
      recordHash = recordHash;
      accessControl = accessControl;
    };
    records := Array.append(records, [metadata]);
  };

  public query func getRecord(patientId: Text) : async ?PatientMetadata {
    switch (Array.find(records, func(r: PatientMetadata) : Bool { r.patientId == patientId })) {
      case (?record) { ?record };
      case null { null };
    }
  };
}
