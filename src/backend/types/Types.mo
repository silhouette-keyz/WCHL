import Principal "mo:base/Principal";
import HashMap "mo:base/HashMap";

module {
    public type Role = { #superadmin; #admin; #user };
    public type OldUser = {
      userId : Principal;
      name : Text;
      telp : Text;
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
      userId : Principal;
      name:  Text;
      username : Text;
      telp : Text;
      role : Role;
      registeredAt : Int;
    };

    public type Users = HashMap.HashMap<Principal, User>;


    public type EventData = {
      id: Nat;
      eventName: Text;
      eventType: Text;
      eventDate: Text;
    }; 

    public type EventDatas = HashMap.HashMap<Nat, EventData>;

    public type ParticipantData = {
      eventId : Nat;
      participantId : Principal;
      name : Text;
      username : Text;
      telp : Text;
      RegisterDate : Text;
    };

    public type Attendance = {
      eventId : Nat;
      participant : Principal;
      checkInTime : Text;
    };
};
