import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { PostsService } from 'src/app/services/posts.service';
import { Geolocation } from '@capacitor/geolocation';
import { Camera, CameraResultType } from '@capacitor/camera';

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
              private geolocation: Geolocation,
              ) {}

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


  camara(){
    const takePicture = async () => {
      const image = await Camera.getPhoto({
        quality: 90,
        allowEditing: true,
        resultType: CameraResultType.Uri,
        correctOrientation: true,
      });
    
      // image.webPath will contain a path that can be set as an image src.
      // You can access the original file using image.path, which can be
      // passed to the Filesystem API to read the raw data of the image,
      // if desired (or pass resultType: CameraResultType.Base64 to getPhoto)
      var imageUrl = image.webPath;

      this.tempImages.push(imageUrl!);
    
      // Can be set to the src of an image now
      //imageElement.src = imageUrl;
    };
  }



}
