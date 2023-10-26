import { Injectable, inject } from '@angular/core';
import { CanMatchFn, UrlTree, CanLoad } from '@angular/router';
import { Observable } from 'rxjs';
import { UsuarioService } from '../services/usuario.service';

@Injectable({
  providedIn: 'root'
})
export class UsuarioGuard implements  CanLoad {

  //Lo he implementado de otra forma que no está deprecated en usuario2.guard

  constructor(private usuarioService: UsuarioService){}


  canLoad(): Observable<boolean> | Promise<boolean> | boolean {
    return this.usuarioService.validaToken();
  }



}
