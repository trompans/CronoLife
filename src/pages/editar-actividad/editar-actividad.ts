import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';
import { Actividad } from '../../app/actividad.model';

@Component({
  selector: 'page-editar-actividad',
  templateUrl: 'editar-actividad.html',
})
export class EditarActividadPage {

  actividad : Actividad;

  constructor(public navCtrl: NavController, 
              public navParams: NavParams,
              public viewCtrl : ViewController) {
    
    this.actividad = <Actividad>this.navParams.data;
  }

  cerrarModal() {
    this.viewCtrl.dismiss();
  }
}
