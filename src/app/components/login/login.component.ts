import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Usuario} from "../../models/usuario/usuario";
import {Router} from "@angular/router";
import {AuthService} from "../../services/auth.service";
import jwtDecode from 'jwt-decode';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  formGroup: FormGroup = new FormGroup({});
  usuario = new Usuario();

  constructor(private authService: AuthService,
              public formBuilder: FormBuilder,
              private router: Router) {
  }

  ngOnInit(): void {
    this.criarFormulario();
  }

  criarFormulario() {
    this.formGroup = this.formBuilder.group({
      usuario: [null, Validators.required],
      senha: [null, Validators.required],
    })
  }

  login() {
    this.usuario.usuario = this.formGroup.get('usuario')?.value;
    this.usuario.senha = this.formGroup.get('senha')?.value;
    this.authService.login(this.usuario.usuario, this.usuario.senha).subscribe(resp => {
      sessionStorage.setItem('access_token', resp.access_token);
      const permissoes = this.authService.getPermissoes();
      sessionStorage.setItem('permissoes', permissoes)
      this.router.navigate([''])
    })
  }

  limpar() {
    this.formGroup.reset();
  }

  cadastrar() {
    this.router.navigate(['criar-conta']);
  }

}
