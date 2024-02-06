import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {Produto} from "../../../models/produto/produto";
import {FormBuilder, FormGroup} from "@angular/forms";
import {Filtro} from "../../../models/filtro";
import {ProdutoFiltros} from "../../../models/produto/produto-filtros";
import {ProdutoService} from "../../../services/produto.service";
import {ColunaListaPaginada} from "../../lista-paginada/coluna-lista-paginada";
import {lastValueFrom, Observable} from "rxjs";
import {ColunaAcoesListaPaginada} from "../../lista-paginada/coluna-acoes-lista-paginada";
import {Router} from "@angular/router";
import {PaginatorHelper, ParamPageable, toQuery} from "../../lista-paginada/paginator-helper";
import {PageService} from "../../../services/page.service";
import {Categoria} from "../../../models/categoria/categoria";
import {CategoriaService} from "../../../services/categoria.service";

@Component({
    selector: 'app-produto-listagem',
    templateUrl: './produto-listagem.component.html',
    styleUrls: ['./produto-listagem.component.scss']
})
export class ProdutoListagemComponent implements OnInit {
    header = ' - Listagem de Produtos';
    categorias: Observable<Categoria[]> = this.categoriaService.buscarTodas();
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
            label: 'Categoria',
            field: 'categoria',
            type: 'select',
            width: '400px',
            observable: this.categorias
        },
        {
            label: 'Valor Inicial',
            field: 'valorInicial',
            type: 'number',
            width: '300px'
        },
        {
            label: 'Valor Final',
            field: 'valorFinal',
            type: 'number',
            width: '300px'
        },
    ];
    produtos: Produto[] = [];
    formGroupFiltros: FormGroup = new FormGroup({});
    produtoFiltros: ProdutoFiltros = new ProdutoFiltros();
    displayedColumns = ['id', 'nome', 'valor', 'categoria'];
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
            nomeHeader: 'Valor',
            nomeColuna: 'valor',
            widthColuna: '10%',
            cellAlign: 'center'
        }, {
            nomeHeader: 'Categoria',
            nomeColuna: 'categoria',
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
    provider: Observable<any> = this.produtoService.listar(this.produtoFiltros, toQuery(this.paramPageable));
    title = 'Produtos';
    @Output() pesquisarEvent = new EventEmitter();

    constructor(
        private router: Router,
        private formBuilder: FormBuilder,
        private produtoService: ProdutoService,
        private pageService: PageService,
        private categoriaService: CategoriaService
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
            valorInicial: [],
            valorFinal: [],
            categoria: []
        })
    }

    pesquisar(filtrosRecebidos: Filtro[]) {
        filtrosRecebidos.forEach(filtro => {
            switch (filtro.field) {
                case 'id': {
                    this.produtoFiltros.id = filtro.valor;
                    break;
                }
                case 'nome': {
                    this.produtoFiltros.nome = filtro.valor;
                    break;
                }
                case 'valorInicial': {
                    this.produtoFiltros.valorInicial = filtro.valor;
                    break;
                }
                case 'valorFinal': {
                    this.produtoFiltros.valorFinal = filtro.valor;
                    break;
                }
                case 'categoria': {
                    this.produtoFiltros.idCategoria = filtro.valor;
                    break;
                }
            }
        });
        this.provider = this.produtoService.listar(this.produtoFiltros, toQuery(this.paramPageable));
    }

    changePaginator(paginator: PaginatorHelper) {
        this.paramPageable = new ParamPageable(paginator.size, paginator.page, paginator.sort);
        this.provider = this.produtoService.listar(this.produtoFiltros, toQuery(this.paramPageable))
    }

    editar(produto: any) {
        this.router.navigate(['produtos/edicao/' + produto.id]);
    }

    novo() {
        this.router.navigate(['produtos/edicao']);
    }

    public excluir(produto: Produto) {
        this.produtoService.excluir(produto.id).subscribe((resposta) => {
            if (resposta == null) {
                this.provider = this.produtoService.listar(this.produtoFiltros, toQuery(this.paramPageable))
            }
        });
    }


}
