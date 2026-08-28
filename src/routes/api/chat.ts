import { createFileRoute } from "@tanstack/react-router";
import { convertToModelMessages, streamText, type UIMessage } from "ai";

import { createGroqProvider } from "@/lib/ai-gateway.server";
import { CATALOG } from "@/lib/catalog";
import { WHATSAPP_NUMBER } from "@/lib/contact";

type ChatRequestBody = { messages?: unknown };

const catalogSummary = CATALOG.map(
  (p) =>
    `- ${p.name} (${p.category}): ${p.description} Origen: ${p.origin}. Temporada: ${p.season}. Formato: ${p.packaging}. Calibres: ${p.calibres}.`,
).join("\n");

const systemPrompt = `Eres "Fidel", el asistente virtual oficial de D'Fidel-Export e Import (empresa dominicana de importación y exportación de frutas premium).

### 🚨 REGLAS OBLIGATORIAS:
1. **CONTACTOS OFICIALES:** WhatsApp: ${WHATSAPP_NUMBER} | Correo: dfidelexport@gmail.com.
2. **PROHIBIDO INVENTAR DATOS:** No inventes teléfonos, correos o precios exactos.
3. **COTIZACIONES:** Pide producto, cantidad, destino y presentación, e indica al cliente que use el formulario en /catalogo.
4. **TONO Y ESTILO:** Responde siempre en el idioma del cliente, en tono cálido, profesional y claro (2 a 5 frases). Usa markdown ligero (listas, negritas) cuando aporte claridad.

### DATOS OFICIALES DE LA EMPRESA:
- Sede: República Dominicana.
- Horario: Lunes a Viernes de 08:00 a 18:00.
- WhatsApp: ${WHATSAPP_NUMBER}
- Correo electrónico: dfidelexport@gmail.com

### CATÁLOGO ACTUAL:
${catalogSummary}`;

export const Route = createFileRoute("/api/chat")({
  server: {
    handlers: {
      POST: async ({ request }) => {
        const { messages } = (await request.json()) as ChatRequestBody;
        if (!Array.isArray(messages)) {
          return new Response("Messages are required", { status: 400 });
        }

        const groqKey = process.env["GROQ_API_KEY"] ?? "";

        let model;
        if (groqKey) {
          const groq = createGroqProvider(groqKey);
          model = groq("openai/gpt-oss-120b");
        } else {
          return new Response(
            "Falta configurar una API key: define GROQ_API_KEY.",
            { status: 500 },
          );
        }

        const recentMessages = (messages as UIMessage[]).slice(-6);

        const result = streamText({
          model,
          system: systemPrompt,
          messages: await convertToModelMessages(recentMessages),
          temperature: 0.1,
          maxTokens: 600, // 🟢 Le da margen suficiente para responder sin cortarse
        });

        return result.toUIMessageStreamResponse({
          originalMessages: messages as UIMessage[],
        });
      },
    },
  },
});
