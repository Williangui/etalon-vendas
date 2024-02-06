import {Component, OnInit} from '@angular/core';
import {Movimentacao, TipoMovimentacao} from "../../../models/movimentacao/movimentacao";
import {FormBuilder, FormGroup} from "@angular/forms";
import {MovimentacaoService} from "../../../services/movimentacao.service";
import {ActivatedRoute, Router} from "@angular/router";
import {PageService} from "../../../services/page.service";
import {lastValueFrom} from "rxjs";
import {Produto} from "../../../models/produto/produto";
import {ProdutoService} from "../../../services/produto.service";
import {DatePipe, registerLocaleData} from "@angular/common";
import localePtBr from '@angular/common/locales/pt';

@Component({
  selector: 'app-movimentacao-edicao',
  templateUrl: './movimentacao-edicao.component.html',
  styleUrls: ['./movimentacao-edicao.component.scss']
})
export class MovimentacaoEdicaoComponent implements OnInit {

  header = ' - Cadastro de Movimentacao';
  movimentacao = new Movimentacao();
  formGroup: FormGroup = new FormGroup({});

  dataFormatada: any;

  produtos: Produto[] = [];

  tipos: any[] = Object.values(TipoMovimentacao);

  id = this.route.snapshot.paramMap.get("id");

  permiteSalvar = this.id == null || +this.id > 0;

  constructor(private movimentacaoService: MovimentacaoService,
              private route: ActivatedRoute,
              private router: Router,
              private formBuilder: FormBuilder,
              private pageService: PageService,
              private produtoService: ProdutoService,
              private datePipe: DatePipe) {
  }

  ngOnInit(): void {
    registerLocaleData(localePtBr, 'pt-BR');
    setTimeout(() => {
      this.pageService.setHeader(this.header);
    }, 0);
    const id = this.route.snapshot.paramMap.get("id")!;
    if (id && +id > 0) {
      this.permiteSalvar = false;
    }
    this.criarFormulario();
    this.buscarDados().then(() => {
      if (id) {
        this.movimentacao.id = +id;
        this.buscarPorId();
      }
    });
  }

  criarFormulario() {
    this.formGroup = this.formBuilder.group({
      id: [{value: null, disabled: true}],
      produto: [{value: null, disabled: !this.permiteSalvar}],
      quantidade: [{value: null, disabled: !this.permiteSalvar}],
      tipo: [{value: null, disabled: !this.permiteSalvar}],
      data: [{value: null, disabled: true}],
      usuario: [{value: null, disabled: true}]
    })
  }

  public async buscarPorId() {
    if (this.movimentacao.id) {
      await this.movimentacaoService.buscarPorId(this.movimentacao.id).subscribe((data) => {
        this.movimentacao = data;
        this.formGroup.patchValue({
          id: this.movimentacao.id,
          produto: this.movimentacao.produto?.id,
          quantidade: this.movimentacao.quantidade,
          tipo: this.movimentacao.tipo,
          data: this.movimentacao.data,
          usuario: this.movimentacao.usuario?.usuario
        })
        if (this.movimentacao.data)
        this.dataFormatada = this.datePipe.transform(this.movimentacao?.data, 'dd/MM/yyyy HH:mm:ss');
      });
    }
  }

  public salvar() {
    this.setMovimentacao()
    this.movimentacaoService.salvar(this.movimentacao).subscribe((data) => {
      if (data) {
        this.movimentacao = data;
        this.router.navigate(['/movimentacoes']);
      }
    });
  }

  setMovimentacao() {
    this.movimentacao.id = this.formGroup.get('id')?.value;
    this.movimentacao.produto = {id: this.formGroup.get('produto')?.value};
    this.movimentacao.quantidade = this.formGroup.get('quantidade')?.value;
    this.movimentacao.tipo = this.formGroup.get('tipo')?.value;
    this.movimentacao.data = new Date();
  }

  limpar() {
    this.formGroup.reset();
  }

  public cancelar() {
    this.router.navigate(['/movimentacoes']);
  }

  async buscarDados() {
    this.produtos = await lastValueFrom(this.produtoService.buscarTodos());
  }

}
