import { Component, OnInit } from '@angular/core';
import {Categoria} from "../../../models/categoria/categoria";
import {FormBuilder, FormGroup} from "@angular/forms";
import {CategoriaService} from "../../../services/categoria.service";
import {ActivatedRoute, Router} from "@angular/router";
import {PageService} from "../../../services/page.service";

@Component({
  selector: 'app-categoria-edicao',
  templateUrl: './categoria-edicao.component.html',
  styleUrls: ['./categoria-edicao.component.scss']
})
export class CategoriaEdicaoComponent implements OnInit {

  header = ' - Cadastro de Categoria';
  categoria = new Categoria();
  formGroup: FormGroup = new FormGroup({});

  constructor(private categoriaService: CategoriaService,
              private route: ActivatedRoute,
              private router: Router,
              private formBuilder: FormBuilder,
              private pageService: PageService) {
  }

  ngOnInit(): void {
    setTimeout(() => {
      this.pageService.setHeader(this.header);
    }, 0);
    this.criarFormulario();
    const id = this.route.snapshot.paramMap.get("id")!;
    if (id) {
      this.categoria.id = +id;
      this.buscarPorId();
    }
  }

  criarFormulario() {
    this.formGroup = this.formBuilder.group({
      id: [{value: null, disabled: true}],
      descricao: [],
    })
  }

  public buscarPorId() {
    if (this.categoria.id) {
      this.categoriaService.buscarPorId(this.categoria.id).subscribe((data) => {
        this.categoria = data;
        this.formGroup.patchValue({
          id: this.categoria.id,
          descricao: this.categoria.descricao,
        })
      });
    }
  }

  public salvar() {
    this.setCategoria()
    this.categoriaService.salvar(this.categoria).subscribe((data) => {
      if (data) {
        this.categoria = data;
        this.router.navigate(['/categorias']);
      }
    });
  }

  setCategoria() {
    this.categoria.id = this.formGroup.get('id')?.value;
    this.categoria.descricao = this.formGroup.get('descricao')?.value;
  }

  limpar() {
    this.formGroup.reset();
  }

  public cancelar() {
    this.router.navigate(['/categorias']);
  }

}
