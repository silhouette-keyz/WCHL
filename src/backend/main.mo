import Principal "mo:base/Principal";
import HashMap "mo:base/HashMap";
import Result "mo:base/Result";
import Iter "mo:base/Iter";
import Text "mo:base/Text";


import Types "types/Types";
import UserService "services/auth";

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
  public shared (msg) func registerUser(username : Text) : async Result.Result<Types.User, Text> {
    await UserService.registerUser(users, msg.caller, username)
  };

  public query func getUserByPrincipal(userId : Principal) : async ?Types.User {
    users.get(userId)
  };

  public shared (msg) func updateUserRole(target : Principal, newRole : Types.Role) : async Result.Result<(), Text> {
    await UserService.updateRole(users, msg.caller, target, newRole)
  };
};
