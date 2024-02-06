import {Component, OnInit, ViewChild} from '@angular/core';
import {Cliente, EnderecoCliente} from "../../../models/cliente/cliente";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {ClienteService} from "../../../services/cliente.service";
import {ActivatedRoute, Router} from "@angular/router";
import {CpfCnpjValidator} from "../../../utils/cpf-cnpj.validator";
import {EstadoService} from "../../../services/estado.service";
import {Estado} from "../../../models/estado/estado";
import {Municipio} from "../../../models/municipio/municipio";
import {MunicipioService} from "../../../services/municipio.service";
import {CepService} from "../../../services/cep.service";
import {MapComponent} from "../../map/map.component";
import {PageService} from "../../../services/page.service";

const mascaraTelefone = ['(', /\d/, /\d/, ')', /\d/, /\d/, /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/];
const mascaraCep = [/\d/, /\d/, '.', /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/];

@Component({
    selector: 'app-cliente-edicao',
    templateUrl: './cliente-edicao.component.html',
    styleUrls: ['./cliente-edicao.component.scss']
})
export class ClienteEdicaoComponent implements OnInit {

    header = ' - Cadastro de Cliente';
    cliente = new Cliente();
    enderecoCliente = new EnderecoCliente();
    formGroup: FormGroup = new FormGroup({});
    formGroupEndereco: FormGroup = new FormGroup({});
    maskTelefone = mascaraTelefone;
    maskCep = mascaraCep;
    estados: Estado[] = [];
    municipios: Municipio[] = [];
    estadoSelecionado = new Estado();
    municipioSelecionado = new Municipio();

    @ViewChild(MapComponent) map?: MapComponent;

    constructor(private clienteService: ClienteService,
                private route: ActivatedRoute,
                private router: Router,
                private formBuilder: FormBuilder,
                private estadoService: EstadoService,
                private municipioService: MunicipioService,
                private cepService: CepService,
                private pageService: PageService) {
    }

    ngOnInit(): void {
        setTimeout(() => {
            this.pageService.setHeader(this.header);
        }, 0);
        this.criarFormulario();
        const id = this.route.snapshot.paramMap.get("id")!;
        this.buscarEstados().then(r => {
            if (id) {
                this.cliente.id = +id;
                this.buscarPorId();
            }
        });
    }

    criarFormulario() {
        this.formGroup = this.formBuilder.group({
            id: [{value: null, disabled: true}],
            nome: ['', [Validators.required]],
            email: ['', [Validators.required]],
            documento: ['', [Validators.required, CpfCnpjValidator.validate]],
            telefone: [],
            dataNascimento: ['', [Validators.required]]
        })
        this.formGroupEndereco = this.formBuilder.group({
            logradouro: [],
            numero: [],
            bairro: [],
            complemento: [],
            pontoReferencia: [],
            cep: [],
            municipio: [],
            estado: [],
        })
    }

    public buscarPorId() {
        if (this.cliente.id) {
            this.clienteService.buscarPorId(this.cliente.id).subscribe((data) => {
                this.cliente = data;
                if (data.enderecoCliente && data.enderecoCliente.idEstado) {
                    this.buscarMunicipios(data.enderecoCliente.idEstado);
                    if (data.enderecoCliente.latitude && data.enderecoCliente.longitude) {
                        this.map?.addMarker(data.enderecoCliente.latitude, data.enderecoCliente.longitude)
                    }
                }
                this.formGroup.patchValue({
                    id: this.cliente.id,
                    nome: this.cliente.nome,
                    email: this.cliente.email,
                    documento: this.cliente.documento,
                    telefone: this.cliente.telefone,
                    dataNascimento: this.cliente.dataNascimento
                })
                if (this.cliente.enderecoCliente) {
                    this.preencherFormularioEndereco()
                }
            });
        }
    }

    preencherFormularioEndereco() {
        this.formGroupEndereco.patchValue({
            logradouro: this.cliente.enderecoCliente?.logradouro,
            numero: this.cliente.enderecoCliente?.numero,
            bairro: this.cliente.enderecoCliente?.bairro,
            complemento: this.cliente.enderecoCliente?.complemento,
            pontoReferencia: this.cliente.enderecoCliente?.pontoReferencia,
            cep: this.cliente.enderecoCliente?.cep,
            estado: this.cliente.enderecoCliente?.idEstado,
            municipio: this.cliente.enderecoCliente?.idMunicipio
        })
    }

    public salvar() {
        this.setCliente();
        this.setEnderecoCliente();
        this.clienteService.salvar(this.cliente).subscribe((data) => {
            if (data) {
                this.cliente = data;
                this.router.navigate(['/clientes']);
            }
        });
    }

    setCliente() {
        this.cliente.id = this.formGroup.get('id')?.value;
        this.cliente.nome = this.formGroup.get('nome')?.value;
        this.cliente.email = this.formGroup.get('email')?.value;
        this.cliente.documento = this.formGroup.get('documento')?.value;
        this.cliente.telefone = this.formGroup.get('telefone')?.value;
        this.cliente.dataNascimento = this.formGroup.get('dataNascimento')?.value;
    }

    setEnderecoCliente() {
        this.enderecoCliente.logradouro = this.formGroupEndereco.get('logradouro')?.value;
        this.enderecoCliente.numero = this.formGroupEndereco.get('numero')?.value;
        this.enderecoCliente.bairro = this.formGroupEndereco.get('bairro')?.value;
        this.enderecoCliente.complemento = this.formGroupEndereco.get('complemento')?.value;
        this.enderecoCliente.pontoReferencia = this.formGroupEndereco.get('pontoReferencia')?.value;
        this.enderecoCliente.cep = this.formGroupEndereco.get('cep')?.value;
        this.enderecoCliente.idEstado = this.formGroupEndereco.get('estado')?.value;
        this.enderecoCliente.idMunicipio = this.formGroupEndereco.get('municipio')?.value;
        this.enderecoCliente.latitude = this.map?.latitude;
        this.enderecoCliente.longitude = this.map?.longitude;
        this.enderecoCliente.id = this.cliente.enderecoCliente?.id;
        if (this.enderecoCliente) {
            this.cliente.enderecoCliente = this.enderecoCliente;
        }
    }

    limpar() {
        this.formGroup.reset();
    }

    public cancelar() {
        this.router.navigate(['/clientes']);
    }

    isCPF(): boolean {
        return this.formGroup.get('documento')?.value == null ? true : this.formGroup.get('documento')?.value.length < 12;
    }

    getCpfCnpjMask(): string {
        return this.isCPF() ? '000.000.000-009' : '00.000.000/0000-00';
    }

    async buscarEstados() {
        await this.estadoService.buscarTodos().subscribe(result => {
            this.estados = result;
        })
    }

    buscarMunicipios(estado: number) {
        this.municipios = [];
        this.municipioService.buscarPorUf(estado).subscribe(result => {
            this.municipios = result;
        });
    }

    setEstado(idEstado: number) {
        if (idEstado) {
            this.estadoSelecionado = {
                id: idEstado
            };
            this.buscarMunicipios(idEstado);
        }
    }

    setMunicipio(idMunicipio: number) {
        if (idMunicipio) {
            this.municipioSelecionado = {
                id: idMunicipio
            }
        }
    }

    buscarPorCep() {
        var cep = this.formGroupEndereco.get("cep")?.value;
        cep = cep.replace(".", "").replace("-", "")
        this.cepService.buscarPorCep(cep).subscribe(result => {
            if (result) {
                this.cliente.enderecoCliente = result;
                this.buscarMunicipios(result.idEstado);
                this.preencherFormularioEndereco();
            }
        })
    }

    buscarCoordenadas(): void {
        const endereco = this.formGroupEndereco.value;
        const municipio = this.municipios.filter(mun => mun.id === endereco.municipio)
        const estado = this.estados.filter(mun => mun.id === endereco.estado)
        const enderecoCompleto = `${endereco.logradouro},${endereco.numero},${endereco.bairro},${municipio[0].nome},${estado[0].nome}`;
        this.map?.buscarCoordenadas(enderecoCompleto);
    }
}