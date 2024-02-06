import { Injectable } from '@angular/core';
import {environment} from "../../environments/environment";
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class CepService {

  baseUrl = environment.baseUrlRedis + "api/cep";

  constructor(
    private httpClient: HttpClient
  ) { }

  buscarPorCep(cep: string) {
    const url = this.baseUrl + `/buscarPorCep?cep=${cep}`;
    return this.httpClient.get<any>(url);
  }
}
