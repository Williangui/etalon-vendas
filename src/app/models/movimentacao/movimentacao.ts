import {Produto} from "../produto/produto";
import {Usuario} from "../usuario/usuario";

export class Movimentacao {
    id?: number;
    produto?: Produto;
    quantidade?: number;

    data?: Date;

    tipo?: TipoMovimentacao;

    usuario?: Usuario;
}

export enum TipoMovimentacao {
    ENTRADA= 'ENTRADA' ,
    RETIRADA = 'RETIRADA'
}