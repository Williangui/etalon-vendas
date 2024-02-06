import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {Filtro} from "../../../models/filtro";
import {Produto} from "../../../models/produto/produto";
import {FormBuilder, FormGroup} from "@angular/forms";
import {ColunaListaPaginada} from "../../lista-paginada/coluna-lista-paginada";
import {ColunaAcoesListaPaginada} from "../../lista-paginada/coluna-acoes-lista-paginada";
import {PaginatorHelper, ParamPageable, toQuery} from "../../lista-paginada/paginator-helper";
import {Observable} from "rxjs";
import {Router} from "@angular/router";
import {Cliente} from "../../../models/cliente/cliente";
import {ClienteFiltros} from "../../../models/cliente/cliente-filtros";
import {ClienteService} from "../../../services/cliente.service";
import {PageService} from "../../../services/page.service";

@Component({
  selector: 'app-cliente-listagem',
  templateUrl: './cliente-listagem.component.html',
  styleUrls: ['./cliente-listagem.component.scss']
})
export class ClienteListagemComponent implements OnInit {

  header = ' - Listagem de Clientes';
  filtros: Filtro[] = [
    {
      label: 'Código',
      field: 'id',
      type: 'number',
      width: '120px'
    },
    {
      label: 'Nome',
      field: 'nome',
      type: 'text',
      width: '400px'
    },
    {
      label: 'Email',
      field: 'email',
      type: 'text',
      width: '300px'
    },
    {
      label: 'Documento',
      field: 'documento',
      type: 'number',
      width: '300px'
    },
  ];
  clientes: Cliente[] = [];
  formGroupFiltros: FormGroup = new FormGroup({});
  clienteFiltros: ClienteFiltros = new ClienteFiltros();
  displayedColumns = ['id', 'nome', 'email', 'documento'];
  colunas: ColunaListaPaginada[] = [
    {
      nomeHeader: 'Código',
      nomeColuna: 'id',
      widthColuna: '120px',
      cellAlign: 'center'
    }, {
      nomeHeader: 'Nome',
      nomeColuna: 'nome',
      widthColuna: '40%',
      cellAlign: 'center'
    }, {
      nomeHeader: 'Email',
      nomeColuna: 'email',
      widthColuna: '20%',
      cellAlign: 'center'
    }, {
      nomeHeader: 'Documento',
      nomeColuna: 'documento',
      widthColuna: '20%',
      cellAlign: 'center',
    }
  ]
  acoes: ColunaAcoesListaPaginada[] = [
    {
      evento: (value) => this.editar(value),
      icone: 'far fa-edit',
      color: 'primary',
      label: 'Editar'
    },
    {
      evento: (value) => this.excluir(value),
      icone: 'far fa-trash-alt',
      color: 'warn',
      label: 'Excluir'
    }
  ];
  paramPageable: ParamPageable = new ParamPageable(10, 0, 'id,ASC');
  provider: Observable<any> = this.clienteService.listar(this.clienteFiltros, toQuery(this.paramPageable));
  title = 'Clientes';
  @Output() pesquisarEvent = new EventEmitter();

  constructor(
    private router: Router,
    private formBuilder: FormBuilder,
    private clienteService: ClienteService,
    private pageService: PageService

  ) {
  }

  ngOnInit(): void {
    setTimeout(() => {
      this.pageService.setHeader(this.header);
    }, 0);
    this.criarFormulario();
  }

  criarFormulario() {
    this.formGroupFiltros = this.formBuilder.group({
      id: [],
      nome: [],
      email: [],
      documento: [],
    })
  }

  pesquisar(filtrosRecebidos: Filtro[]) {
    filtrosRecebidos.forEach(filtro => {
      switch (filtro.field) {
        case 'id': {
          this.clienteFiltros.id = filtro.valor;
          break;
        }
        case 'nome': {
          this.clienteFiltros.nome = filtro.valor;
          break;
        }
        case 'email': {
          this.clienteFiltros.email = filtro.valor;
          break;
        }
        case 'documento': {
          this.clienteFiltros.documento = filtro.valor;
          break;
        }
      }
    });
    this.provider = this.clienteService.listar(this.clienteFiltros, toQuery(this.paramPageable));
  }

  changePaginator(paginator: PaginatorHelper) {
    this.paramPageable = new ParamPageable(paginator.size, paginator.page, paginator.sort);
    this.provider = this.clienteService.listar(this.clienteFiltros, toQuery(this.paramPageable))
  }

  editar(produto: any) {
    this.router.navigate(['clientes/edicao/' + produto.id]);
  }

  novo() {
    this.router.navigate(['clientes/edicao']);
  }

  public excluir(produto: Produto) {
    this.clienteService.excluir(produto.id).subscribe((resposta) => {
      if (resposta == null) {
        this.provider = this.clienteService.listar(this.clienteFiltros, toQuery(this.paramPageable))
      }
    });
  }

}
