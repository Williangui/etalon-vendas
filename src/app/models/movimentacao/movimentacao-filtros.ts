import {TipoMovimentacao} from "./movimentacao";

export class MovimentacaoFiltros {
    id?: number;
    idProduto?: number;
    tipo?: TipoMovimentacao;
    dataInicial?: Date;
    dataFinal?: Date;
    idUsuario?: number;
}