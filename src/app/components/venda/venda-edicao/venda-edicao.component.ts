import { Component, OnInit } from '@angular/core';
import {Produto} from "../../../models/produto/produto";
import {FormBuilder, FormGroup} from "@angular/forms";
import {Categoria} from "../../../models/categoria/categoria";
import {ProdutoService} from "../../../services/produto.service";
import {ActivatedRoute, Router} from "@angular/router";
import {PageService} from "../../../services/page.service";
import {CategoriaService} from "../../../services/categoria.service";
import {lastValueFrom} from "rxjs";

@Component({
  selector: 'app-venda-edicao',
  templateUrl: './venda-edicao.component.html',
  styleUrls: ['./venda-edicao.component.scss']
})
export class VendaEdicaoComponent implements OnInit {

  header = ' - Cadastro de Produto';
  produto = new Produto();
  formGroup: FormGroup = new FormGroup({});

  categorias: Categoria[] = []

  constructor(private produtoService: ProdutoService,
              private route: ActivatedRoute,
              private router: Router,
              private formBuilder: FormBuilder,
              private pageService: PageService,
              private categoriaService: CategoriaService) {
  }

  ngOnInit(): void {
    setTimeout(() => {
      this.pageService.setHeader(this.header);
    }, 0);
    this.criarFormulario();
    this.buscarCategorias().then(r => {
      const id = this.route.snapshot.paramMap.get("id")!;
      if (id) {
        this.produto.id = +id;
        this.buscarPorId();
      }
    });
  }

  criarFormulario() {
    this.formGroup = this.formBuilder.group({
      id: [{value: null, disabled: true}],
      nome: [],
      valor: [],
      categoria: []
    })
  }

  public async buscarPorId() {
    if (this.produto.id) {
      await this.produtoService.buscarPorId(this.produto.id).subscribe((data) => {
        this.produto = data;
        console.log(data)
        console.log(this.categorias)
        this.formGroup.patchValue({
          id: this.produto.id,
          nome: this.produto.nome,
          valor: this.produto.valor,
          categoria: this.produto?.categoria?.id
        })
      });
    }
  }

  public salvar() {
    this.setProduto()
    this.produtoService.salvar(this.produto).subscribe((data) => {
      if (data) {
        this.produto = data;
        this.router.navigate(['/produtos']);
      }
    });
  }

  setProduto() {
    this.produto.id = this.formGroup.get('id')?.value;
    this.produto.nome = this.formGroup.get('nome')?.value;
    this.produto.valor = this.formGroup.get('valor')?.value;
    this.produto.categoria = {id: (this.formGroup.get('categoria')?.value)};
  }

  limpar() {
    this.formGroup.reset();
  }

  public cancelar() {
    this.router.navigate(['/produtos']);
  }

  async buscarCategorias() {
    this.categorias = await lastValueFrom(this.categoriaService.buscarTodas());
  }

}
