import React, { useEffect, useState } from "react";
import { AuthClient } from "@dfinity/auth-client";
import Layout from "../components/Layout/Layout";
import { getActorInstance } from "../utils/actor";
import { Principal } from "@dfinity/principal";

function Dashboard() {
  const [principal, setPrincipal] = useState(null);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Load principal
  useEffect(() => {
    const loadIdentity = async () => {
      const authClient = await AuthClient.create();
      if (await authClient.isAuthenticated()) {
        const identity = authClient.getIdentity();
        setPrincipal(identity.getPrincipal().toText());
      }
      setLoading(false);
    };
    loadIdentity();
  }, []);

  // Register & Fetch user after principal is set
  useEffect(() => {
    if (!principal) return;

    const fetchUser = async () => {
      const actor = await getActorInstance();

let userData = await actor.getUserByPrincipal(Principal.fromText(principal));
      if (!userData) {
        const randomUsername = "user" + Math.floor(Math.random() * 10000);
        const result = await actor.registerUser(randomUsername);
        if ("ok" in result) {
          userData = result.ok;
        }
      }

      setUser(userData);
    };

    fetchUser();
  }, [principal]);

  const handleLogout = async () => {
    const authClient = await AuthClient.create();
    await authClient.logout();
    window.location.href = "/";
  };

  const handleLogin = async () => {
    const authClient = await AuthClient.create();
    await authClient.login({
      identityProvider: "https://identity.ic0.app/#authorize",
      onSuccess: async () => {
        const identity = authClient.getIdentity();
        setPrincipal(identity.getPrincipal().toText());
      },
    });
  };

  if (loading) {
    return <div className="p-8 text-center">Memuat...</div>;
  }

  if (!principal) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <div className="bg-white p-8 rounded shadow text-center">
          <h2 className="text-xl font-bold mb-4">Proof of Attendance</h2>
          <p className="mb-6">Silakan login terlebih dahulu menggunakan Internet Identity</p>
          <button
            onClick={handleLogin}
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded"
          >
            Login dengan Internet Identity
          </button>
        </div>
      </div>
    );
  }

  return (
    <Layout principal={principal} onLogout={handleLogout}>
      <h2 className="text-xl text-center font-semibold mb-4">
        Selamat datang di Dashboard!
      </h2>
      {user ? (
        <div className="text-center">
          <p className="mb-1">👤 <strong>Username:</strong> {user.username}</p>
          <p className="mb-1">🔐 <strong>Role:</strong> {user.role}</p>
          <p className="mb-1">🕒 <strong>Registered At:</strong> {new Date(user.registeredAt / 1_000_000).toLocaleString()}</p>
        </div>
      ) : (
        <div className="text-center text-gray-500">Loading user info...</div>
      )}
    </Layout>
  );
}

export default Dashboard;
