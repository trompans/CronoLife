import { Component } from '@angular/core';
import { IonicPage, ViewController } from 'ionic-angular';



@Component({
  selector: 'page-bienvenida',
  templateUrl: 'bienvenida.html',
})
export class BienvenidaPage {


  constructor(public viewCtrl : ViewController) {
    console.log("en el contructor de BienvenidaPage");

  }


}