import { useChat } from "@ai-sdk/react";
import { DefaultChatTransport } from "ai";
import { MessageCircle, X } from "lucide-react";
import { useEffect, useRef, useState } from "react";

import {
  Conversation,
  ConversationContent,
  ConversationScrollButton,
} from "@/components/ai-elements/conversation";
import { Message, MessageContent, MessageResponse } from "@/components/ai-elements/message";
import {
  PromptInput,
  PromptInputFooter,
  PromptInputSubmit,
  PromptInputTextarea,
} from "@/components/ai-elements/prompt-input";
import { Shimmer } from "@/components/ai-elements/shimmer";

const SUGGESTIONS = [
  "¿Qué frutas tienen disponibles ahora?",
  "¿Cómo solicito una cotización?",
  "¿Qué calibres manejan de aguacate Hass?",
];

function BrandMark({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
      <path d="M15.362 5.214A8.252 8.252 0 0 1 12 21 8.25 8.25 0 0 1 6.038 7.048 8.287 8.287 0 0 0 9 9.6a8.983 8.983 0 0 1 3.361-6.867 8.21 8.21 0 0 0 3 2.48Z" />
      <path d="M12 18a3.75 3.75 0 0 0 .495-7.467 5.99 5.99 0 0 0-1.925 3.546 5.974 5.974 0 0 1-1.57 3.98Z" />
    </svg>
  );
}

export function ChatWidget() {
  const [open, setOpen] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const textareaRef = useRef<HTMLTextAreaElement | null>(null);

  const { messages, sendMessage, status } = useChat({
    transport: new DefaultChatTransport({ api: "/api/chat" }),
    onError: (err) =>
      setError(
        err.message.includes("402")
          ? "El asistente no está disponible ahora mismo. Inténtalo más tarde."
          : "Hubo un problema al responder. Vuelve a intentarlo.",
      ),
  });

  const isLoading = status === "submitted" || status === "streaming";

  useEffect(() => {
    if (open) textareaRef.current?.focus();
  }, [open, status]);

  const send = (text: string) => {
    const value = text.trim();
    if (!value || isLoading) return;
    setError(null);
    void sendMessage({ text: value });
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-3">
      {open && (
        <div className="w-[min(92vw,23rem)] h-[min(70vh,32rem)] flex flex-col overflow-hidden rounded-2xl bg-brand-surface shadow-2xl ring-1 ring-black/10">
          <div className="flex items-center gap-3 bg-brand-primary px-4 py-3 text-brand-surface">
            <div className="size-9 rounded-full bg-brand-surface/15 flex items-center justify-center">
              <BrandMark className="size-5" />
            </div>
            <div className="min-w-0">
              <p className="font-display text-sm font-medium leading-tight">Fidel · Asistente</p>
              <p className="text-[11px] opacity-80">Frutas premium · respuesta inmediata</p>
            </div>
            <button
              onClick={() => setOpen(false)}
              aria-label="Cerrar chat"
              className="ml-auto rounded-full p-1.5 hover:bg-brand-surface/15 transition-colors"
            >
              <X className="size-4" />
            </button>
          </div>

          <Conversation className="flex-1 min-h-0">
            <ConversationContent className="gap-3 px-4 py-4">
              {messages.length === 0 ? (
                <div className="space-y-4">
                  <p className="text-sm text-muted-foreground text-pretty">
                    ¡Hola! Soy Fidel. Pregúntame por nuestro catálogo, temporadas, calibres o cómo
                    pedir una cotización.
                  </p>
                  <div className="flex flex-col gap-2">
                    {SUGGESTIONS.map((s) => (
                      <button
                        key={s}
                        onClick={() => send(s)}
                        className="text-left text-xs rounded-xl border border-border px-3 py-2 text-brand-ink hover:border-brand-primary/40 hover:bg-secondary/60 transition-colors"
                      >
                        {s}
                      </button>
                    ))}
                  </div>
                </div>
              ) : (
                messages.map((message) => {
                  const text = message.parts
                    .map((part) => (part.type === "text" ? part.text : ""))
                    .join("");
                  return (
                    <Message from={message.role} key={message.id}>
                      <MessageContent
                        className={
                          message.role === "user"
                            ? "bg-brand-primary text-brand-surface"
                            : "bg-transparent p-0 text-brand-ink"
                        }
                      >
                        {message.role === "assistant" ? (
                          <MessageResponse>{text}</MessageResponse>
                        ) : (
                          <span className="text-sm">{text}</span>
                        )}
                      </MessageContent>
                    </Message>
                  );
                })
              )}
              {status === "submitted" && <Shimmer className="text-sm">Pensando...</Shimmer>}
              {error && <p className="text-xs text-destructive">{error}</p>}
            </ConversationContent>
            <ConversationScrollButton />
          </Conversation>

          <div className="border-t border-border p-3">
            <PromptInput
              onSubmit={(message) => {
                send(message.text ?? "");
              }}
            >
              <PromptInputTextarea
                ref={textareaRef}
                placeholder="Escribe tu consulta..."
                disabled={isLoading}
              />
              <PromptInputFooter className="justify-end">
                <PromptInputSubmit size="icon-sm" status={status} disabled={isLoading} />
              </PromptInputFooter>
            </PromptInput>
          </div>
        </div>
      )}

      <button
        onClick={() => setOpen((v) => !v)}
        aria-label={open ? "Cerrar asistente" : "Abrir asistente de D'Fidel"}
        className="group flex items-center gap-3 bg-brand-primary text-brand-surface p-2 pr-4 rounded-full shadow-xl ring-1 ring-black/5 hover:bg-brand-primary/90 transition-all"
      >
        <span className="size-10 rounded-full bg-brand-surface/15 flex items-center justify-center">
          {open ? <X className="size-5" /> : <MessageCircle className="size-5" />}
        </span>
        <span className="text-sm font-semibold whitespace-nowrap">
          {open ? "Cerrar" : "Chatea con Fidel"}
        </span>
      </button>
    </div>
  );
}
