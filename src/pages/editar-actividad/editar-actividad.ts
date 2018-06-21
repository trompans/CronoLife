import { Component } from '@angular/core';
import { IonicPage, NavParams, ViewController } from 'ionic-angular';
import { Actividad } from '../../app/actividad.model';
import { DatabaseService } from '../../app/database.service';

@Component({
  selector: 'page-editar-actividad',
  templateUrl: 'editar-actividad.html',
})
export class EditarActividadPage {

  actividad : Actividad;

  constructor(public navParams: NavParams,
              public viewCtrl : ViewController,
              private servicioBD : DatabaseService) {
    console.log("en el contructor de editarActividad");
    this.actividad = <Actividad>this.navParams.data;
    console.log("icono " + this.actividad.icono);
    console.log("nombre " + this.actividad.nombre);
    console.log("idactividad " + this.actividad.idActividad)
  }


  guardar() {
    console.log("voy a guardar los cambios de la actividad");
    this.servicioBD.modificarActividad(this.actividad)
    .then(response => {
      console.log("response: " + response);
      console.log("actividad modificada nombre " + this.actividad.nombre);
      console.log("actividad modaificada icono " + this.actividad.icono);
      this.viewCtrl.dismiss(this.actividad);
    })
    .catch( error => {
      console.error( error );
    })
  }
  

  cerrarModal() {
    this.viewCtrl.dismiss();
  }
}
