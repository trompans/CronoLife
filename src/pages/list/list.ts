import { Component } from '@angular/core';
import { NavController, NavParams, AlertController } from 'ionic-angular';
import { Actividad } from '../../app/actividad.model';
import { ActionSheetController } from 'ionic-angular';
import { ModalController } from 'ionic-angular';
//import { TranslateModule } from '@ngx-translate/core';
import { TranslateService } from '@ngx-translate/core';
import { NuevaActividadPage } from '../nueva-actividad/nueva-actividad';
import { EditarActividadPage } from '../editar-actividad/editar-actividad';
import { DatabaseService } from '../../app/database.service';

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

  constructor(public navCtrl: NavController, 
              public navParams: NavParams,
              public translate: TranslateService,
              public actionSheetCtrl: ActionSheetController,
              public modalCtrl : ModalController,
              private servicioBD : DatabaseService,
              public alertCtrl: AlertController) {

    this.obtenerTextos();
    this.obtenerActividades();

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
    let modalNuevaActividad = this.modalCtrl.create(NuevaActividadPage);
    modalNuevaActividad.present();
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
    const confirm = this.alertCtrl.create({
      title: '¿Seguro que quiere borrar la actividad? ¡¡¡¡ incluir ese borrado en servicio !!!!',
      message: 'Si borra esta actividad se borraran todos los registros de tiempo que tenga asociados.',
      buttons: [
        {
          text: 'Borrar',
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
          text: 'No borrar',
          handler: () => {
            console.log('no quiere borrar');
          }
        }
      ]
    });
    confirm.present();
  }
}
