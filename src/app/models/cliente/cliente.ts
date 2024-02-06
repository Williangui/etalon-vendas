export class Cliente {
  id?: number;
  nome?: string;
  email?: string;
  documento?: string;
  telefone?: string;
  dataNascimento?: Date;
  enderecoCliente?: EnderecoCliente = new EnderecoCliente();
}

export class EnderecoCliente {
  id?: number;
  logradouro?: string;
  numero?: string;
  bairro?: string;
  complemento?: string;
  pontoReferencia?: string;
  cep?: string;
  idEstado?: number;
  idMunicipio?: number;
  latitude?: number;
  longitude?: number;
}
