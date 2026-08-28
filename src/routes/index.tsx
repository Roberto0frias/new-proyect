import { createFileRoute, Link } from "@tanstack/react-router";
import { useState, type FormEvent } from "react";

import { ChatWidget } from "@/components/ChatWidget";
import { WHATSAPP_LINK, CONTACT_EMAIL, WEB3FORMS_ACCESS_KEY } from "@/lib/contact";

import heroFruits from "@/assets/hero-fruits.jpg";
import avocadoHass from "@/assets/avocado-hass.jpg";
import dragonfruit from "@/assets/dragonfruit.jpg";
import mangoKent from "@/assets/mango-kent.jpg";
import logistics from "@/assets/logistics.jpg";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "D'Fidel-Export e Import | Frutas Premium Importación y Exportación" },
      {
        name: "description",
        content:
          "D'Fidel-Export e Import: especialistas en importación y exportación de frutas premium. Frescura, calidad y logística internacional. España.",
      },
      { property: "og:title", content: "D'Fidel-Export e Import | Frutas Premium" },
      {
        property: "og:description",
        content:
          "Importación y exportación de frutas exóticas y tradicionales con los más altos estándares de calidad internacional.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
      { property: "og:image", content: heroFruits },
      { name: "twitter:image", content: heroFruits },
    ],
  }),
  component: Index,
});

function Index() {
  return (
    <div className="min-h-screen bg-brand-surface text-brand-ink font-sans selection:bg-brand-primary/10">
      <Header />
      <main>
        <Hero />
        <Products />
        <About />
        <Contact />
      </main>
      <Footer />
      <ChatWidget />
    </div>
  );
}

function Header() {
  const scrollTo = (id: string) => {
    const element = document.getElementById(id);
    if (element) element.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <nav className="sticky top-0 z-50 bg-brand-surface/80 backdrop-blur-md border-b border-border">
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
        <a href="/" className="flex items-center gap-2">
          <div className="size-8 bg-brand-primary rounded-full flex items-center justify-center">
            <LeafIcon className="size-4 text-brand-surface" />
          </div>
          <span className="font-display text-xl font-medium tracking-tight text-brand-primary">
            D'Fidel-Export e Import
          </span>
        </a>
        <div className="hidden md:flex items-center gap-8 text-sm font-medium text-muted-foreground">
          <Link to="/catalogo" className="hover:text-brand-primary transition-colors">
            Catálogo
          </Link>
          <button
            onClick={() => scrollTo("productos")}
            className="hover:text-brand-primary transition-colors"
          >
            Productos
          </button>
          <button
            onClick={() => scrollTo("nosotros")}
            className="hover:text-brand-primary transition-colors"
          >
            Nosotros
          </button>
          <button
            onClick={() => scrollTo("exportacion")}
            className="hover:text-brand-primary transition-colors"
          >
            Exportación
          </button>
          <button
            onClick={() => scrollTo("contacto")}
            className="hover:text-brand-primary transition-colors"
          >
            Contacto
          </button>
        </div>
        <a
          href={WHATSAPP_LINK}
          target="_blank"
          rel="noopener noreferrer"
          className="text-sm font-medium bg-brand-primary text-brand-surface px-4 py-2 rounded-full ring-1 ring-brand-primary transition-transform active:scale-95 hover:bg-brand-primary/90"
        >
          Contáctanos
        </a>
      </div>
    </nav>
  );
}

function Hero() {
  return (
    <section className="relative pt-12 pb-24 md:pt-20 md:pb-32 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-col items-center text-center">
          <span className="text-xs font-semibold uppercase tracking-widest text-brand-accent mb-4">
            Cosecha Premium Seleccionada
          </span>
          <h1 className="font-display text-4xl md:text-6xl lg:text-7xl leading-tight md:leading-tight lg:leading-tight font-medium text-balance max-w-[20ch] mb-8">
            Llevamos la frescura del campo a su mesa
          </h1>
          <p className="text-base md:text-lg text-muted-foreground max-w-[56ch] mb-10 text-pretty">
            Especialistas en la importación y exportación de frutas exóticas y tradicionales con los
            más altos estándares de calidad internacional.
          </p>
          <div className="flex flex-col sm:flex-row items-center gap-4">
            <Link
              to="/catalogo"
              className="w-full sm:w-auto bg-brand-primary text-brand-surface px-6 py-3 rounded-full text-sm font-medium ring-1 ring-brand-primary hover:bg-brand-primary/90 transition-transform active:scale-95 text-center"
            >
              Ver catálogo
            </Link>
            <a
              href={WHATSAPP_LINK}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto bg-white text-brand-ink px-6 py-3 rounded-full text-sm font-medium ring-1 ring-black/5 flex items-center justify-center gap-2 hover:bg-stone-50 transition-transform active:scale-95"
            >
              <span className="size-2 bg-green-500 rounded-full animate-pulse" />
              Escríbenos al WhatsApp
            </a>
          </div>
        </div>

        <div className="mt-16 relative">
          <img
            src={heroFruits}
            alt="Selección premium de frutas tropicales de D'Fidel-Export e Import"
            width={1280}
            height={640}
            className="w-full aspect-[21/9] bg-muted rounded-[min(1vw,12px)] ring-1 ring-black/5 object-cover"
          />
        </div>
      </div>
    </section>
  );
}

function Products() {
  const products = [
    {
      id: "aguacate",
      title: "Aguacate Hass Premium",
      description: "Textura cremosa y sabor intenso de exportación.",
      tags: ["Tropicales", "Premium"],
      image: avocadoHass,
      alt: "Aguacate Hass premium cortado por la mitad",
    },
    {
      id: "pitahaya",
      title: "Pitahaya Roja",
      description: "Dulzura exótica con altos niveles de antioxidantes.",
      tags: ["Exóticas", "Todo el año"],
      image: dragonfruit,
      alt: "Pitahaya roja fresca servida en plato blanco",
    },
    {
      id: "mango",
      title: "Mango Kent",
      description: "Pulpa sin fibra y aroma embriagador.",
      tags: ["Tropicales", "Temporada"],
      image: mangoKent,
      alt: "Mangos Kent dorados en caja de madera",
    },
  ];

  return (
    <section id="productos" className="bg-secondary/50 py-24">
      <div className="max-w-7xl mx-auto px-6">
        <div className="mb-16 flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="max-w-[48ch]">
            <h2 className="font-display text-3xl md:text-4xl leading-tight font-medium mb-4 text-balance">
              Nuestra Selección
            </h2>
            <p className="text-base text-muted-foreground text-pretty">
              Frutas recolectadas en su punto óptimo de madurez para garantizar sabor y textura.
            </p>
          </div>
          <Link
            to="/catalogo"
            className="text-sm font-medium text-brand-primary underline underline-offset-4 decoration-brand-primary/30"
          >
            Explorar todo el inventario
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {products.map((product) => (
            <div key={product.id} className="group cursor-pointer">
              <div className="relative mb-4 overflow-hidden rounded-[min(1vw,12px)] bg-muted">
                <img
                  src={product.image}
                  alt={product.alt}
                  width={800}
                  height={1000}
                  loading="lazy"
                  className="w-full aspect-[4/5] object-cover group-hover:scale-105 transition-transform duration-700"
                />
              </div>
              <h3 className="font-display text-xl font-medium mb-1">{product.title}</h3>
              <p className="text-sm text-muted-foreground mb-4">{product.description}</p>
              <div className="flex items-center gap-2">
                {product.tags.map((tag) => (
                  <span
                    key={tag}
                    className="px-2 py-1 bg-muted text-[10px] font-semibold rounded uppercase tracking-wider"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function About() {
  return (
    <section id="nosotros" className="py-24">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div className="order-2 lg:order-1">
            <img
              src={logistics}
              alt="Instalaciones modernas de logística y cadena de frío de D'Fidel"
              width={1000}
              height={1000}
              loading="lazy"
              className="w-full aspect-square bg-muted rounded-[min(1vw,12px)] ring-1 ring-black/5 object-cover"
            />
          </div>
          <div className="order-1 lg:order-2">
            <h2 className="font-display text-3xl md:text-4xl leading-tight font-medium mb-6 text-balance">
              Más que una importadora, somos su socio de confianza
            </h2>
            <p className="text-base text-muted-foreground mb-8 max-w-[48ch] text-pretty">
              En D'Fidel-Export e Import, hemos perfeccionado el arte de la logística alimentaria.
              Con años de experiencia conectando mercados agrícolas con consumidores exigentes.
            </p>

            <div className="space-y-6">
              {[
                {
                  number: "01",
                  title: "Control de Calidad",
                  description:
                    "Inspeccionamos cada lote en origen y destino para asegurar la perfección.",
                },
                {
                  number: "02",
                  title: "Logística Ágil",
                  description:
                    "Rutas optimizadas para reducir el tiempo de tránsito y mantener la frescura.",
                },
                {
                  number: "03",
                  title: "Sostenibilidad",
                  description:
                    "Trabajamos con productores que respetan la tierra y el ciclo natural.",
                },
              ].map((item) => (
                <div key={item.number} className="flex items-start gap-4">
                  <div className="mt-1 size-8 rounded-full bg-brand-primary/10 flex items-center justify-center shrink-0">
                    <span className="text-brand-primary text-xs font-semibold tracking-tighter">
                      {item.number}
                    </span>
                  </div>
                  <div>
                    <h4 className="font-medium text-brand-ink mb-1">{item.title}</h4>
                    <p className="text-sm text-muted-foreground max-w-[40ch]">{item.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

type SubmitStatus = "idle" | "sending" | "success" | "error";

function ContactForm() {
  const [status, setStatus] = useState<SubmitStatus>("idle");
  const [errorMessage, setErrorMessage] = useState("");

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus("sending");
    setErrorMessage("");

    const form = event.currentTarget;
    const formData = new FormData(form);
    formData.append("access_key", WEB3FORMS_ACCESS_KEY);
    formData.append("subject", "Nuevo mensaje desde la web D'Fidel-Export e Import");
    formData.append("from_name", "D'Fidel-Export e Import — Web");

    try {
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: { Accept: "application/json" },
        body: formData,
      });
      const result = await response.json();

      if (result.success) {
        setStatus("success");
        form.reset();
      } else {
        setStatus("error");
        setErrorMessage(result.message ?? "No se pudo enviar el mensaje. Inténtelo de nuevo.");
      }
    } catch {
      setStatus("error");
      setErrorMessage("Error de conexión. Inténtelo de nuevo o escríbanos por WhatsApp.");
    }
  }

  if (status === "success") {
    return (
      <div className="bg-zinc-800/50 rounded-[min(1vw,12px)] p-8 border border-zinc-700/50 flex flex-col items-center justify-center text-center min-h-[320px]">
        <div className="size-12 rounded-full bg-brand-accent/20 flex items-center justify-center mb-4">
          <span className="text-brand-accent text-2xl">✓</span>
        </div>
        <h3 className="font-display text-xl text-brand-surface font-medium mb-2">¡Mensaje enviado!</h3>
        <p className="text-sm text-zinc-400 max-w-[36ch]">
          Gracias por escribirnos. Nuestro equipo responderá a {CONTACT_EMAIL} en breve.
        </p>
        <button
          onClick={() => setStatus("idle")}
          className="mt-6 text-sm font-medium text-brand-accent underline underline-offset-4"
        >
          Enviar otro mensaje
        </button>
      </div>
    );
  }

  return (
    <div className="bg-zinc-800/50 rounded-[min(1vw,12px)] p-8 border border-zinc-700/50">
      <form className="space-y-4" onSubmit={handleSubmit}>
        <div>
          <label htmlFor="name" className="block text-xs font-semibold uppercase tracking-wider text-zinc-500 mb-2">
            Nombre Completo
          </label>
          <input
            id="name"
            name="name"
            type="text"
            required
            className="w-full bg-zinc-900/50 border border-zinc-700 rounded-lg px-4 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-brand-accent"
            placeholder="Juan Pérez"
          />
        </div>
        <div>
          <label htmlFor="email" className="block text-xs font-semibold uppercase tracking-wider text-zinc-500 mb-2">
            Correo Electrónico
          </label>
          <input
            id="email"
            name="email"
            type="email"
            required
            className="w-full bg-zinc-900/50 border border-zinc-700 rounded-lg px-4 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-brand-accent"
            placeholder="juan@empresa.com"
          />
        </div>
        <div>
          <label htmlFor="message" className="block text-xs font-semibold uppercase tracking-wider text-zinc-500 mb-2">
            Mensaje
          </label>
          <textarea
            id="message"
            name="message"
            rows={4}
            required
            className="w-full bg-zinc-900/50 border border-zinc-700 rounded-lg px-4 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-brand-accent"
            placeholder="Consulta sobre envíos..."
          />
        </div>
        {status === "error" && <p className="text-sm text-red-400">{errorMessage}</p>}
        <button
          type="submit"
          disabled={status === "sending"}
          className="w-full py-3 bg-brand-accent text-white rounded-lg text-sm font-semibold hover:bg-brand-accent/90 transition-colors disabled:opacity-60 disabled:cursor-not-allowed"
        >
          {status === "sending" ? "Enviando..." : "Enviar Mensaje"}
        </button>
      </form>
    </div>
  );
}

function Contact() {
  return (
    <section id="contacto" className="bg-zinc-900 text-zinc-300 py-24">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
          <div>
            <h2 className="font-display text-3xl text-brand-surface font-medium mb-6 text-balance">
              ¿Listo para exportar o importar lo mejor?
            </h2>
            <p className="text-base mb-8 max-w-[40ch]">
              Nuestro equipo de ventas está disponible para cotizaciones personalizadas y pedidos al
              por mayor.
            </p>

            <div className="space-y-4 text-sm">
              <div className="flex items-center gap-3">
                <span className="text-brand-accent">Ubicación:</span>
                <span>Santo Domingo, Republica Dominicana</span>
              </div>
              <div className="flex items-center gap-3">
                <span className="text-brand-accent">Horario:</span>
                <span>Lun - Vie: 08:00 - 18:00</span>
              </div>
            </div>

            <div className="mt-10">
              <a
                href={WHATSAPP_LINK}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-3 bg-white text-zinc-900 px-6 py-3 rounded-full text-sm font-medium ring-1 ring-white/10 hover:bg-zinc-100 transition-transform active:scale-95"
              >
                Escríbenos al WhatsApp
                <span className="text-green-600">→</span>
              </a>
            </div>
          </div>

          <ContactForm />
        </div>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="py-12 border-t border-border">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-col md:flex-row justify-between items-center gap-8">
          <div className="flex items-center gap-2">
            <div className="size-6 bg-brand-primary rounded-full flex items-center justify-center">
              <LeafIcon className="size-3 text-brand-surface" />
            </div>
            <span className="font-display text-lg font-medium tracking-tight text-brand-primary">
              D'Fidel-Export e Import
            </span>
          </div>
          <p className="text-xs text-muted-foreground">
            © {new Date().getFullYear()} D'Fidel. Todos los derechos reservados.
          </p>
        </div>
      </div>
    </footer>
  );
}

function LeafIcon({ className }: { className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="currentColor"
      className={className}
      aria-hidden="true"
    >
      <path d="M15.362 5.214A8.252 8.252 0 0 1 12 21 8.25 8.25 0 0 1 6.038 7.048 8.287 8.287 0 0 0 9 9.6a8.983 8.983 0 0 1 3.361-6.867 8.21 8.21 0 0 0 3 2.48Z" />
      <path d="M12 18a3.75 3.75 0 0 0 .495-7.467 5.99 5.99 0 0 0-1.925 3.546 5.974 5.974 0 0 1-1.57 3.98Z" />
    </svg>
  );
}
