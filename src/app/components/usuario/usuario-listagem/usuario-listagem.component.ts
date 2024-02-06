import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {Filtro} from "../../../models/filtro";
import {Usuario} from "../../../models/usuario/usuario";
import {FormBuilder, FormGroup} from "@angular/forms";
import {UsuarioFiltros} from "../../../models/usuario/usuario-filtros";
import {ColunaListaPaginada} from "../../lista-paginada/coluna-lista-paginada";
import {ColunaAcoesListaPaginada} from "../../lista-paginada/coluna-acoes-lista-paginada";
import {PaginatorHelper, ParamPageable, toQuery} from "../../lista-paginada/paginator-helper";
import {Observable} from "rxjs";
import {UsuarioService} from "../../../services/usuario.service";
import {Router} from "@angular/router";
import {PageService} from "../../../services/page.service";

@Component({
  selector: 'app-usuario-listagem',
  templateUrl: './usuario-listagem.component.html',
  styleUrls: ['./usuario-listagem.component.scss']
})
export class UsuarioListagemComponent implements OnInit {
  header = ' - Listagem de Usuários';
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
      label: 'Usuário',
      field: 'usuario',
      type: 'text',
      width: '300px'
    }
  ];

  usuarios: Usuario[] = [];
  formGroupFiltros: FormGroup = new FormGroup({});
  usuarioFiltros = new UsuarioFiltros();
  displayedColumns = ['id', 'tipo', 'usuario', 'ativo'];
  colunas: ColunaListaPaginada[] = [
    {
      nomeHeader: 'Código',
      nomeColuna: 'id',
      widthColuna: '120px',
      cellAlign: 'center'
    },
    {
      nomeHeader: 'Tipo',
      nomeColuna: 'tipo',
      widthColuna: '40%',
      cellAlign: 'center'
    },
    {
      nomeHeader: 'Usuário',
      nomeColuna: 'usuario',
      widthColuna: '40%',
      cellAlign: 'center'
    },
    {
      nomeHeader: 'Ativo',
      nomeColuna: 'ativo',
      widthColuna: '120px',
      cellAlign: 'center'
    },
  ]
  acoes: ColunaAcoesListaPaginada[] = [
    {
      evento: (value) => this.ativarInativar(value),
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
  provider: Observable<any> = this.usuarioService.listar(this.usuarioFiltros, toQuery(this.paramPageable));
  title = 'Usuarios';
  @Output() pesquisarEvent = new EventEmitter();

  constructor(private usuarioService: UsuarioService,
              private router: Router,
              private formBuilder: FormBuilder,
              private pageService: PageService) {
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
      usuario: [],
      ativo: []
    })
  }

  pesquisar(filtrosRecebidos: Filtro[]) {
    filtrosRecebidos.forEach(filtro => {
      switch (filtro.field) {
        case 'id': {
          this.usuarioFiltros.id = filtro.valor;
          break;
        }
        case 'tipo': {
          this.usuarioFiltros.tipo = filtro.valor;
          break;
        }
        case 'usuario': {
          this.usuarioFiltros.usuario = filtro.valor;
          break;
        }
      }
    });
    this.provider = this.usuarioService.listar(this.usuarioFiltros, toQuery(this.paramPageable));
  }

  changePaginator(paginator: PaginatorHelper) {
    this.paramPageable = new ParamPageable(paginator.size, paginator.page, paginator.sort);
    this.provider = this.usuarioService.listar(this.usuarioFiltros, toQuery(this.paramPageable))
  }

  ativarInativar(usuario: Usuario) {
    this.router.navigate(['usuarios/ativar/' + usuario.id]);
  }

  excluir(usuario: Usuario) {
    this.usuarioService.excluir(usuario.id).subscribe((resposta) => {
      if (resposta == null) {
        this.provider = this.usuarioService.listar(this.usuarioFiltros, toQuery(this.paramPageable))
      }
    });
  }

}
