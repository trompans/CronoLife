import { Component } from '@angular/core';
import { NavParams, ViewController } from 'ionic-angular';
import { Actividad } from '../../app/actividad.model';
import { DatabaseService } from '../../app/database.service';

@Component({
  selector: 'page-actividad-comenzada',
  templateUrl: 'actividad-comenzada.html',
})
export class ActividadComenzadaPage {

  actividad : Actividad;

  constructor(public navParams: NavParams,
              public viewCtrl : ViewController,
              private servicioBD : DatabaseService) {
    console.log("en el contructor de ActividadComenzadaPage");
    this.actividad = <Actividad>this.navParams.data;
  }

  detenerActividad() {
    console.log("voy a parar el crono de la actividad");
    this.servicioBD.finalizarActividad(this.actividad.idActividad)
    .then(response => {
      console.log("response: " + response);
      this.viewCtrl.dismiss();
    })
    .catch( error => {
      console.error( error );
    })
  }

}
