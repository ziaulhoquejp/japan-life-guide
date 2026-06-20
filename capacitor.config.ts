import type { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'app.japanlifeguide.www',
  appName: 'Japan Life Guide',
  webDir: 'public',
  server: {
    url: 'https://japanlifeguide.app',
    cleartext: true
  }
};

export default config;