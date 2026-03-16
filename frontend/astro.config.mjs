// @ts-check
import { defineConfig } from 'astro/config';
import node from "@astrojs/node"
import path from "path"

import react from '@astrojs/react';

import tailwindcss from '@tailwindcss/vite';

// https://astro.build/config
export default defineConfig({
  integrations: [react()],

  output: "server",
  adapter: node({
    mode: "standalone",
  }),

  vite: {
    plugins: [tailwindcss()],
    resolve : {
      alias: {
        "@": path.resolve("./src")
      }
    }
  }
});