import { Injectable } from '@angular/core';
import {environment} from "../../environments/environment";
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class MunicipioService {

  baseUrl = environment.baseUrlRedis + "api/municipio";

  constructor(
    private httpClient: HttpClient
  ) {
  }

  buscarPorUf(idEstado: number | undefined) {
    const url = this.baseUrl + `/buscarPorUf?idEstado=${idEstado}`;
    return this.httpClient.get<any>(url);
  }
}
