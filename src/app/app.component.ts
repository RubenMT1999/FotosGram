import { Component, enableProdMode } from '@angular/core';
import { register } from 'swiper/element/bundle';

//para usar componente swipper de ionic
register();


@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {


  constructor() {}
}
