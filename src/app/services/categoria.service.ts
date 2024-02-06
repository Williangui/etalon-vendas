import { Injectable } from '@angular/core';
import {environment} from "../../environments/environment";
import {HttpClient} from "@angular/common/http";
import {CategoriaFiltros} from "../models/categoria/categoria-filtros";
import {Observable} from "rxjs";
import {Categoria} from "../models/categoria/categoria";

@Injectable({
  providedIn: 'root'
})
export class CategoriaService {

  baseUrl = environment.baseUrl + "api/categoria";

  constructor(
      private httpClient: HttpClient
  ) {
  }

  listar(filtros: CategoriaFiltros, pageable: string) {
    const url = this.baseUrl + `/listar?${pageable}`;
    return this.httpClient.post<any>(url, filtros);
  }

  buscarPorId(id: any): Observable<Categoria> {
    const url = `${this.baseUrl}/buscarPorId/${id}`;
    return this.httpClient.get<Categoria>(url);
  }

  salvar(categoria: Categoria): Observable<Categoria> {
    const url = this.baseUrl + '/salvar';
    return this.httpClient.post<Categoria>(url, categoria);
  }

  excluir(id: any): Observable<void> {
    const url = this.baseUrl + `/excluir/${id}`;
    return this.httpClient.delete<void>(url);
  }

  buscarTodas(): Observable<Categoria[]> {
    const url = `${this.baseUrl}/buscarTodas`;
    return this.httpClient.get<Categoria[]>(url);
  }
}
