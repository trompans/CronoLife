import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { Actividad } from '../../app/actividad.model';
import { ActionSheetController } from 'ionic-angular';
//import { TranslateModule } from '@ngx-translate/core';
import {TranslateService} from '@ngx-translate/core';

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
              public actionSheetCtrl: ActionSheetController) {
    // If we navigated to this page, we will have an item available as a nav param
    this.actvidadSelect = navParams.get('item');

    // Let's populate this page with some filler content for funzies
    //this.icons = ['flask', 'wifi', 'beer', 'football', 'basketball', 'paper-plane',
    //'american-football', 'boat', 'bluetooth', 'build'];

    this.listaActividades = Actividad.getActividadesActivas();

    this.obtenerTextos();
  }

  itemTapped(event, item) {
    // That's right, we're pushing to ourselves!
    this.navCtrl.push(ListPage, {
      item: item
    });
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

  mostrarAcciones(idActividad : number) {

    const actionSheet = this.actionSheetCtrl.create({
      buttons: [
        {
          text: this.litComenzar,
          handler: () => {
            console.log('Comenzar a contar tiempo');
          }
        },{
          text: this.litEditar,
          handler: () => {
            console.log('Editar');
          }
        },{
          text: this.litDesactivar,
          handler: () => {
            console.log('Desactivar');
          }
        },{
          text: this.litBorrar,
          handler: () => {
            console.log('Borrar');
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
