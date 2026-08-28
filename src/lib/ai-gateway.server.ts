import { createOpenAICompatible } from "@ai-sdk/openai-compatible";

// ── Proveedor de IA (Groq) ────────────────────────────────────────────────
// 1. Crea una cuenta gratis en https://console.groq.com
// 2. Genera una API key en https://console.groq.com/keys
// 3. Guárdala en tu archivo .env como: GROQ_API_KEY=tu_clave_aqui
//    (o pégala directamente donde se llama a esta función, en chat.ts)
export function createGroqProvider(apiKey: string) {
  return createOpenAICompatible({
    name: "groq",
    baseURL: "https://api.groq.com/openai/v1",
    headers: { Authorization: `Bearer ${apiKey}` },
  });
}
