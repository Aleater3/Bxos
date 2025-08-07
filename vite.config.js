import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import path from 'path'
import { fileURLToPath } from 'url'

function mockApiPlugin() {
  const routes = {
    '/api/agents': { agents: [] },
    '/api/courses': { courses: [] },
    '/api/funnels': { funnels: [] },
    '/api/notes': { notes: [] },
    '/api/timeline': { events: [] },
  }

  const handler = (req, res, next) => {
    const url = req.url?.split('?')[0] || ''
    if (url in routes) {
      res.setHeader('Content-Type', 'application/json')
      res.end(JSON.stringify(routes[url]))
      return
    }
    next()
  }

  return {
    name: 'mock-api',
    configureServer(server) {
      server.middlewares.use(handler)
    },
    configurePreviewServer(server) {
      server.middlewares.use(handler)
    },
  }
}

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss(), mockApiPlugin()],
  resolve: {
    alias: {
      "@": path.resolve(path.dirname(fileURLToPath(import.meta.url)), "./src"),
    },
  },
})
