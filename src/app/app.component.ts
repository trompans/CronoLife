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
import { StatsActividadesPage } from '../pages/stats-actividades/stats-actividades';
import { DatabaseService } from './database.service';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { BienvenidaPage } from '../pages/bienvenida/bienvenida';
import { Observable } from 'rxjs/Observable';


@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;

  //private appInicializada = new BehaviorSubject<boolean>(false);
  rootPage: any = BienvenidaPage;
  pages: Array<{title: string, component: any}>;
  litMenuActividades : string;
  litMenuConfiguracion : string;
  litMenuActividadesInactivas : string;
  litMenuEstadActividad : string;

  constructor(public platform: Platform, 
              //public statusBar: StatusBar, 
              public splashScreen: SplashScreen,
              private translate: TranslateService,
              private modalCtrl: ModalController,
              private storage : Storage,
              private db : DatabaseService) {
    
    console.log("entro en constructor de MyApp");
    this.platform.ready().then(() => {

      //this.statusBar.styleDefault();
      // Muestro mi pantalla Splash animada
//      let splash = this.modalCtrl.create(SplashPage);
//    splash.present();

      this.storage.get("idioma").then(
        (idioma) => {
          // obtengo idioma guardado en la configuración
          console.log("idioma: " + idioma);
          if ( idioma ) {
            console.log("idioma = " + idioma);
            this.translate.setDefaultLang(idioma);
            this.translate.use(idioma);
          } else {
            this.translate.setDefaultLang('es');
            this.translate.use('es');
          }
         
          //this.obtenerTextos();
          // comenzamos la traduccion de textos que necesitamos
          let clavesTraduccion : string[];
          clavesTraduccion = ['ACTIVIDADES', 
                              'CONFIGURACION',
                              'ACTIVIDADES_INACTIVAS',
                              'ESTADISTICAS_ACTIVIDAD'];
          this.translate.get(clavesTraduccion).subscribe(
            value => {
              // value is our translated string
              console.log("value = " + value);
              console.log("traducciones de opciones de menu");
              console.log("1 " + value["ACTIVIDADES"]);
              console.log("2 " + value[1]);
              console.log("3 " + value[2]);
              console.log("4 " + value[3]);
              this.pages = [
                { title: value["ACTIVIDADES"], component: ListPage },
                { title: value["ESTADISTICAS_ACTIVIDAD"], component: OpcionesConfigPage },
                { title: value["ACTIVIDADES_INACTIVAS"], component: ActividadesOcultasPage},
                { title: value["CONFIGURACION"], component: StatsActividadesPage}
              ];
              this.initializeApp();
            }
          );
        }
      );
    });       
  }

  obtenerTextos() {
    let clavesTraduccion : string[];
    clavesTraduccion = ['ACTIVIDADES', 
                        'CONFIGURACION',
                        'ACTIVIDADES_INACTIVAS',
                        'ESTADISTICAS_ACTIVIDAD'];
    return this.translate.get(clavesTraduccion).subscribe(
      value => {
        // value is our translated string
        this.litMenuActividades = value(0);
        this.litMenuConfiguracion = value(1);
        this.litMenuActividadesInactivas = value(2);
        this.litMenuEstadActividad = value(3);



      }
    );

   /* this.translate.get('ACTIVIDADES').subscribe(
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
    this.translate.get('ESTADISTICAS_ACTIVIDAD').subscribe(
      value => {
        // value is our translated string
        this.litMenuEstadActividad = value;
      }
    );*/
  }

  initializeApp() {
    console.log ("Entra en initializeApp");

      console.log ("then initializeApp");
      this.db.prepararBD();      
      
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      
    
      // used for an example of ngFor and navigation
      /*this.pages = [
        { title: this.litMenuActividades, component: ListPage },
        { title: this.litMenuEstadActividad, component: StatsActividadesPage},
        { title: this.litMenuActividadesInactivas, component: ActividadesOcultasPage},
        { title: this.litMenuConfiguracion, component: OpcionesConfigPage }
      ];*/
      // Remove the automatically generated call to hide the splash screen
      //this.splashScreen.hide();


      //this.appInicializada.next(true);

  }

  /*appEstaInicializada() {
    console.log("estoy en appEstaInicializada");
    return new Promise((resolve, reject) => {
        //if dbReady is true, resolve
        if (this.appInicializada.getValue()) {
            resolve();
        }
        //otherwise, wait to resolve until dbReady returns true
        else {
            this.appInicializada.subscribe((ready) => {
                if (ready) {
                    resolve();
                }
            });
        }
    })
  }*/

  openPage(page) {
    // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario
    this.nav.setRoot(page.component);
  }
}
