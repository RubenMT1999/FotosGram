import { AfterViewInit, CUSTOM_ELEMENTS_SCHEMA, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AlertController, NavController } from '@ionic/angular';
import { Usuario } from 'src/app/interfaces/interfaces';
import { UsuarioService } from 'src/app/services/usuario.service';


import  {Swiper}  from 'swiper';
import { SwiperOptions } from 'swiper/types';



@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit, AfterViewInit {

  @ViewChild('swiperEx') swiperEx?: ElementRef<{swiper: Swiper}>

  public alertButtons = ['OK'];

  public swiperConf!: SwiperOptions;

  swiper: Swiper | undefined;



  loginUser = {
    email: 'matiastiscar3@gmail.com',
    password: '123456'
  }


  registerUser: Usuario = {
    email: 'test@gmail.com',
    password: '123456',
    nombre: 'Test',
  };

 
 
  
  


  constructor( private usuarioService: UsuarioService,
                private navCtrl: NavController,
                private alertController: AlertController) {}


  ngAfterViewInit(): void {

  }

  ngOnInit() {
    
  }





  onSlideChange(){
    console.log(this.swiperEx?.nativeElement.swiper.activeIndex);
  }

  onSlidePrev(){
    console.log("okk")
    this.swiperEx?.nativeElement.swiper.slidePrev();
  }

  onSlideNext(){
    this.swiperEx?.nativeElement.swiper.slideNext();
  }



  async showErrorAlert() {
    const alert = await this.alertController.create({
      header: 'Error',
      message: 'Nombre de usuario o contraseña incorrectos.',
      buttons: this.alertButtons
    });

    await alert.present();
  }



  async login( fLogin: NgForm ){

    if(fLogin.invalid){return;}

    const valido = await this.usuarioService.login(this.loginUser.email, this.loginUser.password);

    if(valido){
      //navegar a tabs
      this.navCtrl.navigateRoot('/main/tabs/tab1', {animated: true});
    }else{
      //mostrar alerta de usuario y contraseña no correcto
      this.showErrorAlert();
    }
  }




  async registro( fRegistro: NgForm ){

    if(fRegistro.invalid){return;}

    const valido = await this.usuarioService.registro(this.registerUser);

    if(valido){
      this.navCtrl.navigateRoot('/main/tabs/tab1', {animated: true});
    }else{
      this.showErrorAlert();
    }

  }



  // async mostrarRegistro(){
  //   const swiper = new Swiper(this.swiperContainer.nativeElement, {
  //     allowTouchMove: true, // Habilita el movimiento táctil
  //     // Otras opciones personalizadas de Swiper aquí
  //   });

  //   swiper.slideTo(1, 0); // Cambia al slide de registro
  // }


  // async mostrarLogin(){
  //   const swiper = new Swiper(this.swiperContainer.nativeElement, {
  //     allowTouchMove: true, // Habilita el movimiento táctil
  //     // Otras opciones personalizadas de Swiper aquí
  //   });

  //   swiper.slideTo(0, 0); // Cambia al slide de inicio de sesión
  // }


}
