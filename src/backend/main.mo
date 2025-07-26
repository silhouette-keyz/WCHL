import Principal "mo:base/Principal";
import HashMap "mo:base/HashMap";
import Result "mo:base/Result";
import Iter "mo:base/Iter";
import Text "mo:base/Text";
import Nat "mo:base/Nat";
import Hash "mo:base/Hash";
import Types "types/Types";
import UserService "services/auth";
import Array "mo:base/Array";
import List "mo:base/List";
import Time "mo:base/Time";
import Int "mo:base/Int";

// Untuk hash SHA256

actor {

  private var users : Types.Users = HashMap.HashMap(0, Principal.equal, Principal.hash);
  

  // Simpanan versi lama
  private stable var stableUsers : [(Principal, Types.OldUser)] = [];

  // Upgrade Hook
system func preupgrade() {
  stableUsers := Iter.toArray(
    Iter.map<(Principal, Types.User), (Principal, Types.OldUser)>(
      users.entries(),
      func(pair: (Principal, Types.User)) : (Principal, Types.OldUser) {
        let (p, u) = pair;
        (p, {
          userId = u.userId;
          name = u.name;
          telp = u.telp;
          username = u.username;
          role = roleToText(u.role);
          registeredAt = u.registeredAt;
        });
      }
    )
  );
};



system func postupgrade() {
  users := HashMap.fromIter(
    Iter.map<(Principal, Types.OldUser), (Principal, Types.User)>(
      stableUsers.vals(),
      func(pair: (Principal, Types.OldUser)) : (Principal, Types.User) {
        let (p, old) = pair;
        (p, {
          userId = old.userId;
          name = old.name;
          telp = old.telp;
          username = old.username;
          role = textToRole(old.role);
          registeredAt = old.registeredAt;
        });
      }
    ),
    0,
    Principal.equal,
    Principal.hash
  );
  stableUsers := [];
};



  // konversi helper
  func roleToText(role : Types.Role) : Text {
    switch (role) {
      case (#superadmin) "superadmin";
      case (#admin) "admin";
      case (#user) "user";
    }
  };

  func textToRole(text : Text) : Types.Role {
    switch (Text.toLowercase(text)) {
      case ("superadmin") #superadmin;
      case ("admin") #admin;
      case _ #user;
    }
  };

  // Handler
  public shared (msg) func registerUser(name : Text, username : Text, telp : Text) : async Result.Result<Types.User, Text> {
    await UserService.registerUser(msg.caller, users, name, username, telp)
  };

  public shared (msg) func registersuperadmin(name : Text, username : Text, telp : Text) : async Result.Result<Types.User, Text> {
    await UserService.registersuperadmin(msg.caller, users, name, username, telp)
  };

  public query func getUserByPrincipal(userId : Principal) : async ?Types.User {
    users.get(userId)
  };

  public shared (msg) func getUser() : async Result.Result<Types.User, Text> {
    switch (users.get(msg.caller)) {
        case (null) { #err("User belum terdaftar") };
        case (?user) { #ok(user) };
    }
  };

  public query func getAllUsers() : async [(Principal, Types.User)] {
    Iter.toArray(users.entries())
  };

  public shared (msg) func updateUserRole(newRole : Types.Role) : async Result.Result<(), Text> {
    await UserService.updateRole(msg.caller, users, newRole)
  };

  public shared (msg) func updateProfile(name : Text, username : Text, telp : Text) : async Result.Result<(), Text> {
    await UserService.updateProfile(msg.caller, name, username, telp, users)
  };

  //Events
  
  // ---------- Tipe Data ----------
  public type EventData = {
      id: Nat;
      eventName: Text;
      eventType: Text;
      eventDate: Text;
  };
  var nextEventId : Nat = 0;
  let eventMap = HashMap.HashMap<Nat, EventData>(10, Nat.equal, Hash.hash);

  public func addEventData(eventName: Text, eventType: Text, eventDate: Text) : async Nat {
    let _event: EventData = {
      id = nextEventId;
      eventName = eventName;
      eventType = eventType;
      eventDate = eventDate;
    };
    eventMap.put(_event.id, _event);
    nextEventId += 1;
    return _event.id;
  };

  public query func getAllEventData() : async [EventData] {
    var result : [EventData] = [];
    for ((_, k) in eventMap.entries()) {
      result := Array.append(result, [k]);
    };
    return result;
  };

  // Join Event
  type ParticipantData = {
    eventId : Nat;
    participantId : Principal;
    name : Text;
    username : Text;
    telp : Text;
    RegisterDate : Text;
  };

  // Map eventId -> array of Principal (peserta yang join event)
  let participantMap = HashMap.HashMap<Nat, ParticipantData>(10, Nat.equal, Hash.hash);

  let now = Time.now(); // waktu dalam nanodetik (Int)
  let nowSeconds = now / 1_000_000_000;
  let nowText = Int.toText(nowSeconds); // hasilnya berupa detik sejak epoch (1970)
 
 public shared (msg) func joinEvent(eventId: Nat) : async Nat {
    let caller = msg.caller;
    switch (users.get(caller)) {
      case (?user) {
        let peserta: ParticipantData = {
          eventId = eventId;
          participantId =  caller;
          name = user.name;
          username = user.username;
          telp = user.telp;
          RegisterDate = nowText; // string dari timestamp
        };
        participantMap.put(peserta.eventId, peserta);
        return peserta.eventId;
      }
    }
    
  };

  // Fungsi untuk mengambil semua participant dari event tertentu
  public query func getParticipantEvent(eventId: Nat) : async [ParticipantData] {
    var result : [ParticipantData] = [];
    for ((_, p) in participantMap.entries()) {
      if (p.eventId == eventId) {
        result := Array.append(result, [p]);
      };
    };
    return result;
  };


  //Attendance
  type Attendance = {
    eventId : Nat;
    participant : Principal;
    checkInTime : Text;
  };

  type Certificate = {
    eventId : Nat;
    participantId : Principal;
    certificateHash : Text; // Hash(Event + Participant + Timestamp)
  };

  let certMap = HashMap.HashMap<Principal, Certificate>(10, Principal.equal, Principal.hash);
  let participantIndex = HashMap.HashMap<Principal, List.List<Certificate>>(10, Principal.equal, Principal.hash);
  let eventIndex = HashMap.HashMap<Nat, List.List<Certificate>>(10, Nat.equal, Hash.hash);

  public shared (msg) func createCertificate(
    eventId: Nat,
    certificateHash: Text
  ) : async Result.Result<Certificate, Text> {
    let caller = msg.caller;
    let cert : Certificate = {
      eventId = eventId;
      participantId = caller;
      certificateHash = certificateHash;
    };

    certMap.put(caller, cert);

    // Tambahkan ke participantIndex
    switch (participantIndex.get(caller)) {
      case (?list) {
        participantIndex.put(caller, List.push(cert, list));
      };
      case null {
        participantIndex.put(caller, List.push(cert, List.nil<Certificate>()));
      };
    };

    // ✅ Tambahkan ke eventIndex
    switch (eventIndex.get(eventId)) {
      case (?list) {
        eventIndex.put(eventId, List.push(cert, list));
      };
      case null {
        eventIndex.put(eventId, List.push(cert, List.nil<Certificate>()));
      };
    };
    return #ok(cert);
  };

  public query func getAllCertificate() : async [Certificate] {
    var result : [Certificate] = [];
    for ((_, k) in certMap.entries()) {
      result := Array.append(result, [k]);
    };
    return result;
  };
  // 1️⃣ Get semua sertifikat berdasarkan Event
  public query func getCertificatesByEvent(eventId: Nat) : async [Certificate] {
    switch (eventIndex.get(eventId)) {
      case (?list) return List.toArray(list);
      case (_) return [];
    }
  };

  // 2️⃣ Ambil semua sertifikat berdasarkan participant yang sedang login (caller)
  public shared query (msg) func getMyCertificates() : async [Certificate] {
    switch (participantIndex.get(msg.caller)) {
      case (?list) return List.toArray(list);
      case (_) return [];
    }
  };

  // 3️⃣ Get satu sertifikat berdasarkan Event + Participant
  // public shared query (msg) func getCertificateByEventAndParticipant(eventId: Nat) : async ?Certificate {
  //   certMap.get((eventId, msg.caller));
  // };
};
