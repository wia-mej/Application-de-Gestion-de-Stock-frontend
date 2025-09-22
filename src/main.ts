import { bootstrapApplication } from '@angular/platform-browser';
import { App } from './app/app';
import { appConfig } from './app/app.config';
import { provideHttpClient, withFetch, withInterceptorsFromDi } from '@angular/common/http';

bootstrapApplication(App, {
  providers: [
    // HttpClient “standalone”, compatible browser + SSR (Vite)
    provideHttpClient(
      withFetch(),                // nécessaire côté SSR/dev SSR
      withInterceptorsFromDi()    // si tu déclares des interceptors via DI
    ),
    ...(appConfig.providers ?? [])
  ]
}).catch(err => console.error(err));
