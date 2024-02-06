import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Usuario} from "../../../models/usuario/usuario";
import {UsuarioService} from "../../../services/usuario.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-cadastro-usuario',
  templateUrl: './cadastro-usuario.component.html',
  styleUrls: ['./cadastro-usuario.component.scss']
})
export class CadastroUsuarioComponent implements OnInit {

  formGroup: FormGroup = new FormGroup({});
  usuario = new Usuario();

  constructor(private usuarioService: UsuarioService,
              public formBuilder: FormBuilder,
              private router: Router) {
  }

  ngOnInit(): void {
    this.criarFormulario();
  }

  criarFormulario() {
    this.formGroup = this.formBuilder.group({
      tipo: [null, Validators.required],
      usuario: [null, Validators.required],
      senha: [null, Validators.required],
    })
  }

  limpar() {
    this.formGroup.reset();
  }

  salvar() {
    this.usuario.tipo = this.formGroup.get('tipo')?.value;
    this.usuario.usuario = this.formGroup.get('usuario')?.value;
    this.usuario.senha = this.formGroup.get('senha')?.value;
    this.usuarioService.salvar(this.usuario).subscribe(resp => {
      this.usuario = resp;
      this.router.navigate(['/login']);
    })
  }

  public cancelar() {
    this.router.navigate(['/login']);
  }

}
