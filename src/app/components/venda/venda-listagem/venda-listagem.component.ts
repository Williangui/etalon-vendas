import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {Filtro} from "../../../models/filtro";
import {Venda} from "../../../models/venda/venda";
import {FormBuilder, FormGroup} from "@angular/forms";
import {VendaFiltrosDTO} from "../../../models/venda/venda-filtros";
import {ColunaListaPaginada} from "../../lista-paginada/coluna-lista-paginada";
import {ColunaAcoesListaPaginada} from "../../lista-paginada/coluna-acoes-lista-paginada";
import {PaginatorHelper, ParamPageable, toQuery} from "../../lista-paginada/paginator-helper";
import {Observable} from "rxjs";
import {Router} from "@angular/router";
import {VendaService} from "../../../services/venda.service";
import {PageService} from "../../../services/page.service";

@Component({
    selector: 'app-venda-listagem',
    templateUrl: './venda-listagem.component.html',
    styleUrls: ['./venda-listagem.component.scss']
})
export class VendaListagemComponent implements OnInit {

    header = ' - Listagem de Vendas';
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
            type: 'text',
            width: '400px'
        },
        {
            label: 'Data Final',
            field: 'dataFinal',
            type: 'text',
            width: '400px'
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
        {
            label: 'Cliente',
            field: 'idCliente',
            type: 'number',
            width: '300px'
        },
        {
            label: 'Produto',
            field: 'idProduto',
            type: 'number',
            width: '300px'
        }
    ];
    vendas: Venda[] = [];
    formGroupFiltros: FormGroup = new FormGroup({});
    vendaFiltros: VendaFiltrosDTO = new VendaFiltrosDTO();
    displayedColumns = ['id', 'valorTotal', 'data'];
    colunas: ColunaListaPaginada[] = [
        {
            nomeHeader: 'Código',
            nomeColuna: 'id',
            widthColuna: '120px',
            cellAlign: 'center'
        }, {
            nomeHeader: 'Valor',
            nomeColuna: 'valorTotal',
            widthColuna: '40%',
            cellAlign: 'center'
        }, {
            nomeHeader: 'Data',
            nomeColuna: 'data',
            widthColuna: '40%',
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
    provider: Observable<any> = this.vendaService.listar(this.vendaFiltros, toQuery(this.paramPageable));

    title = 'Vendas';
    @Output() pesquisarEvent = new EventEmitter();

    @Output() pageChange = new EventEmitter<string>();

    constructor(
        private router: Router,
        private formBuilder: FormBuilder,
        private vendaService: VendaService,
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
            dataInicial: [],
            dataFinal: [],
            valorInicial: [],
            valorFinal: [],
            idCliente: [],
            idProduto: []
        })
    }

    pesquisar(filtrosRecebidos: Filtro[]) {
        filtrosRecebidos.forEach(filtro => {
            switch (filtro.field) {
                case 'id': {
                    this.vendaFiltros.id = filtro.valor;
                    break;
                }
                case 'dataInicial': {
                    this.vendaFiltros.dataInicial = filtro.valor;
                    break;
                }
                case 'dataFinal': {
                    this.vendaFiltros.dataFinal = filtro.valor;
                    break;
                }
                case 'valorInicial': {
                    this.vendaFiltros.valorInicial = filtro.valor;
                    break;
                }
                case 'valorFinal': {
                    this.vendaFiltros.valorFinal = filtro.valor;
                    break;
                }
                case 'idCliente': {
                    this.vendaFiltros.idCliente = filtro.valor;
                    break;
                }
                case 'idProduto': {
                    this.vendaFiltros.idProduto = filtro.valor;
                    break;
                }
            }
        });
        this.provider = this.vendaService.listar(this.vendaFiltros, toQuery(this.paramPageable));
    }

    changePaginator(paginator: PaginatorHelper) {
        this.paramPageable = new ParamPageable(paginator.size, paginator.page, paginator.sort);
        this.provider = this.vendaService.listar(this.vendaFiltros, toQuery(this.paramPageable))
    }

    editar(venda: any) {
        this.router.navigate(['vendas/edicao/' + venda.id]);
    }

    novo() {
        this.router.navigate(['vendas/edicao']);
    }

    public excluir(venda: Venda) {
        this.vendaService.excluir(venda.id).subscribe((resposta) => {
            if (resposta == null) {
                this.provider = this.vendaService.listar(this.vendaFiltros, toQuery(this.paramPageable))
            }
        });
    }

}
