import type { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'io.ionic.starter',
  appName: 'CarRecordsUI',
  webDir: 'dist',
  server: {
    allowNavigation: [
      'http://192.168.0.246:8080',
      'http://localhost:8100', // If you're testing locally
      'capacitor://localhost'
    ],
    cleartext: true, // Allow cleartext traffic (HTTP)
  },
  android: {
    allowMixedContent: true
  }
};

export default config;
