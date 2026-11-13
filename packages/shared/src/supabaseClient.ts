import { createClient, SupabaseClient } from "@supabase/supabase-js";
import type { SupabaseClientOptions } from "@supabase/supabase-js";

let client: SupabaseClient | null = null;

// Initialise le client une seule fois, avec les cles fournies
// par l'application (web ou mobile). Le 3e parametre options est
// optionnel : le mobile y passe un stockage persistant (AsyncStorage),
// le web ne le passe pas et garde son comportement par defaut.
export function initSupabase(
  url: string,
  anonKey: string,
  options?: SupabaseClientOptions<"public">
): SupabaseClient {
  if (!client) {
    client = createClient(url, anonKey, options);
  }
  return client;
}

// Recupere le client deja initialise.
export function getSupabase(): SupabaseClient {
  if (!client) {
    throw new Error(
      "Supabase non initialise. Appelez initSupabase(url, key) au demarrage."
    );
  }
  return client;
}
