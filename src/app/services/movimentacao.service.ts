import { Injectable } from '@angular/core';
import {environment} from "../../environments/environment";
import {HttpClient} from "@angular/common/http";
import {MovimentacaoFiltros} from "../models/movimentacao/movimentacao-filtros";
import {Observable} from "rxjs";
import {Movimentacao} from "../models/movimentacao/movimentacao";

@Injectable({
  providedIn: 'root'
})
export class MovimentacaoService {

  baseUrl = environment.baseUrl + "api/movimentacao";

  constructor(
      private httpClient: HttpClient
  ) {
  }

  listar(filtros: MovimentacaoFiltros, pageable: string) {
    const url = this.baseUrl + `/listar?${pageable}`;
    return this.httpClient.post<any>(url, filtros);
  }

  buscarPorId(id: any): Observable<Movimentacao> {
    const url = `${this.baseUrl}/buscarPorId/${id}`;
    return this.httpClient.get<Movimentacao>(url);
  }

  salvar(movimentacao: Movimentacao): Observable<Movimentacao> {
    const url = this.baseUrl + '/salvar';
    return this.httpClient.post<Movimentacao>(url, movimentacao);
  }

  excluir(id: any): Observable<void> {
    const url = this.baseUrl + `/excluir/${id}`;
    return this.httpClient.delete<void>(url);
  }
}
