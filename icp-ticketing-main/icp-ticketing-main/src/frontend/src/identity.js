import { AuthClient } from "@dfinity/auth-client";

const IDENTITY_PROVIDER_URL = "https://identity.ic0.app"; // default Internet Identity

export async function initAuth() {
  const authClient = await AuthClient.create();

  if (!await authClient.isAuthenticated()) {
    await authClient.login({
      identityProvider: IDENTITY_PROVIDER_URL,
      onSuccess: () => {
        console.log("Login success!");
        window.location.reload(); // refresh page
      }
    });
  }

  return authClient;
}

export async function logout(authClient) {
  await authClient.logout();
  window.location.reload();
}
