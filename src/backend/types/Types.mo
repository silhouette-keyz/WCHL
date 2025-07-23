import Principal "mo:base/Principal";
import HashMap "mo:base/HashMap";

module {
  public type User = {
    username : Text;
    role : Text;
    registeredAt : Int;
  };

  public type Users = HashMap.HashMap<Principal, User>;
};
