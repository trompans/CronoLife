import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';
import { Actividad } from '../../app/actividad.model';
import { DatabaseService } from '../../app/database.service';

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
              public viewCtrl : ViewController,
              private servicioBD : DatabaseService) {
  }

  guardar(actividad : Actividad, valido : true) {
    console.log("voy a guardar la actividad");
    this.servicioBD.añadirActividad(actividad)
    .then(response => {
      console.log("response: " + response);
      this.viewCtrl.dismiss(actividad);
    })
    .catch( error => {
      console.error( error );
    })
  }

  cerrarModal() {
    this.viewCtrl.dismiss();
  }
}
