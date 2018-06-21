import { Component, ViewChild } from '@angular/core';
import { Nav, Platform, List, ModalController } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { TranslateService } from '@ngx-translate/core';
import { ListPage } from '../pages/list/list';
import { ActividadesOcultasPage } from '../pages/actividades-ocultas/actividades-ocultas';
import { OpcionesConfigPage } from '../pages/opciones-config/opciones-config';
import { Storage } from '@ionic/storage';
import { SplashPage } from '../pages/splash/splash'
<<<<<<< HEAD
import { StatsActividadesPage } from '../pages/stats-actividades/stats-actividades';
=======
import { DatabaseService } from './database.service';
>>>>>>> 015c3409de1bcb492b6a00d61b740c106c8d1a35


@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;

  rootPage: any = ListPage;
  pages: Array<{title: string, component: any}>;
  litMenuActividades : string;
  litMenuConfiguracion : string;
  litMenuActividadesInactivas : string;

  constructor(public platform: Platform, 
              public statusBar: StatusBar, 
              public splashScreen: SplashScreen,
              private translate: TranslateService,
              private modalCtrl: ModalController,
              private storage : Storage,
              private db : DatabaseService) {

<<<<<<< HEAD
    this.translateService.setDefaultLang('en');
    this.translateService.use('en');

    // used for an example of ngFor and navigation
    this.pages = [
      { title: 'List', component: ListPage },
      { title: 'Estadísticas por actividad', component: StatsActividadesPage }
    ];
=======
    this.storage.get("idioma").then(
      (idioma) => {
        if ( idioma ) {
          console.log("idioma = " + idioma);
          this.translate.setDefaultLang(idioma);
          this.translate.use(idioma);
        } else {
          this.translate.setDefaultLang('es');
          this.translate.use('es');
        }
        this.obtenerTextos();
        this.initializeApp();
        // used for an example of ngFor and navigation
        this.pages = [
          { title: this.litMenuActividades, component: ListPage },
          { title: this.litMenuConfiguracion, component: OpcionesConfigPage },
          { title: this.litMenuActividadesInactivas, component: ActividadesOcultasPage}
        ];
      });                
  }
>>>>>>> 015c3409de1bcb492b6a00d61b740c106c8d1a35

  obtenerTextos() {
    this.translate.get('ACTIVIDADES').subscribe(
      value => {
        // value is our translated string
        this.litMenuActividades = value;
      }
    );
    this.translate.get('CONFIGURACION').subscribe(
      value => {
        // value is our translated string
        this.litMenuConfiguracion = value;
      }
    );
    this.translate.get('ACTIVIDADES_INACTIVAS').subscribe(
      value => {
        // value is our translated string
        this.litMenuActividadesInactivas = value;
      }
    );
  }

  initializeApp() {
    console.log ("Entra en initializeApp");
    this.platform.ready().then(() => {
      console.log ("then initializeApp");
      this.db.prepararBD();      
      
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      this.statusBar.styleDefault();
      // Remove the automatically generated call to hide the splash screen
      this.splashScreen.hide();
      let splash = this.modalCtrl.create(SplashPage);
      splash.present();
    });
  }

  openPage(page) {
    // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario
    this.nav.setRoot(page.component);
  }
}
