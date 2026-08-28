export const WHATSAPP_NUMBER = "+18094098346";
export const WHATSAPP_LINK = `https://wa.me/${WHATSAPP_NUMBER.replace(/\D/g, "")}`;

// Gmail donde llegarán los mensajes del formulario de contacto de la Home.
export const CONTACT_EMAIL = "dfidelexport@gmail.com";

// Clave gratuita de Web3Forms asociada a CONTACT_EMAIL.
// Se obtiene en https://web3forms.com introduciendo ese Gmail (sin registro, es instantáneo).
export const WEB3FORMS_ACCESS_KEY = "PON_AQUI_TU_ACCESS_KEY";

export function whatsappProductLink(productName: string) {
  const text = encodeURIComponent(
    `Hola D'Fidel-Export e Import, me interesa cotizar: ${productName}.`,
  );
  return `${WHATSAPP_LINK}?text=${text}`;
}

export type QuoteRequest = {
  product: string;
  quantity: string;
  unit: string;
  destination: string;
  presentation: string;
  company?: string | undefined;
  notes?: string | undefined;
};

export function whatsappQuoteLink(quote: QuoteRequest) {
  const lines = [
    "Hola D'Fidel-Export e Import, quisiera solicitar una cotización:",
    "",
    `• Producto: ${quote.product}`,
    `• Cantidad: ${quote.quantity} ${quote.unit}`,
    `• Destino: ${quote.destination}`,
    `• Presentación: ${quote.presentation}`,
  ];
  if (quote.company) lines.push(`• Empresa: ${quote.company}`);
  if (quote.notes) lines.push(`• Notas: ${quote.notes}`);
  lines.push("", "Quedo atento a disponibilidad y precio. Gracias.");
  return `${WHATSAPP_LINK}?text=${encodeURIComponent(lines.join("\n"))}`;
}
