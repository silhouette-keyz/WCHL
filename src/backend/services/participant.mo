import Types "../types/Types";
import HashMap "mo:base/HashMap";
import Text "mo:base/Text";
import Array "mo:base/Array";
import Time "mo:base/Time";
import Int "mo:base/Int";
import Principal "mo:base/Principal";

module {
  public func joinEvent(
    eventId: Nat,
    caller: Principal,
    users: Types.Users,
    participantMap: HashMap.HashMap<Nat, Types.ParticipantData>
  ) : async ?Types.ParticipantData {
    switch (users.get(caller)) {
      case null { null };
      case (?user) {
        let now = Int.toText(Time.now() / 1_000_000_000);
        let p: Types.ParticipantData = {
          eventId = eventId;
          participantId = caller;
          name = user.name;
          username = user.username;
          telp = user.telp;
          RegisterDate = now;
        };
        participantMap.put(eventId, p);
        return ?p;
      };
    }
  };

  public func getParticipants(
    eventId: Nat,
    participantMap: HashMap.HashMap<Nat, Types.ParticipantData>
  ) : [Types.ParticipantData] {
    var result : [Types.ParticipantData] = [];
    for ((_, p) in participantMap.entries()) {
      if (p.eventId == eventId) {
        result := Array.append(result, [p]);
      };
    };
    return result;
  };
}
