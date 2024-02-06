import {Injectable} from '@angular/core';
import {environment} from "../../environments/environment";
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class EstadoService {

  baseUrl = environment.baseUrlRedis + "api/estado";

  constructor(
    private httpClient: HttpClient
  ) {
  }

  buscarTodos() {
    const url = this.baseUrl + `/buscarTodos`;
    return this.httpClient.get<any>(url);
  }
}
