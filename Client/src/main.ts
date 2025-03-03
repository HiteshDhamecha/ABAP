/// <reference types="@angular/localize" />

import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { AppModule } from './app/app.module';
import { LoadGeneratedEntities } from 'mj_generatedentities'
import './polyfills';
LoadGeneratedEntities();

platformBrowserDynamic().bootstrapModule(AppModule)
  .catch(err => console.error(err));
    
