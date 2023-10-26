import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { PostsService } from 'src/app/services/posts.service';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page {

  tempImages: string [] = [];
  cargandoGeo = false;

  constructor(private postsService: PostsService,
              private route: Router) {}

  post = {
    mensaje: '',
    coords: null,
    posicion: false
  }

  async crearPost(){
    console.log(this.post)
    const creado = await this.postsService.crearPost( this.post );

    this.post = {
      mensaje: '',
      coords: null,
      posicion: false
    };

    this.route.navigateByUrl('/main/tabs/tab1');
  }


  getGeo(){

    if(!this.post.posicion){
      this.post.coords = null;
      return;
    }

    this.cargandoGeo = true;
    console.log(this.post);
  }

}
