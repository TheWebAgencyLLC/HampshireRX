// nuxt.config.js
import { analyticsConfig } from "./config/analytics";
import { schemaConfig } from "./config/schema";
import { hotjarConfig } from "./config/hotjar";
import { metaConfig } from "./config/meta";
import { metaPixelConfig } from "./config/meta-pixel";

export default defineNuxtConfig({
  compatibilityDate: "2024-04-03",
  devtools: { enabled: true },
  runtimeConfig: {
    jwtSecret: process.env.JWT_SECRET, // Make sure this is set via env or directly here
    stripe: {
      key: process.env.STRIPE_KEY,
      options: {},
    },
    public: {
      stripe: {
        key: process.env.STRIPE_PUBLIC_KEY,
      },
    },
  },
  experimental: {
    // Other experimental options...
    extraPageMetaExtractionKeys: [], // Empty array or add specific keys you need
  },
  app: {
    head: {
      title: metaConfig.title,
      link: metaConfig.link,
      meta: metaConfig.meta,
      script: [
        ...metaPixelConfig.script,
        ...analyticsConfig.script,
        ...schemaConfig.script,
        ...hotjarConfig.script,
      ],
      noscript: [...metaPixelConfig.noscript],
    },
  },
  vite: {
    build: {
      rollupOptions: {
        external: ["#internal/nuxt/paths"],
      },
    },
  },
  modules: [
    "@nuxtjs/tailwindcss",
    "nuxt-mongoose",
    "./modules/auth.module",
    "@unlok-co/nuxt-stripe",
    "@pinia/nuxt",
    "pinia-plugin-persistedstate/nuxt",
  ],
  nitro: {
    experimental: {
      websocket: true,
    },
  },
  mongoose: {
    uri: process.env.MONGODB_URI,
    options: {},
    modelsDir: "models",
    devtools: true,
  },
});
