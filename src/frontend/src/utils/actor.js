import { AuthClient } from "@dfinity/auth-client";
import { createActor } from "../../../declarations/backend";

let actor = null;

export async function getActorInstance() {
  if (actor) return actor;

  const authClient = await AuthClient.create();
  const identity = authClient.getIdentity();

  actor = createActor('uxrrr-q7777-77774-qaaaq-cai', {
    agentOptions: { identity },
     host: "http://127.0.0.1:4943", // tambahkan ini!
  });

  return actor;
}
