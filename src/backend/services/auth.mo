import Principal "mo:base/Principal";
import Time "mo:base/Time";
import Result "mo:base/Result";
import Int "mo:base/Int";
import Types "../types/Types";

module {
  public func registerUser(
    userId : Principal,
    users : Types.Users,
    name : Text,
    username : Text,
    telp : Text
  ) : async Result.Result<Types.User, Text> {
    if (users.get(userId) != null) {
      return #err("User already registered");
    };

    let user : Types.User = {
      userId = userId;
      name = name;
      telp = telp;
      username = username;
      role = #admin; // default role
      registeredAt = Int.abs(Time.now());
    };

    users.put(userId, user);
    return #ok(user);
  };

  public func registersuperadmin(
    userId : Principal,
    users : Types.Users,
    name : Text,
    username : Text,
    telp : Text
  ) : async Result.Result<Types.User, Text> {
    if (users.get(userId) != null) {
      return #err("User already registered");
    };

    let user : Types.User = {
      userId = userId;
      name = name;
      telp = telp;
      username = username;
      role = #superadmin; // default role
      registeredAt = Int.abs(Time.now());
    };

    users.put(userId, user);
    return #ok(user);
  };

  public func updateRole(
    userId : Principal,
    users : Types.Users,
    newRole : Types.Role
  ) : async Result.Result<(), Text> {
    // Optional: validasi jika hanya superadmin boleh set role
    // let callerData = users.get(userId);
    // switch callerData {
    //   case (null) return #err("Unauthorized");
    //   case (?u) {
    //     if (u.role != #superadmin or u.role != #admin or u.role != #admin) {
    //       return #err("Only superadmin or admin can update role");
    //     };
    //   };
    // };

    switch (users.get(userId)) {
      case null return #err("Target user not found");
      case (?user) {
        users.put(userId, {
          userId = user.userId;
          name = user.name;
          telp = user.telp;
          username = user.username;
          role = newRole;
          registeredAt = user.registeredAt;
        });
        return #ok(());
      };
    };
  };

  public func updateProfile(
    userId : Principal,
    name : Text,
    username : Text,
    telp : Text,
    users : Types.Users,
    ) : async Result.Result<(), Text> {
    switch (users.get(userId)) {
        case (null) {
            return #err("User tidak ditemukan.");
        };
        case (?user) {
            users.put(userId, {
                userId = userId;
                name = name;
                username = username;
                telp = telp;
                registeredAt = user.registeredAt;
                role = user.role;
            });
            return #ok(());
        };
    };
  };

};
