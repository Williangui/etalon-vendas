import {Observable} from "rxjs";

export class Filtro {
  label = '';
  field = '';
  type = '';
  width = '';
  valor?: any;
  observable?: Observable<any[]>;
  opcoes?: any[];

  columnDisplay?: string;
}
