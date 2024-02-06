import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {Observable} from "rxjs";
import {Filtro} from "../../../models/filtro";
import {Movimentacao, TipoMovimentacao} from "../../../models/movimentacao/movimentacao";
import {FormBuilder, FormGroup} from "@angular/forms";
import {MovimentacaoFiltros} from "../../../models/movimentacao/movimentacao-filtros";
import {ColunaListaPaginada} from "../../lista-paginada/coluna-lista-paginada";
import {ColunaAcoesListaPaginada} from "../../lista-paginada/coluna-acoes-lista-paginada";
import {PaginatorHelper, ParamPageable, toQuery} from "../../lista-paginada/paginator-helper";
import {Router} from "@angular/router";
import {MovimentacaoService} from "../../../services/movimentacao.service";
import {PageService} from "../../../services/page.service";
import {ProdutoService} from "../../../services/produto.service";
import {Produto} from "../../../models/produto/produto";
import {Usuario} from "../../../models/usuario/usuario";
import {UsuarioService} from "../../../services/usuario.service";

@Component({
    selector: 'app-movimentacao-listagem',
    templateUrl: './movimentacao-listagem.component.html',
    styleUrls: ['./movimentacao-listagem.component.scss']
})
export class MovimentacaoListagemComponent implements OnInit {

    produtos: Observable<Produto[]> = this.produtoService.buscarTodos();
    usuarios: Observable<Usuario[]> = this.usuarioService.buscarTodos();

    header = ' - Movimentacoes';
    filtros: Filtro[] = [
        {
            label: 'Código',
            field: 'id',
            type: 'number',
            width: '120px'
        },
        {
            label: 'Data Inicial',
            field: 'dataInicial',
            type: 'date',
            width: '300px'
        },
        {
            label: 'Data Final',
            field: 'dataFinal',
            type: 'date',
            width: '300px'
        },
        {
            label: 'Produto',
            field: 'produto',
            type: 'select',
            width: '400px',
            observable: this.produtos,
            columnDisplay: 'nome'
        },
        {
            label: 'Tipo',
            field: 'tipo',
            type: 'enum',
            width: '400px',
            opcoes: Object.values(TipoMovimentacao)
        },
        {
            label: 'Usuario',
            field: 'usuario',
            type: 'select',
            width: '400px',
            observable: this.usuarios,
            columnDisplay: 'nome'
        },
    ];
    movimentacoes: Movimentacao[] = [];
    formGroupFiltros: FormGroup = new FormGroup({});
    movimentacaoFiltros: MovimentacaoFiltros = new MovimentacaoFiltros();
    displayedColumns = ['id', 'produto', 'data', 'tipo'];
    colunas: ColunaListaPaginada[] = [
        {
            nomeHeader: 'Código',
            nomeColuna: 'id',
            widthColuna: '120px',
            cellAlign: 'center'
        }, {
            nomeHeader: 'Produto',
            nomeColuna: 'produto',
            widthColuna: '40%',
            cellAlign: 'center'
        }, {
            nomeHeader: 'Data',
            nomeColuna: 'data',
            widthColuna: '10%',
            cellAlign: 'center',
            tipoColuna: 'date'
        }, {
            nomeHeader: 'Tipo',
            nomeColuna: 'tipo',
            widthColuna: '20%',
            cellAlign: 'center'
        },
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
    provider: Observable<any> = this.movimentacaoService.listar(this.movimentacaoFiltros, toQuery(this.paramPageable));
    title = 'Movimentacoes';
    @Output() pesquisarEvent = new EventEmitter();


    constructor(
        private router: Router,
        private formBuilder: FormBuilder,
        private movimentacaoService: MovimentacaoService,
        private pageService: PageService,
        private produtoService: ProdutoService,
        private usuarioService: UsuarioService
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
            produto: [],
            tipo: [],
            dataInicial: [],
            dataFinal: [],
            usuario: []
        })
    }

    pesquisar(filtrosRecebidos: Filtro[]) {
        filtrosRecebidos.forEach(filtro => {
            switch (filtro.field) {
                case 'id': {
                    this.movimentacaoFiltros.id = filtro.valor;
                    break;
                }
                case 'produto': {
                    this.movimentacaoFiltros.idProduto = filtro.valor;
                    break;
                }
                case 'tipo': {
                    this.movimentacaoFiltros.tipo = filtro.valor;
                    break;
                }
                case 'dataInicial': {
                    this.movimentacaoFiltros.dataInicial = filtro.valor;
                    break;
                }
                case 'dataFinal': {
                    this.movimentacaoFiltros.dataFinal = filtro.valor;
                    break;
                }
                case 'usuario': {
                    this.movimentacaoFiltros.idUsuario = filtro.valor;
                    break;
                }
            }
        });
        this.provider = this.movimentacaoService.listar(this.movimentacaoFiltros, toQuery(this.paramPageable));
    }

    changePaginator(paginator: PaginatorHelper) {
        this.paramPageable = new ParamPageable(paginator.size, paginator.page, paginator.sort);
        this.provider = this.movimentacaoService.listar(this.movimentacaoFiltros, toQuery(this.paramPageable))
    }

    editar(movimentacao: any) {
        this.router.navigate(['movimentacoes/edicao/' + movimentacao.id]);
    }

    novo() {
        this.router.navigate(['movimentacoes/edicao']);
    }

    public excluir(movimentacao: Movimentacao) {
        this.movimentacaoService.excluir(movimentacao.id).subscribe((resposta) => {
            if (resposta == null) {
                this.provider = this.movimentacaoService.listar(this.movimentacaoFiltros, toQuery(this.paramPageable))
            }
        });
    }

}
