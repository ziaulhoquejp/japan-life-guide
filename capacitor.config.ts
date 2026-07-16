import type { CapacitorConfig } from '@capacitor/cli';
const config: CapacitorConfig = {
  appId: 'app.japanlifeguide.www',
  appName: 'Japan Life Guide',
  webDir: 'public',
  server: {
    url: 'https://japanlifeguide.app',
    cleartext: true,
    allowNavigation: ['japanlifeguide.app', '*.japanlifeguide.app'],
  },
  ios: {
    allowsLinkPreview: false,
    scrollEnabled: true,
    contentInset: 'always',
  },
};
export default config;