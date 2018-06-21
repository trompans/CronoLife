import { Component } from '@angular/core';
import { NavParams, ViewController } from 'ionic-angular';
import { Actividad } from '../../app/actividad.model';
import { DatabaseService } from '../../app/database.service';

@Component({
  selector: 'page-nueva-actividad',
  templateUrl: 'nueva-actividad.html',
})

export class NuevaActividadPage {
  actividad : Actividad;

  constructor(public navParams: NavParams,
              public viewCtrl : ViewController,
              private servicioBD : DatabaseService) {
    console.log("en el contructor de nueva actividad");
    this.actividad = new Actividad;
  }

  guardar(actividad : Actividad, valido : true) {
    console.log("voy a guardar la actividad");
    this.servicioBD.insertarActividad(actividad)
    .then(response => {
      console.log("response: " + response);
      console.log("actividad guardada nombre " + actividad.nombre);
      console.log("actividad guardada icono " + actividad.icono);
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
