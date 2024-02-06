import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {Filtro} from "../../../models/filtro";
import {Categoria} from "../../../models/categoria/categoria";
import {FormBuilder, FormGroup} from "@angular/forms";
import {CategoriaFiltros} from "../../../models/categoria/categoria-filtros";
import {ColunaListaPaginada} from "../../lista-paginada/coluna-lista-paginada";
import {ColunaAcoesListaPaginada} from "../../lista-paginada/coluna-acoes-lista-paginada";
import {PaginatorHelper, ParamPageable, toQuery} from "../../lista-paginada/paginator-helper";
import {Observable} from "rxjs";
import {Router} from "@angular/router";
import {PageService} from "../../../services/page.service";
import {CategoriaService} from "../../../services/categoria.service";

@Component({
    selector: 'app-categoria-listagem',
    templateUrl: './categoria-listagem.component.html',
    styleUrls: ['./categoria-listagem.component.scss']
})
export class CategoriaListagemComponent implements OnInit {

    header = ' - Listagem de Categorias de Produtos';
    title = 'Categorias';

    filtros: Filtro[] = [
        {
            label: 'Código',
            field: 'id',
            type: 'number',
            width: '120px'
        },
        {
            label: 'Descricao',
            field: 'descricao',
            type: 'text',
            width: '400px'
        }
    ];
    categorias: Categoria[] = [];
    formGroupFiltros: FormGroup = new FormGroup({});
    categoriaFiltros: CategoriaFiltros = new CategoriaFiltros();
    displayedColumns = ['id', 'descricao'];
    colunas: ColunaListaPaginada[] = [
        {
            nomeHeader: 'Código',
            nomeColuna: 'id',
            widthColuna: '120px',
            cellAlign: 'center'
        }, {
            nomeHeader: 'Descricao',
            nomeColuna: 'descricao',
            widthColuna: '80%',
            cellAlign: 'center'
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
    provider: Observable<any> = this.categoriaService.listar(this.categoriaFiltros, toQuery(this.paramPageable));
    @Output() pesquisarEvent = new EventEmitter();

    constructor(
        private router: Router,
        private formBuilder: FormBuilder,
        private categoriaService: CategoriaService,
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
            descricao: []
        })
    }

    pesquisar(filtrosRecebidos: Filtro[]) {
        filtrosRecebidos.forEach(filtro => {
            switch (filtro.field) {
                case 'id': {
                    this.categoriaFiltros.id = filtro.valor;
                    break;
                }
                case 'descricao': {
                    this.categoriaFiltros.descricao = filtro.valor;
                    break;
                }
            }
        });
        this.provider = this.categoriaService.listar(this.categoriaFiltros, toQuery(this.paramPageable));
    }

    changePaginator(paginator: PaginatorHelper) {
        this.paramPageable = new ParamPageable(paginator.size, paginator.page, paginator.sort);
        this.provider = this.categoriaService.listar(this.categoriaFiltros, toQuery(this.paramPageable))
    }

    editar(categoria: any) {
        this.router.navigate(['categorias/edicao/' + categoria.id]);
    }

    novo() {
        this.router.navigate(['categorias/edicao']);
    }

    public excluir(categoria: Categoria) {
        this.categoriaService.excluir(categoria.id).subscribe((resposta) => {
            if (resposta == null) {
                this.provider = this.categoriaService.listar(this.categoriaFiltros, toQuery(this.paramPageable))
            }
        });
    }

}
