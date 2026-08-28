import { createFileRoute, Link } from "@tanstack/react-router";
import { useMemo, useState } from "react";

import { CATALOG, CATEGORIES, type CatalogCategory } from "@/lib/catalog";
import { WHATSAPP_LINK } from "@/lib/contact";
import { QuoteForm } from "@/components/QuoteForm";
import heroFruits from "@/assets/hero-fruits.jpg";

export const Route = createFileRoute("/catalogo")({
  head: () => ({
    meta: [
      { title: "Catálogo de Frutas | D'Fidel-Export e Import" },
      {
        name: "description",
        content:
          "Explora el catálogo de frutas premium de D'Fidel: tropicales, exóticas, cítricos y uva. Busca por producto, origen o categoría y cotiza por WhatsApp.",
      },
      { property: "og:title", content: "Catálogo de Frutas Premium | D'Fidel" },
      {
        property: "og:description",
        content:
          "Tropicales, exóticas, cítricos y uva de mesa con calibres, temporada y formatos de envío listos para exportación.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: CatalogPage,
});

function normalize(value: string) {
  return value
    .trim()
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "");
}

function CatalogPage() {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState<CatalogCategory | "Todas">("Todas");
  const [selectedProduct, setSelectedProduct] = useState("");

  function requestQuote(productName: string) {
    setSelectedProduct(productName);
    document.getElementById("cotizacion")?.scrollIntoView({ behavior: "smooth", block: "start" });
  }

  const results = useMemo(() => {
    const q = normalize(query);
    return CATALOG.filter((product) => {
      const matchesCategory = category === "Todas" || product.category === category;
      const matchesQuery =
        q.length === 0 ||
        normalize(
          [product.name, product.description, product.origin, product.category].join(" "),
        ).includes(q);
      return matchesCategory && matchesQuery;
    });
  }, [query, category]);

  return (
    <div className="min-h-screen bg-brand-surface text-brand-ink font-sans">
      <nav className="sticky top-0 z-50 bg-brand-surface/80 backdrop-blur-md border-b border-border">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2">
            <span className="font-display text-xl font-medium tracking-tight text-brand-primary">
              D'Fidel-Export e Import
            </span>
          </Link>
          <div className="flex items-center gap-6 text-sm font-medium text-muted-foreground">
            <Link to="/" className="hover:text-brand-primary transition-colors">
              Inicio
            </Link>
            <a
              href={WHATSAPP_LINK}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-brand-primary text-brand-surface px-4 py-2 rounded-full ring-1 ring-brand-primary hover:bg-brand-primary/90 transition-transform active:scale-95"
            >
              Escríbenos
            </a>
          </div>
        </div>
      </nav>

      <main>
        <section className="max-w-7xl mx-auto px-6 pt-14 pb-10">
          <span className="text-xs font-semibold uppercase tracking-widest text-brand-accent">
            Catálogo {new Date().getFullYear()}
          </span>
          <h1 className="font-display text-4xl md:text-5xl leading-tight font-medium text-balance max-w-[24ch] mt-4 mb-6">
            Frutas seleccionadas, listas para su mercado
          </h1>
          <p className="text-base text-muted-foreground max-w-[56ch] text-pretty">
            Consulte calibres, temporada y formatos de envío. Solicite su cotización por
            WhatsApp en un clic.
          </p>

          <div className="mt-10 flex flex-col lg:flex-row lg:items-center gap-4">
            <label className="relative w-full lg:max-w-sm">
              <span className="sr-only">Buscar productos</span>
              <SearchIcon className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
              <input
                type="search"
                value={query}
                onChange={(event) => setQuery(event.target.value)}
                placeholder="Buscar fruta, origen o categoría..."
                className="w-full bg-white rounded-full ring-1 ring-black/5 pl-11 pr-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-brand-primary/40"
              />
            </label>

            <div className="flex flex-wrap gap-2">
              {(["Todas", ...CATEGORIES] as const).map((item) => {
                const active = category === item;
                return (
                  <button
                    key={item}
                    onClick={() => setCategory(item)}
                    className={`px-4 py-2 rounded-full text-xs font-semibold uppercase tracking-wider transition-colors ${
                      active
                        ? "bg-brand-primary text-brand-surface ring-1 ring-brand-primary"
                        : "bg-white text-muted-foreground ring-1 ring-black/5 hover:text-brand-primary"
                    }`}
                  >
                    {item}
                  </button>
                );
              })}
            </div>
          </div>
        </section>

        <section className="bg-secondary/50 py-16">
          <div className="max-w-7xl mx-auto px-6">
            <p className="text-sm text-muted-foreground mb-8">
              {results.length} {results.length === 1 ? "producto" : "productos"} disponibles
            </p>

            {results.length === 0 ? (
              <div className="bg-white rounded-[min(1vw,12px)] ring-1 ring-black/5 p-12 text-center">
                <h2 className="font-display text-2xl font-medium mb-2">Sin resultados</h2>
                <p className="text-sm text-muted-foreground mb-6">
                  No encontramos productos para «{query}». Escríbanos y buscamos el origen
                  por usted.
                </p>
                <a
                  href={WHATSAPP_LINK}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block bg-brand-primary text-brand-surface px-6 py-3 rounded-full text-sm font-medium hover:bg-brand-primary/90 transition-transform active:scale-95"
                >
                  Consultar disponibilidad
                </a>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                {results.map((product) => (
                  <article
                    key={product.id}
                    className="group bg-white rounded-[min(1vw,12px)] ring-1 ring-black/5 overflow-hidden flex flex-col"
                  >
                    <div className="overflow-hidden bg-muted">
                      <img
                        src={product.image}
                        alt={product.alt}
                        width={800}
                        height={1000}
                        loading="lazy"
                        className="w-full aspect-[4/3] object-cover group-hover:scale-105 transition-transform duration-700"
                      />
                    </div>
                    <div className="p-6 flex flex-col grow">
                      <span className="text-[10px] font-semibold uppercase tracking-wider text-brand-accent mb-2">
                        {product.category}
                      </span>
                      <h2 className="font-display text-xl font-medium mb-2">{product.name}</h2>
                      <p className="text-sm text-muted-foreground mb-5 text-pretty">
                        {product.description}
                      </p>

                      <dl className="text-xs text-muted-foreground space-y-2 mb-6">
                        <div className="flex justify-between gap-4 border-b border-border pb-2">
                          <dt>Origen</dt>
                          <dd className="text-brand-ink font-medium text-right">{product.origin}</dd>
                        </div>
                        <div className="flex justify-between gap-4 border-b border-border pb-2">
                          <dt>Temporada</dt>
                          <dd className="text-brand-ink font-medium text-right">{product.season}</dd>
                        </div>
                        <div className="flex justify-between gap-4 border-b border-border pb-2">
                          <dt>Formato</dt>
                          <dd className="text-brand-ink font-medium text-right">{product.packaging}</dd>
                        </div>
                        <div className="flex justify-between gap-4">
                          <dt>Calibres</dt>
                          <dd className="text-brand-ink font-medium text-right">{product.calibres}</dd>
                        </div>
                      </dl>

                      <button
                        type="button"
                        onClick={() => requestQuote(product.name)}
                        className="mt-auto inline-flex items-center justify-center gap-2 bg-brand-primary text-brand-surface px-5 py-3 rounded-full text-sm font-medium hover:bg-brand-primary/90 transition-transform active:scale-95"
                      >
                        <span className="size-2 bg-green-400 rounded-full animate-pulse" />
                        Solicitar cotización
                      </button>
                    </div>
                  </article>
                ))}
              </div>
            )}
          </div>
        </section>

        <section id="cotizacion" className="py-20 scroll-mt-20">
          <div className="max-w-3xl mx-auto px-6">
            <span className="text-xs font-semibold uppercase tracking-widest text-brand-accent">
              Cotización
            </span>
            <h2 className="font-display text-3xl md:text-4xl font-medium mt-4 mb-4 text-balance">
              Solicite su cotización en un minuto
            </h2>
            <p className="text-base text-muted-foreground mb-10 max-w-[52ch] text-pretty">
              Indique cantidad, destino y presentación. Enviaremos su mensaje ya redactado a
              nuestro WhatsApp comercial para responderle con precio y disponibilidad.
            </p>
            <div className="bg-white rounded-[min(1vw,12px)] ring-1 ring-black/5 p-6 md:p-8">
              <QuoteForm selectedProduct={selectedProduct} />
            </div>
          </div>
        </section>

        <section className="py-20">
          <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <img
              src={heroFruits}
              alt="Selección premium de frutas de D'Fidel-Export e Import"
              width={1280}
              height={640}
              loading="lazy"
              className="w-full aspect-[16/9] bg-muted rounded-[min(1vw,12px)] ring-1 ring-black/5 object-cover"
            />
            <div>
              <h2 className="font-display text-3xl font-medium mb-4 text-balance">
                ¿Necesita un producto que no está en el catálogo?
              </h2>
              <p className="text-base text-muted-foreground mb-8 max-w-[46ch] text-pretty">
                Trabajamos pedidos a medida con multiorigen y volúmenes por contenedor.
                Cuéntenos qué busca y le enviamos disponibilidad y precio.
              </p>
              <button
                type="button"
                onClick={() => requestQuote("Producto a medida")}
                className="inline-block bg-brand-primary text-brand-surface px-6 py-3 rounded-full text-sm font-medium hover:bg-brand-primary/90 transition-transform active:scale-95"
              >
                Solicitar cotización
              </button>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}

function SearchIcon({ className }: { className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      className={className}
      aria-hidden="true"
    >
      <circle cx="11" cy="11" r="7" />
      <path d="m20 20-3.5-3.5" />
    </svg>
  );
}
