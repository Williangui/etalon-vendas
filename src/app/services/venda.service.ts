import {Injectable} from '@angular/core';
import {environment} from "../../environments/environment";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {VendaFiltrosDTO} from "../models/venda/venda-filtros";
import {Venda} from "../models/venda/venda";

@Injectable({
    providedIn: 'root'
})
export class VendaService {

    baseUrl = environment.baseUrl + "api/venda";

    constructor(
        private httpClient: HttpClient
    ) {
    }

    listar(filtros: VendaFiltrosDTO, pageable: string) {
        const url = this.baseUrl + `/listar?${pageable}`;
        return this.httpClient.post<any>(url, filtros);
    }

    buscarPorId(id: any): Observable<Venda> {
        const url = `${this.baseUrl}/buscarPorId/${id}`;
        return this.httpClient.get<Venda>(url);
    }

    salvar(produto: Venda): Observable<Venda> {
        const url = this.baseUrl + '/salvar';
        return this.httpClient.post<Venda>(url, produto);
    }

    excluir(id: any): Observable<void> {
        const url = this.baseUrl + `/excluir/${id}`;
        return this.httpClient.delete<void>(url);
    }
}
