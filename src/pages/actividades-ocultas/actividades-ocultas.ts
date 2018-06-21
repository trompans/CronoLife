import { Component } from '@angular/core';
import { Actividad } from '../../app/actividad.model';
import { DatabaseService } from '../../app/database.service';

@Component({
  selector: 'page-actividades-ocultas',
  templateUrl: 'actividades-ocultas.html'
})
export class ActividadesOcultasPage {
  actvidadSelect: Actividad;

  //icons: string[];
  listaActividades: Actividad[];

  tituloActionSheet : string;
  litEditar : string;
  litBorrar : string;
  litComenzar : string;
  litCancelar : string;
  litDesactivar : string;

  constructor(private servicioBD : DatabaseService) {
    console.log("voy a obtener las actividades")
    this.obtenerActividadesOcultas();
    console.log("he obtenido las actividades");
  }

  obtenerActividadesOcultas() {
    this.servicioBD.getActividadesInactivas()
    .then(actividades => {
      console.log(actividades);
      this.listaActividades = actividades;
    })
    .catch( error => {
      console.error( error );
    });
  }

  activarActividad(idActividad: number, indice : number) {
    console.log('Activar');
    this.servicioBD.reactivarActividad(idActividad)
    .then(response => {
      console.log(response);
      this.listaActividades.splice(indice, 1);
    })
    .catch( error => {
      console.error( error );
    });
  }         
}
