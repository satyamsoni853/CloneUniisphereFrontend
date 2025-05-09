// vite.config.js
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { splitVendorChunkPlugin } from 'vite';
import path from 'path';

export default defineConfig({
  server: {
    host: '0.0.0.0',
    port: 5173, // Explicit port for clarity
    fs: {
      strict: true, // Enforce strict file system access for security
    },
  },
  base: '/',
  plugins: [react(), splitVendorChunkPlugin()],
  resolve: {
    alias: {
      '@components': path.resolve(__dirname, './src/Components'), // Specific alias
    },
  },
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          'react-vendor': ['react', 'react-dom', 'react-router-dom'],
          'auth-components': [
            '@components/UserLogin/UserLogin',
            '@components/ForgotPassword/ForgotPassword',
            '@components/UserSignupWithEmailAndPassword/UserSignupWithEmailAndPassword',
          ],
          'dashboard-features': [
            '@components/View/View',
            '@components/Self-Profile/SelfProfile',
            '@components/FullFlowerSectionPage/FullFlowerSectionPage',
          ],
          'messaging': [
            '@components/MessageFinalClass/MessageFinalClass', // Fixed casing
            '@components/MessageFinalClass-2/MessageFinalClass2',
            '@components/BottomMessagesWidget/BottomMessagesWidget',
            '@components/MessageMobileInbox/MessageMobileInbox',
          ],
          'resources': [
            '@components/Resources/Resources',
            '@components/Resources/Books',
            '@components/Resources/EventNews',
            '@components/Resources/EventDescription',
          ],
        },
      },
    },
    chunkSizeWarningLimit: 1000, // 1MB limit
  },
});