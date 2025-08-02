import React, { createContext, useContext, useEffect, useState } from "react";
import { AuthClient } from "@dfinity/auth-client";
import { backend } from "declarations/backend";
const IDENTITY_PROVIDER_URL = "https://identity.ic0.app";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [authClient, setAuthClient] = useState(null);
  const [user, setUser] = useState({});
  const [principal, setPrincipal] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [ready, setReady] = useState(false); // authClient siap digunakan

  useEffect(() => {
    const initAuth = async () => {
      const client = await AuthClient.create();
      setAuthClient(client);

      const isAuth = await client.isAuthenticated();
      setIsAuthenticated(isAuth);

      if (isAuth) {
        const identity = await client.getIdentity();
        // setUser(identity);
        setPrincipal(identity.getPrincipal().toText());
        const res = await backend.getUser();
        if (res.ok) {
          setUser({
            userId : res.ok.userId.toText(),
            name: res.ok.name,
            username: res.ok.username,
            telp: res.ok.telp,
            role : Object.keys(res.ok.role)
          });
        }
      }

      setReady(true); // selesai inisialisasi
    };

    initAuth();
  }, []);

  const login = async () => {
    if (!authClient) return;

    await authClient.login({
      identityProvider: IDENTITY_PROVIDER_URL,
      onSuccess: async () => {
        const identity = authClient.getIdentity();
        console.log('identity', identity)
        
        const res = await backend.getUser();
        if (res.ok) {
          setUser({
            userId : res.ok.userId.toText(),
            name: res.ok.name,
            username: res.ok.username,
            telp: res.ok.telp,
            role : Object.keys(res.ok.role)
          });
        }

        setPrincipal(identity.getPrincipal().toText());
        setIsAuthenticated(true);
      }
    });
  };

  const logout = async () => {
    if (!authClient) return;

    await authClient.logout();
    setUser(null);
    setPrincipal(null);
    setIsAuthenticated(false);
  };

  return (
    <AuthContext.Provider
      value={{
        authClient,
        user,
        principal,
        isAuthenticated,
        ready,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
