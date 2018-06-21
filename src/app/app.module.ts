import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';

import { MyApp } from './app.component';
import { ListPage } from '../pages/list/list';
import { NuevaActividadPage } from '../pages/nueva-actividad/nueva-actividad';
import { EditarActividadPage } from '../pages/editar-actividad/editar-actividad';
import { SplashPage } from '../pages/splash/splash';
import { ActividadComenzadaPage } from '../pages/actividad-comenzada/actividad-comenzada';
import { ActividadesOcultasPage } from '../pages/actividades-ocultas/actividades-ocultas';
import { OpcionesConfigPage } from '../pages/opciones-config/opciones-config';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { SQLite } from '@ionic-native/sqlite';
import { DatabaseService } from './database.service';
import { IonicStorageModule } from '@ionic/storage';

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
    ActividadComenzadaPage,
    ActividadesOcultasPage,
    OpcionesConfigPage
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    IonicModule.forRoot(MyApp),
    IonicStorageModule.forRoot(),
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
    ActividadComenzadaPage,
    ActividadesOcultasPage,
    OpcionesConfigPage
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
