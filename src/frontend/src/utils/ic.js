import { AuthClient } from "@dfinity/auth-client";
import { createActor } from "../../../declarations/backend";

let authClient = null;
let actor = null;
let principal = null;

export async function initAuth() {
  authClient = await AuthClient.create();

  if (!authClient.isAuthenticated()) {
    await authClient.login({
      identityProvider: "https://identity.ic0.app",
      onSuccess: async () => {
        window.location.reload();
      },
    });
  }

  const identity = authClient.getIdentity();
  actor = createActor('uxrrr-q7777-77774-qaaaq-cai', {
    agentOptions: { identity },
     host: "http://127.0.0.1:4943", // tambahkan ini!
  });
  principal = identity.getPrincipal().toText();
}

export function getActor() {
  return actor;
}

export function getPrincipal() {
  return principal;
}

export async function logout() {
  await authClient.logout();
  window.location.reload();
}
