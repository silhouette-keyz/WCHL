import Principal "mo:base/Principal";
import Time "mo:base/Time";
import Result "mo:base/Result";
import Text "mo:base/Text";
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
      role = "user";
      registeredAt = Int.abs(Time.now());
    };

    users.put(caller, user);
    return #ok(user);
  };
};
