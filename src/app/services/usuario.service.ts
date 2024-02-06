import {Injectable} from '@angular/core';
import {environment} from "../../environments/environment";
import {HttpClient} from "@angular/common/http";
import {Usuario} from "../models/usuario/usuario";
import {Observable} from "rxjs";
import {UsuarioFiltros} from "../models/usuario/usuario-filtros";
import {Produto} from "../models/produto/produto";

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  baseUrl = environment.baseUrl + "api/usuario";

  constructor(
    private httpClient: HttpClient
  ) {
  }

  salvar(usuario: Usuario): Observable<Usuario> {
    const url = this.baseUrl + `/salvar`;
    return this.httpClient.post<any>(url, usuario);
  }

  listar(filtros: UsuarioFiltros, pageable: string) {
    const url = this.baseUrl + `/listar?${pageable}`;
    return this.httpClient.post<any>(url, filtros);
  }

  excluir(id: any): Observable<void> {
    const url = this.baseUrl + `/excluir/${id}`;
    return this.httpClient.delete<void>(url);
  }

  buscarPorId(id: any): Observable<Usuario> {
    const url = `${this.baseUrl}/buscarPorId/${id}`;
    return this.httpClient.get<Usuario>(url);
  }

  ativarInativar(usuario: Usuario): Observable<Usuario> {
    const url = this.baseUrl + '/ativarInativar';
    return this.httpClient.post<Usuario>(url, usuario);
  }

  buscarTodos(): Observable<Usuario[]> {
    const url = `${this.baseUrl}/buscarTodos`;
    return this.httpClient.get<Usuario[]>(url);
  }
}
