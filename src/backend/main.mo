import Principal "mo:base/Principal";
import HashMap "mo:base/HashMap";
import Result "mo:base/Result";
import Iter "mo:base/Iter";
import Text "mo:base/Text";

import Types "types/Types";
import UserService "services/auth";

actor {

  // ========== STORAGE ==========
  private var users : Types.Users = HashMap.HashMap(0, Principal.equal, Principal.hash);
  private stable var stableUsers : [(Principal, Types.User)] = [];

  // ========== UPGRADE HOOK ==========
  system func preupgrade() {
    stableUsers := Iter.toArray(users.entries());
  };

  system func postupgrade() {
    users := HashMap.fromIter(stableUsers.vals(), 0, Principal.equal, Principal.hash);
    stableUsers := [];
  };

  // ========== USER HANDLER ==========
  public shared (msg) func registerUser(username : Text) : async Result.Result<Types.User, Text> {
    await UserService.registerUser(users, msg.caller, username)
  };


  public query func getUserByPrincipal(userId : Principal) : async ?Types.User {
    users.get(userId)
  };
};
