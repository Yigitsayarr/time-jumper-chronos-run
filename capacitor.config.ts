
import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'app.lovable.ae24974183594184964650b9953504ed',
  appName: 'time-jumper-chronos-run',
  webDir: 'dist',
  server: {
    url: 'https://ae249741-8359-4184-9646-50b9953504ed.lovableproject.com?forceHideBadge=true',
    cleartext: true
  },
  android: {
    buildOptions: {
      keystorePath: 'release-key.keystore',
      keystoreAlias: 'key0',
      keystorePassword: 'your-keystore-password',
      storePassword: 'your-store-password'
    }
  }
};

export default config;
