import { Component, OnInit } from '@angular/core';
import { Post } from 'src/app/interfaces/interfaces';
import { PostsService } from 'src/app/services/posts.service';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page implements OnInit{

  posts: Post[] = [];

  habilitado = true;

  constructor(private postsService: PostsService) {}

  ngOnInit(): void {
    this.siguientes();

    //Al principio si el nuevoPost no ha emitido ningún valor, al subscribirme
    //la respuesta será undefined y hará algo así como ignorarlo. Cuando el nuevoPost 
    //emita un valor, entonces al hacer el subscribe obtendré el valor de esa emisión
    this.postsService.nuevoPost
        .subscribe( post => {
          //Añadir al arreglo en las primeras posiciones
          this.posts.unshift(post);
        });
  }


  recargar(event: any){
    this.posts = [];
    this.siguientes(event, true);
    this.habilitado = true;
  }


  siguientes(event?:any, pull: boolean = false){

    this.postsService.getPosts( pull ).subscribe( resp => {
      console.log(resp);
      // ... sirve para combinar o añadir elementos de un iterable a otro iterable, como un array.
      this.posts.push( ...resp.posts );
    

      if(event){
        event.target.complete();

        //Si ya no puede recuperar mas posts es que llegamos al final,
        //desabilidamos el infinite scroll para que no se ejecute más
        //veces al llegar abajo
        if(resp.posts.length === 0){
          this.habilitado = false;
        }
        
      }
    });
  }

}
