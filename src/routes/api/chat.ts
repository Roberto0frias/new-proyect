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

const systemPrompt = `Eres "Fidel", el asistente virtual de D'Fidel-Export e Import, una empresa española de importación y exportación de frutas premium.

Reglas:
- Responde siempre en el idioma del cliente (por defecto español), en tono cálido, profesional y breve (2-5 frases).
- Ayuda con: catálogo y disponibilidad, temporadas, orígenes, calibres, formatos de caja, logística y cadena de frío, y cómo solicitar una cotización.
- Para cotizaciones, pide producto, cantidad, destino y presentación, y luego indica al cliente que use el formulario de cotización de la página /catalogo.
- No inventes precios, certificaciones ni plazos exactos: indica que el equipo comercial confirma precio y disponibilidad según lote y destino.
- Datos de la empresa: sede en España, horario Lun-Vie 08:00-18:00, contacto comercial ${WHATSAPP_NUMBER}.
- Usa markdown ligero (listas, negritas) cuando aporte claridad.

Catálogo actual:
${catalogSummary}`;

export const Route = createFileRoute("/api/chat")({
  server: {
    handlers: {
      POST: async ({ request }) => {
        const { messages } = (await request.json()) as ChatRequestBody;
        if (!Array.isArray(messages)) {
          return new Response("Messages are required", { status: 400 });
        }

        // ── Elige el proveedor de IA ──────────────────────────────────────
        // Opción gratuita: Groq. Configura tu clave en un archivo .env como:
        // GROQ_API_KEY=tu_clave_aqui (o defínela como variable de entorno en Render).
        const groqKey = process.env["GROQ_API_KEY"] ?? "";

        let model;
        if (groqKey) {
          const groq = createGroqProvider(groqKey);
          model = groq("llama-3.3-70b-versatile"); // modelo gratuito de Groq
        } else {
          return new Response(
            "Falta configurar una API key: define GROQ_API_KEY (gratis, ver src/lib/ai-gateway.server.ts).",
            { status: 500 },
          );
        }

        const result = streamText({
          model,
          system: systemPrompt,
          messages: await convertToModelMessages(messages as UIMessage[]),
        });

        return result.toUIMessageStreamResponse({
          originalMessages: messages as UIMessage[],
        });
      },
    },
  },
});
