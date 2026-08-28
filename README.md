# D'Fidel Fruits & Exports

Página web de D´Fidel-Export e Import, importadora y exportadora de frutas premium.

## Desarrollo local

Necesitas Node.js 20+ y npm.

```sh
git clone <url-de-este-repositorio>
cd <nombre-del-repositorio>
npm i
npm run dev
```

## Build de producción

```sh
npm run build
npm start
```

`npm start` levanta el servidor Node generado por Nitro en `.output/server/index.mjs`,
que es el comando que debes usar como "Start Command" al desplegar en Render (u
otro proveedor Node).

## Variables de entorno

- `GROQ_API_KEY`: clave gratuita de [Groq](https://console.groq.com/keys) usada por
  el asistente de chat en `/api/chat`. Sin ella, el endpoint de chat responde con
  un error 500.
