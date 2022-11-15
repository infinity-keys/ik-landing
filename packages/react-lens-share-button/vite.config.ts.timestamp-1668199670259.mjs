// vite.config.ts
import { resolve } from "node:path";
import { vanillaExtractPlugin } from "file:///Users/tawnee/Documents/dev/websites/redwood-ik-landing/node_modules/@vanilla-extract/vite-plugin/dist/vanilla-extract-vite-plugin.cjs.js";
import react from "file:///Users/tawnee/Documents/dev/websites/redwood-ik-landing/node_modules/@vitejs/plugin-react/dist/index.mjs";
import { defineConfig } from "file:///Users/tawnee/Documents/dev/websites/redwood-ik-landing/node_modules/vite/dist/node/index.js";
import dts from "file:///Users/tawnee/Documents/dev/websites/redwood-ik-landing/node_modules/vite-plugin-dts/dist/index.mjs";
import tsConfigPaths from "file:///Users/tawnee/Documents/dev/websites/redwood-ik-landing/node_modules/vite-tsconfig-paths/dist/index.mjs";

// package.json
var peerDependencies = {
  react: "16.8.0 || >=17.x",
  "react-dom": "16.8.0 || >=17.x"
};

// vite.config.ts
var vite_config_default = defineConfig(() => ({
  plugins: [
    react(),
    vanillaExtractPlugin(),
    tsConfigPaths(),
    dts({
      include: ["src/components"]
    })
  ],
  build: {
    lib: {
      entry: resolve("src", "components/index.ts"),
      name: "LensShareButton",
      formats: ["es", "cjs"],
      fileName: (format) => `react-lens-share-button.${format}.js`
    },
    rollupOptions: {
      external: [...Object.keys(peerDependencies)]
    }
  }
}));
export {
  vite_config_default as default
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsidml0ZS5jb25maWcudHMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbImNvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9kaXJuYW1lID0gXCIvVXNlcnMvdGF3bmVlL0RvY3VtZW50cy9kZXYvd2Vic2l0ZXMvcmVkd29vZC1pay1sYW5kaW5nL3BhY2thZ2VzL3JlYWN0LWxlbnMtc2hhcmUtYnV0dG9uXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ZpbGVuYW1lID0gXCIvVXNlcnMvdGF3bmVlL0RvY3VtZW50cy9kZXYvd2Vic2l0ZXMvcmVkd29vZC1pay1sYW5kaW5nL3BhY2thZ2VzL3JlYWN0LWxlbnMtc2hhcmUtYnV0dG9uL3ZpdGUuY29uZmlnLnRzXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ltcG9ydF9tZXRhX3VybCA9IFwiZmlsZTovLy9Vc2Vycy90YXduZWUvRG9jdW1lbnRzL2Rldi93ZWJzaXRlcy9yZWR3b29kLWlrLWxhbmRpbmcvcGFja2FnZXMvcmVhY3QtbGVucy1zaGFyZS1idXR0b24vdml0ZS5jb25maWcudHNcIjtpbXBvcnQgeyByZXNvbHZlIH0gZnJvbSAnbm9kZTpwYXRoJ1xuXG5pbXBvcnQgeyB2YW5pbGxhRXh0cmFjdFBsdWdpbiB9IGZyb20gJ0B2YW5pbGxhLWV4dHJhY3Qvdml0ZS1wbHVnaW4nXG5pbXBvcnQgcmVhY3QgZnJvbSAnQHZpdGVqcy9wbHVnaW4tcmVhY3QnXG5pbXBvcnQgeyBkZWZpbmVDb25maWcgfSBmcm9tICd2aXRlJ1xuaW1wb3J0IGR0cyBmcm9tICd2aXRlLXBsdWdpbi1kdHMnXG5pbXBvcnQgdHNDb25maWdQYXRocyBmcm9tICd2aXRlLXRzY29uZmlnLXBhdGhzJ1xuXG5pbXBvcnQgKiBhcyBwYWNrYWdlSnNvbiBmcm9tICcuL3BhY2thZ2UuanNvbidcblxuZXhwb3J0IGRlZmF1bHQgZGVmaW5lQ29uZmlnKCgpID0+ICh7XG4gIHBsdWdpbnM6IFtcbiAgICByZWFjdCgpLFxuICAgIHZhbmlsbGFFeHRyYWN0UGx1Z2luKCksXG4gICAgdHNDb25maWdQYXRocygpLFxuICAgIGR0cyh7XG4gICAgICBpbmNsdWRlOiBbJ3NyYy9jb21wb25lbnRzJ10sXG4gICAgfSksXG4gIF0sXG4gIGJ1aWxkOiB7XG4gICAgbGliOiB7XG4gICAgICBlbnRyeTogcmVzb2x2ZSgnc3JjJywgJ2NvbXBvbmVudHMvaW5kZXgudHMnKSxcbiAgICAgIG5hbWU6ICdMZW5zU2hhcmVCdXR0b24nLFxuICAgICAgZm9ybWF0czogWydlcycsICdjanMnXSxcbiAgICAgIGZpbGVOYW1lOiAoZm9ybWF0KSA9PiBgcmVhY3QtbGVucy1zaGFyZS1idXR0b24uJHtmb3JtYXR9LmpzYCxcbiAgICB9LFxuICAgIHJvbGx1cE9wdGlvbnM6IHtcbiAgICAgIGV4dGVybmFsOiBbLi4uT2JqZWN0LmtleXMocGFja2FnZUpzb24ucGVlckRlcGVuZGVuY2llcyldLFxuICAgIH0sXG4gIH0sXG59KSlcbiJdLAogICJtYXBwaW5ncyI6ICI7QUFBMGIsU0FBUyxlQUFlO0FBRWxkLFNBQVMsNEJBQTRCO0FBQ3JDLE9BQU8sV0FBVztBQUNsQixTQUFTLG9CQUFvQjtBQUM3QixPQUFPLFNBQVM7QUFDaEIsT0FBTyxtQkFBbUI7Ozs7Ozs7OztBQUkxQixJQUFPLHNCQUFRLGFBQWEsT0FBTztBQUFBLEVBQ2pDLFNBQVM7QUFBQSxJQUNQLE1BQU07QUFBQSxJQUNOLHFCQUFxQjtBQUFBLElBQ3JCLGNBQWM7QUFBQSxJQUNkLElBQUk7QUFBQSxNQUNGLFNBQVMsQ0FBQyxnQkFBZ0I7QUFBQSxJQUM1QixDQUFDO0FBQUEsRUFDSDtBQUFBLEVBQ0EsT0FBTztBQUFBLElBQ0wsS0FBSztBQUFBLE1BQ0gsT0FBTyxRQUFRLE9BQU8scUJBQXFCO0FBQUEsTUFDM0MsTUFBTTtBQUFBLE1BQ04sU0FBUyxDQUFDLE1BQU0sS0FBSztBQUFBLE1BQ3JCLFVBQVUsQ0FBQyxXQUFXLDJCQUEyQjtBQUFBLElBQ25EO0FBQUEsSUFDQSxlQUFlO0FBQUEsTUFDYixVQUFVLENBQUMsR0FBRyxPQUFPLEtBQWlCLGdCQUFnQixDQUFDO0FBQUEsSUFDekQ7QUFBQSxFQUNGO0FBQ0YsRUFBRTsiLAogICJuYW1lcyI6IFtdCn0K
