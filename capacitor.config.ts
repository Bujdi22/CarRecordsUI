import type { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'io.ionic.starter',
  appName: 'CarRecordsUI',
  webDir: 'dist',
  server: {
    allowNavigation: [
      'https://api.autojournalapp.com', // If you're testing locally
      'capacitor://localhost'
    ],
    cleartext: true, // Allow cleartext traffic (HTTP)
  },
  android: {
    allowMixedContent: true
  }
};

export default config;
