import { Component, OnInit } from '@angular/core';
import {Usuario} from "../../../models/usuario/usuario";
import {FormBuilder, FormGroup} from "@angular/forms";
import {UsuarioService} from "../../../services/usuario.service";
import {ActivatedRoute, Router} from "@angular/router";
import {PageService} from "../../../services/page.service";

@Component({
  selector: 'app-ativar-usuario',
  templateUrl: './ativar-usuario.component.html',
  styleUrls: ['./ativar-usuario.component.scss']
})
export class AtivarUsuarioComponent implements OnInit {

  header = ' - Alteração de Usuário';
  usuario = new Usuario();
  formGroup: FormGroup = new FormGroup({});

  constructor(private usuarioService: UsuarioService,
              private route: ActivatedRoute,
              private router: Router,
              private formBuilder: FormBuilder,
              private pageService: PageService) { }

  ngOnInit(): void {
    setTimeout(() => {
      this.pageService.setHeader(this.header);
    }, 0);
    this.criarFormulario();
    const id = this.route.snapshot.paramMap.get("id")!;
    if (id) {
      this.usuario.id = +id;
      this.buscarPorId();
    }
  }

  criarFormulario() {
    this.formGroup = this.formBuilder.group({
      id: [{value: null, disabled: true}],
      tipo: [{value: null, disabled: false}],
      usuario: [{value: null, disabled: true}],
      ativo: []
    })
  }

  public buscarPorId() {
    if (this.usuario.id) {
      this.usuarioService.buscarPorId(this.usuario.id).subscribe((data) => {
        this.usuario = data;
        this.formGroup.patchValue({
          id: this.usuario.id,
          tipo: this.usuario.tipo,
          usuario: this.usuario.usuario,
          ativo: this.usuario.ativo,
        })
      });
    }
  }

  public salvar() {
    this.setusuario()
    this.usuarioService.salvar(this.usuario).subscribe((data) => {
      if (data) {
        this.usuario = data;
        this.router.navigate(['/usuarios']);
      }
    });
  }

  setusuario() {
    this.usuario.id = this.formGroup.get('id')?.value;
    this.usuario.tipo = this.formGroup.get('tipo')?.value;
    this.usuario.usuario = this.formGroup.get('usuario')?.value;
    this.usuario.ativo = this.formGroup.get('ativo')?.value;
  }

  public cancelar() {
    this.router.navigate(['/usuarios']);
  }
}
