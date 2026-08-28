import avocadoHass from "@/assets/avocado-hass.jpg";
import dragonfruit from "@/assets/dragonfruit.jpg";
import mangoKent from "@/assets/mango-kent.jpg";
import pineapple from "@/assets/pineapple.jpg";
import banana from "@/assets/banana.jpg";
import lime from "@/assets/lime.jpg";
import grapes from "@/assets/grapes.jpg";
import heroFruits from "@/assets/hero-fruits.jpg";

export type CatalogCategory = "Tropicales" | "Exóticas" | "Cítricos" | "De hueso y uva";

export type CatalogProduct = {
  id: string;
  name: string;
  category: CatalogCategory;
  description: string;
  origin: string;
  season: string;
  packaging: string;
  calibres: string;
  image: string;
  alt: string;
};

export const CATEGORIES: CatalogCategory[] = [
  "Tropicales",
  "Exóticas",
  "Cítricos",
  "De hueso y uva",
];

export const CATALOG: CatalogProduct[] = [
  {
    id: "aguacate-hass",
    name: "Aguacate Hass Premium",
    category: "Tropicales",
    description: "Textura cremosa y sabor intenso, seleccionado para exportación.",
    origin: "Málaga · Granada",
    season: "Nov - May",
    packaging: "Caja 4 kg / 10 kg",
    calibres: "12 - 26",
    image: avocadoHass,
    alt: "Aguacate Hass premium cortado por la mitad",
  },
  {
    id: "pitahaya-roja",
    name: "Pitahaya Roja",
    category: "Exóticas",
    description: "Dulzura exótica con altos niveles de antioxidantes.",
    origin: "Almería · import LATAM",
    season: "Todo el año",
    packaging: "Caja 2,5 kg",
    calibres: "300 - 600 g",
    image: dragonfruit,
    alt: "Pitahaya roja fresca servida en plato blanco",
  },
  {
    id: "mango-kent",
    name: "Mango Kent",
    category: "Tropicales",
    description: "Pulpa sin fibra y aroma embriagador, madurez controlada.",
    origin: "Axarquía · Brasil",
    season: "Ago - Dic",
    packaging: "Caja 4 kg",
    calibres: "6 - 12",
    image: mangoKent,
    alt: "Mangos Kent dorados en caja de madera",
  },
  {
    id: "pina-golden",
    name: "Piña Golden Sweet",
    category: "Tropicales",
    description: "Alto grado brix, corazón tierno y color dorado uniforme.",
    origin: "Costa Rica",
    season: "Todo el año",
    packaging: "Caja 12 kg",
    calibres: "5 - 8",
    image: pineapple,
    alt: "Piña golden entera y en rodajas",
  },
  {
    id: "banano-cavendish",
    name: "Banano Cavendish",
    category: "Tropicales",
    description: "Curvatura y calibre homogéneos, maduración programada.",
    origin: "Ecuador · Canarias",
    season: "Todo el año",
    packaging: "Caja 18,14 kg",
    calibres: "39 - 46 mm",
    image: banana,
    alt: "Racimo de bananos Cavendish maduros",
  },
  {
    id: "limon-primofiori",
    name: "Limón Primofiori",
    category: "Cítricos",
    description: "Zumo abundante y piel fina, ideal para retail y hostelería.",
    origin: "Murcia · Alicante",
    season: "Sep - Feb",
    packaging: "Caja 10 kg / malla 1 kg",
    calibres: "2 - 5",
    image: lime,
    alt: "Limones frescos con hojas sobre superficie clara",
  },
  {
    id: "uva-red-globe",
    name: "Uva Red Globe",
    category: "De hueso y uva",
    description: "Baya grande y crujiente, excelente vida en postcosecha.",
    origin: "Alicante · Perú",
    season: "Jul - Ene",
    packaging: "Caja 8,2 kg",
    calibres: "22 - 28 mm",
    image: grapes,
    alt: "Racimo de uvas Red Globe sobre lino claro",
  },
  {
    id: "mix-tropical",
    name: "Mix Tropical Selección",
    category: "Exóticas",
    description: "Surtido a medida de frutas exóticas para tiendas gourmet.",
    origin: "Multiorigen",
    season: "Todo el año",
    packaging: "Bandeja mixta 3 kg",
    calibres: "A definir",
    image: heroFruits,
    alt: "Selección variada de frutas tropicales premium",
  },
];
