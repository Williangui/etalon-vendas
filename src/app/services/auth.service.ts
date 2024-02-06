import {Injectable} from '@angular/core';
import {environment} from "../../environments/environment";
import {HttpClient, HttpParams} from "@angular/common/http";
import jwtDecode from 'jwt-decode';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  baseUrl = environment.baseUrl + "api/auth";

  constructor(private httpClient: HttpClient) {
  }

  login(usuario: string, senha: string) {
    const url = this.baseUrl + `/login`;
    const params = new HttpParams()
      .set('usuario', usuario)
      .set('senha', senha)
    const headers = {
      'Content-Type': 'application/x-www-form-urlencoded',
      'usuario': usuario,
      'senha': senha
    }
    return this.httpClient.post<any>(url, params.toString(), {headers});
  }

  getToken() {
    const token = sessionStorage.getItem('access_token');
    return token;
  }

  getTokenExpirationDate(token: string): Date | null {
    const decoded: any = jwtDecode(token);

    if (decoded.exp === undefined) {
      return null;
    }

    const date = new Date(0);
    date.setUTCSeconds(decoded.exp);
    return date;
  }

  isTokenExpired(token?: string): boolean {
    if (!token) {
      return true;
    }
    const date = this.getTokenExpirationDate(token);
    if (!date) {
      return false;
    }
    return !(date.valueOf() > new Date().valueOf());
  }

  isUserLoggedIn() {
    const token = this.getToken();
    if (!token) {
      return false;
    } else if (this.isTokenExpired(token)) {
      return false;
    }
    return true;
  }

  getPermissoes() {
    const token = this.getToken();
    if (token) {
      const {permissoes}: any = jwtDecode(token);
      return permissoes;
    }
  }
}
