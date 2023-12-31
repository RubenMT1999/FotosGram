import { HttpClient, HttpHeaders } from '@angular/common/http';
import { EventEmitter, Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { RespuestaPosts, Post } from '../interfaces/interfaces';
import { UsuarioService } from './usuario.service';

const URL = environment.url;

@Injectable({
  providedIn: 'root'
})
export class PostsService {

  paginaPosts = 0;

  //Cuando creamos el nuevo post, emitimos su valor hacia el tab1 para que
  //lo añada a su lista de posts sin que tengamos que hacer refresh manualmente
  nuevoPost = new EventEmitter<Post>();

  constructor(private http: HttpClient,
              private usuarioService: UsuarioService) { }

//El pull lo hemos puesto para implementar la recarga de la página
  getPosts( pull: boolean = false ){

    if(pull){
      this.paginaPosts = 0;
    }

    this.paginaPosts ++;

    return this.http.get<RespuestaPosts>(`${URL}/posts?pagina=${this.paginaPosts}`);
  }


  crearPost( post:any ){
    const headers = new HttpHeaders({
      'x-token': this.usuarioService.token || ''
    });

    return new Promise( resolve => {
      this.http.post(`${URL}/posts`, post, {headers})
      .subscribe( (resp:any)=> {
        this.nuevoPost.emit(resp.post);
        resolve(true);
      });
    });

    
  }


}
