import { Component, OnInit } from '@angular/core';
import axios from "axios";
import * as L from "leaflet";

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss']
})
export class MapComponent implements OnInit {

  private map?: L.Map;
  public longitude?: number;
  public latitude?: number;

  constructor() { }

  ngOnInit(): void {
    // inicializar o mapa
    this.map = L.map('map').setView([-23.5489, -46.6388], 13);
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: 'Map data &copy; OpenStreetMap contributors'
    }).addTo(this.map);
  }

  buscarCoordenadas(endereco: string): void {
    const url = `https://nominatim.openstreetmap.org/search?format=json&q=${endereco}`;
    axios.get(url).then(response => {
      console.log(response)
      if (response.data && response.data.length > 0) {
        this.latitude = response.data[0].lat;
        this.longitude = response.data[0].lon;
      }
      if (this.latitude && this.longitude) {
        this.addMarker(this.latitude, this.longitude);
      }
    }).catch(error => {
      console.log(error);
    });
  }

  // a função recebe as coordenadas do endereço do cliente e adiciona um marcador no mapa
  addMarker(lat: number, lng: number): void {
    if (!this.map) {
      this.map = L.map('map').setView([lat, lng], 13);
      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: 'Map data © <a href="https://openstreetmap.org">OpenStreetMap</a> contributors',
        maxZoom: 18,
      }).addTo(this.map);
    }

    const novoMarcador = L.marker([lat, lng]).addTo(this.map);
    const coordenadas = novoMarcador.getLatLng();
    this.map.setView(coordenadas, 13);
  }

}
