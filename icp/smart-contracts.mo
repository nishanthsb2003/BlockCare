import Nat "mo:base/Nat";
import Time "mo:base/Time";
import HashMap "mo:base/HashMap";
import Iter "mo:base/Iter";

actor MedicalRecords {

  public type RecordMeta = {
    id : Nat;
    patientId : Text;
    doctorId : Text;
    recordType : Text; // e.g., "Prescription", "Lab Report"
    cid : Text; // IPFS hash of file
    uploadedAt : Int; // Timestamp
    description : Text; // Short description
  };

  stable var nextId : Nat = 0;
  stable var records = HashMap.HashMap<Nat, RecordMeta>(10, Nat.equal, Nat.hash);

  // Add new record
  public func addRecord(
    patientId : Text,
    doctorId : Text,
    recordType : Text,
    cid : Text,
    description : Text,
  ) : async Nat {
    let id = nextId;
    let record : RecordMeta = {
      id = id;
      patientId = patientId;
      doctorId = doctorId;
      recordType = recordType;
      cid = cid;
      uploadedAt = Time.now();
      description = description;
    };
    records.put(id, record);
    nextId += 1;
    return id; // Get record by ID

  };

  // Get record by ID
  public query func getRecordById(id : Nat) : async ?RecordMeta {
    return records.get(id);
  };

  // Get all records for a specific patient
  public query func getRecordsByPatient(patientId : Text) : async [RecordMeta] {
    Iter.toArray(
      Iter.filter<RecordMeta>(
        records.vals(),
        func(r : RecordMeta) : Bool { r.patientId == patientId },
      )
    );
  };

  // Get all records
  public query func getAllRecords() : async [RecordMeta] {
    Iter.toArray(records.vals());
  };
};
