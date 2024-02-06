import {Cliente} from "../cliente/cliente";

export class Venda {
    id?: number;
    data?: Date;
    valorTotal?: Date;
    cliente?: Cliente;
    itens?: any[];
}