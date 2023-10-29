import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { PostsService } from 'src/app/services/posts.service';
import { Geolocation } from '@capacitor/geolocation';

interface Post {
  mensaje: string;
  coords: string | null;
  posicion: boolean;
}

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page {

  tempImages: string [] = [];
  cargandoGeo = false;

  constructor(private postsService: PostsService,
              private route: Router,
              private geolocation: Geolocation) {}

  post:Post = {
    mensaje: '',
    coords: null,
    posicion: false
  }

  async crearPost(){
    console.log(this.post)
    const creado = await this.postsService.crearPost( this.post );

    this.post = {
      mensaje: '',
      coords: null ,
      posicion: false
    };

    this.route.navigateByUrl('/main/tabs/tab1');
  }


  async getGeo(){

    if(!this.post.posicion){
      this.post.coords = null;
      return;
    }

    this.cargandoGeo = true;

    try{
      const coordinates = await Geolocation.getCurrentPosition();
    
      this.cargandoGeo = false;

      const coords = `${coordinates.coords.latitude},${coordinates.coords.longitude}`;
      console.log(coords);
      this.post.coords = coords;
    }catch(error){
      console.log(error);
      this.cargandoGeo = false;
    }
  }

}
