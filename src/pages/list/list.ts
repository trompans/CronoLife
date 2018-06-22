import { Component } from '@angular/core';
import { NavController, NavParams, AlertController } from 'ionic-angular';
import { Actividad } from '../../app/actividad.model';
import { ActionSheetController } from 'ionic-angular';
import { ModalController } from 'ionic-angular';
//import { TranslateModule } from '@ngx-translate/core';
import { TranslateService } from '@ngx-translate/core';
import { NuevaActividadPage } from '../nueva-actividad/nueva-actividad';
import { EditarActividadPage } from '../editar-actividad/editar-actividad';
import { ActividadComenzadaPage } from '../actividad-comenzada/actividad-comenzada';
import { DatabaseService } from '../../app/database.service';
//import { MyApp } from '../../app/app.component';

@Component({
  selector: 'page-list',
  templateUrl: 'list.html'
})
export class ListPage {
  actvidadSelect: Actividad;

  //icons: string[];
  listaActividades: Actividad[];
  tituloActionSheet : string;
  litEditar : string;
  litBorrar : string;
  litComenzar : string;
  litCancelar : string;
  litDesactivar : string;
  litNoBorrar : string;
  litTitConfirmBorrar : string;
  litMsgConfirmBorrar : string;

  constructor(public navCtrl: NavController, 
              public navParams: NavParams,
              public translate: TranslateService,
              public actionSheetCtrl: ActionSheetController,
              public modalCtrl : ModalController,
              private servicioBD : DatabaseService,
              public alertCtrl: AlertController) {
              //public app : MyApp) {


    //app.appEstaInicializada()
    //.then(()=>{
      console.log("voy a traducciones");
      this.obtenerTextos();
      console.log("voy a obtener las actividades")
      this.obtenerActividades();
    //});
  }

  obtenerTextos() {
    this.translate.get('TITULO_ACTIONSHEET').subscribe(
      value => {
        // value is our translated string
        this.tituloActionSheet = value;
      }
    );
    this.translate.get('EDITAR').subscribe(
      value => {
        // value is our translated string
        this.litEditar = value;
      }
    );
    this.translate.get('BORRAR').subscribe(
      value => {
        // value is our translated string
        this.litBorrar = value;
      }
    );
    this.translate.get('DESACTIVAR').subscribe(
      value => {
        // value is our translated string
        this.litDesactivar = value;
      }
    );
    this.translate.get('COMENZAR').subscribe(
      value => {
        // value is our translated string
        this.litComenzar = value;
      }
    );
    this.translate.get('CANCELAR').subscribe(
      value => {
        // value is our translated string
        this.litCancelar = value;
      }
    );
    this.translate.get('NO_BORRAR').subscribe(
      value => {
        // value is our translated string
        this.litNoBorrar = value;
      }
    );
    this.translate.get('TITULO_CONFIRMA_BORRAR').subscribe(
      value => {
        // value is our translated string
        this.litTitConfirmBorrar = value;
      }
    );
    this.translate.get('TITULO_CONFIRMA_BORRAR').subscribe(
      value => {
        // value is our translated string
        this.litMsgConfirmBorrar = value;
      }
    );
  }

  obtenerActividades() {
    this.servicioBD.getActividadesActivas()
    .then(actividades => {
      console.log(actividades);
      this.listaActividades = actividades;
    })
    .catch( error => {
      console.error( error );
    });
  }

  nuevaActividad() {
    console.log("en nuevaActividad()");
    let modalNuevaActividad = this.modalCtrl.create(NuevaActividadPage);
    modalNuevaActividad.present();
    // código para cuando se cierre la pantalla modal de nueva actividad
    modalNuevaActividad.onDidDismiss( actividad => {
        if (actividad) {
          console.log("me devuelve la actividad " + actividad);
          this.listaActividades.push(actividad);
        }
    });

  }             

  mostrarAcciones(actividad : Actividad, indice : number) {
    const actionSheet = this.actionSheetCtrl.create({
      buttons: [
        {
          text: this.litComenzar,
          handler: () => {
            console.log('Comenzar a contar tiempo');
            this.servicioBD.iniciarActividad(actividad.idActividad)
            .then(response => {
              console.log(response);
              let modalActividadComenzada = this.modalCtrl.create(ActividadComenzadaPage, actividad);
              modalActividadComenzada.present();
            })
            .catch( error => {
              console.error( error );
            });
          }
        },{
          text: this.litEditar,
          handler: () => {
            console.log('Editar');
            let modalEditarActividad = this.modalCtrl.create(EditarActividadPage, actividad);
            modalEditarActividad.present();
            // código para cuando se cierre la pantalla modal de editar actividad
            modalEditarActividad.onDidDismiss( actividad => {
              if (actividad) {
                console.log("me devuelve la actividad " + actividad);
                // modifica la actividad en el array de actividades activas 
                this.listaActividades[indice].icono = actividad.icono;
                this.listaActividades[indice].nombre = actividad.nombre;
              }
            });
          }
        },{
          text: this.litDesactivar,
          handler: () => {
            console.log('Desactivar');
            this.servicioBD.desactivarActividad(actividad.idActividad)
            .then(response => {
              console.log(response);
              this.listaActividades.splice(indice, 1);
            })
            .catch( error => {
              console.error( error );
            });
          }
        },{
          text: this.litBorrar,
          handler: () => {
            console.log('Borrar');
            this.pedirConfirmacionBorrar(actividad, indice);
          }
        },{
          text: this.litCancelar,
          role: 'cancel',
          handler: () => {
            console.log('Cancel clicked');
          }
        }
      ]
    });
    actionSheet.present();
  }

  pedirConfirmacionBorrar(actividad : Actividad, indice : number) {
    console.log("")
    const confirm = this.alertCtrl.create({
      title: this.litTitConfirmBorrar,
      message: this.litMsgConfirmBorrar,
      buttons: [
        {
          text: this.litBorrar,
          handler: () => {
            console.log('confirmado que quiere borrar');
            this.servicioBD.borrarActividad(actividad.idActividad)
            .then(response => {
              console.log(response);
              this.listaActividades.splice(indice, 1);
            })
            .catch( error => {
              console.error( error );
            });
          }
        },
        {
          text: this.litNoBorrar,
          handler: () => {
            console.log('no quiere borrar');
          }
        }
      ]
    });
    confirm.present();
  }

