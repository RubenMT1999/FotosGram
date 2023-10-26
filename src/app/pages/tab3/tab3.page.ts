import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Usuario } from 'src/app/interfaces/interfaces';
import { UsuarioService } from 'src/app/services/usuario.service';

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})
export class Tab3Page implements OnInit{

  usuario: Usuario = {};
  isToastOpen = false;
  toastMessage = ""

  constructor(private usuarioService: UsuarioService) {}

  ngOnInit(): void {
    this.usuario = this.usuarioService.getUsuario();
  }


  async actualizar(fActualizar: NgForm){
    if(fActualizar.invalid){return};

    const actualizado = await this.usuarioService.actualizarUsuario(this.usuario);

    if(actualizado){
      //toast con el mensaje de actualizado
      this.toastMessage = "Usuario actualizado!";
      this.setOpen(true);
    }else{
      //toast con el error.
      this.toastMessage = "Error al actualizar usuario. Inténtelo de nuevo";
      this.setOpen(true);
    }
  }


  logout(){

  }


  setOpen(isOpen: boolean) {
    this.isToastOpen = isOpen;
  }

}
