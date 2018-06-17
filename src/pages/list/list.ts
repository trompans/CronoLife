import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { Actividad } from '../../app/actividad.model';
import { ActionSheetController } from 'ionic-angular';
import { ModalController } from 'ionic-angular';
//import { TranslateModule } from '@ngx-translate/core';
import { TranslateService } from '@ngx-translate/core';
import { NuevaActividadPage } from '../nueva-actividad/nueva-actividad';
import { EditarActividadPage } from '../editar-actividad/editar-actividad';

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
              public modalCtrl : ModalController) {

    this.listaActividades = Actividad.getActividadesActivas();

    this.obtenerTextos();
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
            actividad.comenzarCronometro();
          }
        },{
          text: this.litEditar,
          handler: () => {
            console.log('Editar');
            let modalEditarActividad = this.modalCtrl.create(EditarActividadPage);
            modalEditarActividad.present();
          }
        },{
          text: this.litDesactivar,
          handler: () => {
            console.log('Desactivar');
            this.listaActividades.splice(indice, 1);
          }
        },{
          text: this.litBorrar,
          handler: () => {
            console.log('Borrar');
            actividad.borrar();
            this.listaActividades.splice(indice, 1);
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
}
