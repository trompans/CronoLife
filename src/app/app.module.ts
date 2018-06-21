import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';

import { MyApp } from './app.component';
import { ListPage } from '../pages/list/list';
import { NuevaActividadPage } from '../pages/nueva-actividad/nueva-actividad';
import { EditarActividadPage } from '../pages/editar-actividad/editar-actividad';
import { SplashPage } from '../pages/splash/splash';
import { StatsActividadesPage } from '../pages/stats-actividades/stats-actividades';


import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { SQLite } from '@ionic-native/sqlite';
import { DatabaseService } from './database.service';
import { Chart } from 'chart.js';

export function createTranslateLoader(httpClient: HttpClient) {
  return new TranslateHttpLoader(httpClient, './assets/i18n/', '.json');
}

@NgModule({
  declarations: [
    MyApp,
    ListPage,
    NuevaActividadPage,
    EditarActividadPage,
    SplashPage,
    StatsActividadesPage
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    IonicModule.forRoot(MyApp),
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: (createTranslateLoader),
        deps: [HttpClient]
      }})
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    ListPage,
    NuevaActividadPage,
    EditarActividadPage,
    SplashPage,
    StatsActividadesPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    SQLite,
    DatabaseService
  ]
})



export class AppModule {}
