import { useEffect, useState } from "react";
import { initAuth, logout } from "./identity";

function App() {
  const [principal, setPrincipal] = useState(null);
  const [authClient, setAuthClient] = useState(null);

  useEffect(() => {
    const init = async () => {
      const client = await initAuth();
      setAuthClient(client);

      const identity = client.getIdentity();
      const userPrincipal = identity.getPrincipal().toText();
      setPrincipal(userPrincipal);
    };
    init();
  }, []);

  return (
    <main>
      <h1>🧑 Internet Identity Login</h1>

      {principal ? (
        <>
          <p><strong>Logged in as:</strong> {principal}</p>
          <button onClick={() => logout(authClient)}>Logout</button>
        </>
      ) : (
        <p>Loading or redirecting to login...</p>
      )}
    </main>
  );
}

export default App;
