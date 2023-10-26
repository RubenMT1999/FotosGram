import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';


interface Avatar{
  img: string;
  seleccionado: boolean;
}

@Component({
  selector: 'app-avatar-selector',
  templateUrl: './avatar-selector.component.html',
  styleUrls: ['./avatar-selector.component.scss'],
})
export class AvatarSelectorComponent  implements OnInit {

  @Output() avatarSel = new EventEmitter();
  @Input() avatarActual: string = 'av-1.png';

  avatars = [
    {
      img: 'av-1.png',
      seleccionado: true
    },
    {
      img: 'av-2.png',
      seleccionado: false
    },
    {
      img: 'av-3.png',
      seleccionado: false
    },
    {
      img: 'av-4.png',
      seleccionado: false
    },
    {
      img: 'av-5.png',
      seleccionado: false
    },
    {
      img: 'av-6.png',
      seleccionado: false
    },
    {
      img: 'av-7.png',
      seleccionado: false
    },
    {
      img: 'av-8.png',
      seleccionado: false
    },
];

  constructor() { }

  

  ngOnInit() {
    this.avatars.forEach(avatar => avatar.seleccionado = false);

    for( const avatar of this.avatars ){
      if(avatar.img === this.avatarActual){
        avatar.seleccionado = true;
        break;
      }
    }
  }


  //cuando haga click en un avatar va a emitir el valor del avatar
  //en el tab3 html x ejemplo lo podemos usar para establecerle al usuario
  //el avatar emitido desde aqui.
  seleccionarAvatar( avatar:any ){
    //quito la selección de todos
    this.avatars.forEach(av => av.seleccionado = false);

    avatar.seleccionado = true;

    this.avatarSel.emit(avatar.img);
  }


}
