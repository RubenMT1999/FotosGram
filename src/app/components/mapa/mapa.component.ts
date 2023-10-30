import { AfterViewInit, Component, Input, OnInit, ViewChild } from '@angular/core';
import { delay } from 'rxjs';

declare var mapboxgl: any;

@Component({
  selector: 'app-mapa',
  templateUrl: './mapa.component.html',
  styleUrls: ['./mapa.component.scss'],
})
export class MapaComponent  implements OnInit, AfterViewInit {

  @Input() coords!: string;
  @ViewChild('mapa') mapa: any;

  constructor() { }

  ngAfterViewInit(): void {
    const latLng = this.coords.split(',');
    const lat = Number(latLng[0]);
    const lng = Number(latLng[1]);
    
    mapboxgl.accessToken = 'pk.eyJ1IjoicnViZW5tdDk5IiwiYSI6ImNsb2N3YTI1dDAxZjEyaW4wM3lmb3h4djAifQ.9nDFSil4-vdSpSUjPCvG8g';
    const map = new mapboxgl.Map({
      container: this.mapa.nativeElement!,
      style: 'mapbox://styles/mapbox/streets-v11',
      center: [lng, lat],
      zoom: 14
    });

    const marker = new mapboxgl.Marker()
      .setLngLat( [lng, lat] )
      .addTo( map );
  }
  

  ngOnInit() {}
    

}
