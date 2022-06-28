import { defineConfig } from "cypress";

export default defineConfig({
  e2e: {
    projectId: "18end6",
    baseUrl: "http://localhost:3000",
    chromeWebSecurity: false,
  },
});
