import { defineConfig } from 'cypress'

export default defineConfig({
  e2e: {
    projectId: "18end6",
    baseUrl: "http://localhost:8910",
    chromeWebSecurity: false,
    viewportHeight: 1080,
    viewportWidth: 1920,
    defaultCommandTimeout: 6000,
  },
})

