import Principal "mo:base/Principal";
import HashMap "mo:base/HashMap";
import Result "mo:base/Result";
import Iter "mo:base/Iter";
import Text "mo:base/Text";
import Nat "mo:base/Nat";
import Hash "mo:base/Hash";
import Types "../types/Types";
import Array "mo:base/Array";
import List "mo:base/List";
import Time "mo:base/Time";
import Int "mo:base/Int";

module {
  public func natHash(n : Nat) : Hash.Hash {
    Text.hash(Nat.toText(n))
  };

  public func addEvent(eventMap: HashMap.HashMap<Nat, Types.EventData>, id: Nat, name: Text, typ: Text, date: Text) : Types.EventData {
    let evt: Types.EventData = {
      id = id;
      eventName = name;
      eventType = typ;
      eventDate = date;
    };
    eventMap.put(id, evt);
    return evt;
  };

  public func getAllEvents(eventMap: HashMap.HashMap<Nat, Types.EventData>) : [Types.EventData] {
    var result: [Types.EventData] = [];
    for ((_, v) in eventMap.entries()) {
      result := Array.append(result, [v]);
    };
    return result;
  };
}
