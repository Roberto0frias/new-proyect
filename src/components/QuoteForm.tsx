import { useEffect, useState } from "react";
import { z } from "zod";

import { CATALOG } from "@/lib/catalog";
import { whatsappQuoteLink } from "@/lib/contact";

export const PRESENTATIONS = [
  "Caja 4 kg",
  "Caja 10 kg",
  "Palet completo",
  "Contenedor 40' reefer",
  "Otra (indicar en notas)",
] as const;

const UNITS = ["kg", "cajas", "palets", "contenedores"] as const;

const quoteSchema = z.object({
  product: z.string().trim().min(1, { message: "Seleccione un producto" }).max(120),
  quantity: z
    .string()
    .trim()
    .min(1, { message: "Indique la cantidad" })
    .max(10, { message: "Cantidad demasiado larga" })
    .refine((value) => Number(value) > 0, { message: "La cantidad debe ser mayor que 0" }),
  unit: z.enum(UNITS),
  destination: z
    .string()
    .trim()
    .min(2, { message: "Indique ciudad y país de destino" })
    .max(120, { message: "Máximo 120 caracteres" }),
  presentation: z.enum(PRESENTATIONS),
  company: z.string().trim().max(120, { message: "Máximo 120 caracteres" }).optional(),
  notes: z.string().trim().max(500, { message: "Máximo 500 caracteres" }).optional(),
});

type FieldErrors = {
  product?: string;
  quantity?: string;
  destination?: string;
  presentation?: string;
  company?: string;
  notes?: string;
};

const fieldClass =
  "w-full bg-white rounded-2xl ring-1 ring-black/5 px-4 py-3 text-sm text-brand-ink focus:outline-none focus:ring-2 focus:ring-brand-primary/40";
const labelClass =
  "block text-[11px] font-semibold uppercase tracking-wider text-muted-foreground mb-2";

export function QuoteForm({ selectedProduct }: { selectedProduct?: string }) {
  const [product, setProduct] = useState(selectedProduct ?? "");
  const [quantity, setQuantity] = useState("");
  const [unit, setUnit] = useState<(typeof UNITS)[number]>("kg");
  const [destination, setDestination] = useState("");
  const [presentation, setPresentation] = useState<(typeof PRESENTATIONS)[number]>(
    PRESENTATIONS[1],
  );
  const [company, setCompany] = useState("");
  const [notes, setNotes] = useState("");
  const [errors, setErrors] = useState<FieldErrors>({});
  const [sent, setSent] = useState(false);

  useEffect(() => {
    if (selectedProduct) setProduct(selectedProduct);
  }, [selectedProduct]);

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const parsed = quoteSchema.safeParse({
      product,
      quantity,
      unit,
      destination,
      presentation,
      company,
      notes,
    });

    if (!parsed.success) {
      const nextErrors: FieldErrors = {};
      for (const issue of parsed.error.issues) {
        const key = issue.path[0] as keyof FieldErrors;
        if (key && !nextErrors[key]) nextErrors[key] = issue.message;
      }
      setErrors(nextErrors);
      setSent(false);
      return;
    }

    setErrors({});
    setSent(true);
    window.open(whatsappQuoteLink(parsed.data), "_blank", "noopener,noreferrer");
  }

  return (
    <form onSubmit={handleSubmit} noValidate className="grid grid-cols-1 sm:grid-cols-2 gap-5">
      <div className="sm:col-span-2">
        <label className={labelClass} htmlFor="quote-product">
          Producto
        </label>
        <select
          id="quote-product"
          value={product}
          onChange={(event) => setProduct(event.target.value)}
          className={fieldClass}
        >
          <option value="">Seleccione un producto…</option>
          {CATALOG.map((item) => (
            <option key={item.id} value={item.name}>
              {item.name}
            </option>
          ))}
          <option value="Producto a medida">Producto a medida / multiorigen</option>
        </select>
        {errors.product && <FieldError>{errors.product}</FieldError>}
      </div>

      <div>
        <label className={labelClass} htmlFor="quote-quantity">
          Cantidad
        </label>
        <div className="flex gap-2">
          <input
            id="quote-quantity"
            inputMode="numeric"
            value={quantity}
            onChange={(event) => setQuantity(event.target.value.replace(/[^\d.]/g, ""))}
            placeholder="Ej. 2000"
            maxLength={10}
            className={fieldClass}
          />
          <select
            aria-label="Unidad"
            value={unit}
            onChange={(event) => setUnit(event.target.value as (typeof UNITS)[number])}
            className={`${fieldClass} w-auto shrink-0`}
          >
            {UNITS.map((item) => (
              <option key={item} value={item}>
                {item}
              </option>
            ))}
          </select>
        </div>
        {errors.quantity && <FieldError>{errors.quantity}</FieldError>}
      </div>

      <div>
        <label className={labelClass} htmlFor="quote-destination">
          Destino
        </label>
        <input
          id="quote-destination"
          value={destination}
          onChange={(event) => setDestination(event.target.value)}
          placeholder="Ciudad y país (ej. Rotterdam, Países Bajos)"
          maxLength={120}
          className={fieldClass}
        />
        {errors.destination && <FieldError>{errors.destination}</FieldError>}
      </div>

      <div>
        <label className={labelClass} htmlFor="quote-presentation">
          Presentación
        </label>
        <select
          id="quote-presentation"
          value={presentation}
          onChange={(event) =>
            setPresentation(event.target.value as (typeof PRESENTATIONS)[number])
          }
          className={fieldClass}
        >
          {PRESENTATIONS.map((item) => (
            <option key={item} value={item}>
              {item}
            </option>
          ))}
        </select>
        {errors.presentation && <FieldError>{errors.presentation}</FieldError>}
      </div>

      <div>
        <label className={labelClass} htmlFor="quote-company">
          Empresa <span className="normal-case tracking-normal">(opcional)</span>
        </label>
        <input
          id="quote-company"
          value={company}
          onChange={(event) => setCompany(event.target.value)}
          placeholder="Nombre de su empresa"
          maxLength={120}
          className={fieldClass}
        />
        {errors.company && <FieldError>{errors.company}</FieldError>}
      </div>

      <div className="sm:col-span-2">
        <label className={labelClass} htmlFor="quote-notes">
          Notas <span className="normal-case tracking-normal">(opcional)</span>
        </label>
        <textarea
          id="quote-notes"
          value={notes}
          onChange={(event) => setNotes(event.target.value)}
          rows={3}
          maxLength={500}
          placeholder="Calibres, frecuencia de envío, certificaciones…"
          className={`${fieldClass} resize-none`}
        />
        {errors.notes && <FieldError>{errors.notes}</FieldError>}
      </div>

      <div className="sm:col-span-2 flex flex-col sm:flex-row sm:items-center gap-4">
        <button
          type="submit"
          className="inline-flex items-center justify-center gap-2 bg-brand-primary text-brand-surface px-6 py-3 rounded-full text-sm font-medium hover:bg-brand-primary/90 transition-transform active:scale-95"
        >
          <span className="size-2 bg-green-400 rounded-full animate-pulse" />
          Enviar cotización por WhatsApp
        </button>
        <p aria-live="polite" className="text-xs text-muted-foreground">
          {sent
            ? "Abrimos WhatsApp con su mensaje ya redactado."
            : "Se abrirá WhatsApp con el mensaje prellenado."}
        </p>
      </div>
    </form>
  );
}

function FieldError({ children }: { children: React.ReactNode }) {
  return <p className="mt-2 text-xs text-destructive">{children}</p>;
}
