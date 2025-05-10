
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { componentTagger } from "lovable-tagger";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  server: {
    host: "::",
    port: 8080,
  },
  plugins: [
    react(),
    mode === 'development' &&
    componentTagger(),
  ].filter(Boolean),
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
      // Add these aliases to handle React Native and Expo imports
      "react-native": "react-native-web",
    },
    extensions: ['.web.js', '.js', '.ts', '.jsx', '.tsx'],
  },
  optimizeDeps: {
    esbuildOptions: {
      // This helps handle the 'typeof' import syntax in React Native
      logLevel: 'info',
      target: 'esnext',
      define: {
        global: 'window',
      },
    },
  },
  build: {
    commonjsOptions: {
      // This helps resolve the React Native imports
      transformMixedEsModules: true,
    },
  },
}));
