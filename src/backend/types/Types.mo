import Principal "mo:base/Principal";
import HashMap "mo:base/HashMap";

module {
public type Role = { #superadmin; #admin; #user };


    public type OldUser = {
    username : Text;
    role : Text;
    registeredAt : Int;
    };

    public func roleToText(role : Role) : Text {
    switch (role) {
        case (#superadmin) { "superadmin" };
        case (#admin) { "admin" };
        case (#user) { "user" };
    }
    };

    public func textToRole(t : Text) : Role {
    if (t == "superadmin") return #superadmin;
    if (t == "admin") return #admin;
    #user;
    };
  public type User = {
    username : Text;
    role : Role;
    registeredAt : Int;
  };

  public type Users = HashMap.HashMap<Principal, User>;
};
