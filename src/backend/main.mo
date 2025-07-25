import Principal "mo:base/Principal";
import HashMap "mo:base/HashMap";
import Result "mo:base/Result";
import Iter "mo:base/Iter";
import Text "mo:base/Text";
import Nat "mo:base/Nat";
import Hash "mo:base/Hash";
import Types "types/Types";
import UserService "services/auth";
import EventService "services/event";

actor {

  private var users : Types.Users = HashMap.HashMap(0, Principal.equal, Principal.hash);
  private var events: Types.Events = HashMap.HashMap(10, Nat.equal, Hash.hash);

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
  // var nextEventId : Nat = 0;
  // public func addEvent(eventName: Text, eventType: Text, eventDate: Text) : async Result.Result<Types.Event, Text> {
  //   await EventService.addEvent(eventId : nextEventId, events, eventName, eventType, eventDate)
  //   nextEventId += 1;
  // };
};
