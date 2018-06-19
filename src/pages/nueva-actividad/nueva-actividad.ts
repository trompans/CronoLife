import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';
import { Actividad } from '../../app/actividad.model';

/**
 * Generated class for the EditarActividadPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */


@Component({
  selector: 'page-nueva-actividad',
  templateUrl: 'nueva-actividad.html',
})
export class NuevaActividadPage {
  actividad : Actividad;

  constructor(public navCtrl: NavController, 
              public navParams: NavParams,
              public viewCtrl : ViewController) {
    this.actividad = new Actividad(0, "", "", true);


  }

  guardar(actividad : Actividad, valido : true) {
    console.log("voy a guardar la actividad");
    //actividad.guardarNueva
    this.actividad = actividad;

    this.viewCtrl.dismiss(this.actividad);
  }

  cerrarModal() {
    this.viewCtrl.dismiss();
  }
}
