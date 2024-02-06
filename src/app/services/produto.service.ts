import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {environment} from "../../environments/environment";
import {ProdutoFiltros} from "../models/produto/produto-filtros";
import {Observable} from "rxjs";
import {Produto} from "../models/produto/produto";
import {Categoria} from "../models/categoria/categoria";

@Injectable({
  providedIn: 'root'
})
export class ProdutoService {

  baseUrl = environment.baseUrl + "api/produto";

  constructor(
    private httpClient: HttpClient
  ) {
  }

  listar(filtros: ProdutoFiltros, pageable: string) {
    const url = this.baseUrl + `/listar?${pageable}`;
    return this.httpClient.post<any>(url, filtros);
  }

  buscarPorId(id: any): Observable<Produto> {
    const url = `${this.baseUrl}/buscarPorId/${id}`;
    return this.httpClient.get<Produto>(url);
  }

  salvar(produto: Produto): Observable<Produto> {
    const url = this.baseUrl + '/salvar';
    return this.httpClient.post<Produto>(url, produto);
  }

  excluir(id: any): Observable<void> {
    const url = this.baseUrl + `/excluir/${id}`;
    return this.httpClient.delete<void>(url);
  }

  buscarTodos(): Observable<Produto[]> {
    const url = `${this.baseUrl}/buscarTodos`;
    return this.httpClient.get<Produto[]>(url);
  }
}
