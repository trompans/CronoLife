import { Component } from '@angular/core';
import { Storage } from '@ionic/storage';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'page-opciones-config',
  templateUrl: 'opciones-config.html',
  
})
export class OpcionesConfigPage {

  constructor(public storage : Storage,
              private translateService: TranslateService,) {
    console.log("en el contructor de OpcionesConfigPage");

  }

  cambiarIdioma(idioma : string) {
    this.storage.set("idioma", idioma);
    this.translateService.setDefaultLang(idioma);
    this.translateService.use(idioma);
  }
}