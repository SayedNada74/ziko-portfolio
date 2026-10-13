import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import express from 'express';
import { resolve } from 'path';

function serveContentPlugin() {
  return {
    name: 'serve-content',
    configureServer(server) {
      server.middlewares.use('/Content', express.static(resolve(__dirname, 'Content')));
    }
  }
}

export default defineConfig({
  plugins: [react(), serveContentPlugin()],
});
