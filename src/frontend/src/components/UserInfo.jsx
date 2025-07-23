import React, { useEffect, useState } from "react";
import { getActor, getPrincipal } from "../utils/ic";

export default function UserInfo() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const fetchOrRegister = async () => {
      const actor = getActor();
      const principal = getPrincipal();

      let user = await actor.getUserByPrincipal(principal);

      if (!user) {
        const randomUsername = "user" + Math.floor(Math.random() * 10000);
        const result = await actor.registerUser(randomUsername);
        if ("ok" in result) user = result.ok;
      }

      setUser(user);
    };

    fetchOrRegister();
  }, []);

  if (!user) return <div>Loading user...</div>;

  return (
    <div className="text-sm text-gray-700">
      <p>👤 Username: <b>{user.username}</b></p>
      <p>🔐 Role: <b>{user.role}</b></p>
      <p>🆔 Principal: <b>{getPrincipal()}</b></p>
    </div>
  );
}
