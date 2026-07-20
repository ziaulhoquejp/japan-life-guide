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
    backgroundColor: '#0D0907',
  },
  plugins: {
    PushNotifications: {
      presentationOptions: ['badge', 'sound', 'alert'],
    },
    Geolocation: {
      permissions: {
        location: 'whenInUse',
      },
    },
    SplashScreen: {
      launchShowDuration: 2000,
      backgroundColor: '#0D0907',
      showSpinner: false,
    },
  },
};

export default config;