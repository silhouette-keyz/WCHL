import Principal "mo:base/Principal";
import Time "mo:base/Time";
import Result "mo:base/Result";
import Int "mo:base/Int";
import Types "../types/Types";

module {
  public func registerUser(
    users : Types.Users,
    caller : Principal,
    username : Text
  ) : async Result.Result<Types.User, Text> {
    if (users.get(caller) != null) {
      return #err("User already registered");
    };

    let user : Types.User = {
      username = username;
      role = #user; // default role
      registeredAt = Int.abs(Time.now());
    };

    users.put(caller, user);
    return #ok(user);
  };

  public func updateRole(
    users : Types.Users,
    caller : Principal,
    target : Principal,
    newRole : Types.Role
  ) : async Result.Result<(), Text> {
    // Optional: validasi jika hanya superadmin boleh set role
    let callerData = users.get(caller);
    switch callerData {
      case (null) return #err("Unauthorized");
      case (?u) {
        if (u.role != #superadmin) {
          return #err("Only superadmin can update role");
        };
      };
    };

    switch (users.get(target)) {
      case null return #err("Target user not found");
      case (?user) {
        users.put(target, {
          username = user.username;
          role = newRole;
          registeredAt = user.registeredAt;
        });
        return #ok(());
      };
    };
  };
};
