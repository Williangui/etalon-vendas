import {Component, EventEmitter, Input, Output, ViewChild} from '@angular/core';
import {ColunaListaPaginada} from "./coluna-lista-paginada";
import {MatTable, MatTableDataSource} from "@angular/material/table";
import {Observable, Subscription} from "rxjs";
import {ColunaAcoesListaPaginada} from "./coluna-acoes-lista-paginada";
import {PaginatorHelper} from "./paginator-helper";
import {PageEvent} from "@angular/material/paginator";
import {Sort} from "@angular/material/sort";
import {DateService} from "../../services/date.service";

@Component({
  selector: 'app-lista-paginada',
  templateUrl: './lista-paginada.component.html',
  styleUrls: ['./lista-paginada.component.scss']
})
export class ListaPaginadaComponent {
  @ViewChild(MatTable) table!: MatTable<any>;
  @Input() displayedColumns: string[] = [];
  @Input() colunas: ColunaListaPaginada[] = [];
  @Input() paginatorHelper = new PaginatorHelper();
  @Input() set acoes(value: ColunaAcoesListaPaginada[]) {
    if (value) {
      this.acoesGrid = value;
      this.displayedColumns.push('colunaAcoes');
    }
  }
  @Output() changePaginator = new EventEmitter();

  listaColunas: ColunaListaPaginada[] = [];
  provider$: any[] = [];
  subscription$!: Subscription;
  lista?: any[];
  acoesGrid: ColunaAcoesListaPaginada[] = [];
  tamanhosPagina = [10, 25, 50, 100];

  @Input() set provider(value: Observable<any>) {
    if (value) {
      this.provider$ = [];
      this.subscription$ = value.subscribe(
        (result) => this.pesquisar(result)
      );
    }
  }

  constructor(private dateService: DateService) {}

  pesquisar(result: any) {
    this.provider$ = result.content;
    this.table.dataSource = new MatTableDataSource(this.provider$);
    this.paginatorHelper.totalElements = result.totalElements;
    this.paginatorHelper.totalPages = result.totalPages;
  }

  changePage(event: PageEvent) {
    this.paginatorHelper.size = event.pageSize;
    this.paginatorHelper.page = event.pageIndex;
    this.changePaginator.emit(this.paginatorHelper);
  }

  changeSort(sort: Sort) {
    if (sort) {
      this.paginatorHelper.sort = sort.active + ',' + sort.direction;
      this.changePaginator.emit(this.paginatorHelper);
    }
  }
}
