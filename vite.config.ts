import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  optimizeDeps: {
    include: [
      "@supabase/supabase-js",
      "@supabase/postgrest-js",
      "@supabase/realtime-js",
      "@supabase/storage-js",
      "@supabase/functions-js",
      "@supabase/auth-js",
    ],
  },
  build: {
    commonjsOptions: {
      include: [/node_modules/],
    },
    chunkSizeWarningLimit: 700,
  },
  resolve: {
    dedupe: [
      "@supabase/supabase-js",
      "@supabase/postgrest-js",
      "@supabase/realtime-js",
      "@supabase/storage-js",
      "@supabase/functions-js",
      "@supabase/auth-js",
    ],
  },
});