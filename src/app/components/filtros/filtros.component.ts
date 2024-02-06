import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Filtro} from "../../models/filtro";
import {FormGroup} from "@angular/forms";
import {lastValueFrom, Observable} from "rxjs";

@Component({
  selector: 'app-filtros',
  templateUrl: './filtros.component.html',
  styleUrls: ['./filtros.component.scss']
})
export class FiltrosComponent implements OnInit {

  @Input() filtros: Filtro[] = [];
  @Input() formGroup: FormGroup = new FormGroup({});
  @Input() titulo = '';
  @Output() pesquisar = new EventEmitter();

  constructor() {
  }

  ngOnInit(): void {
    this.obterOpcoes();
  }

  async obterOpcoes() {
    for (let filtro of this.filtros) {
      if (filtro.observable) {
        filtro.opcoes = await lastValueFrom(filtro.observable);
      }
    }
  }

  ajustarFiltros() {
    this.filtros.forEach(filtro => {
      filtro.valor = this.formGroup.get(filtro.field)?.value;
    })
    this.listar();
  }

  listar() {
    this.pesquisar.emit(this.filtros);
  }

  limpar() {
    this.formGroup.reset();
  }

}
