import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { Actividad } from '../../app/actividad.model';

@Component({
  selector: 'page-list',
  templateUrl: 'list.html'
})
export class ListPage {
  actvidadSelect: Actividad;
  //icons: string[];
  listaActividades: Actividad[];

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    // If we navigated to this page, we will have an item available as a nav param
    this.actvidadSelect = navParams.get('item');

    // Let's populate this page with some filler content for funzies
    //this.icons = ['flask', 'wifi', 'beer', 'football', 'basketball', 'paper-plane',
    //'american-football', 'boat', 'bluetooth', 'build'];

    this.listaActividades = Actividad.getActividadesActivas();

  }

  itemTapped(event, item) {
    // That's right, we're pushing to ourselves!
    this.navCtrl.push(ListPage, {
      item: item
    });
  }
}
