import {LOCALE_ID, NgModule} from '@angular/core';

import {BrowserModule} from '@angular/platform-browser';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';

import {MatToolbarModule} from "@angular/material/toolbar";
import {MatButtonModule} from "@angular/material/button";
import {MatIconModule} from "@angular/material/icon";
import {MatSidenavModule} from "@angular/material/sidenav";
import {MatListModule} from "@angular/material/list";

import {MenuComponent} from './components/menu/menu.component';
import {HomeComponent} from './components/home/home.component';
import {ProdutoListagemComponent} from './components/produto/produto-listagem/produto-listagem.component';
import {MatCardModule} from "@angular/material/card";
import {MatFormFieldModule} from "@angular/material/form-field";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {MatInputModule} from "@angular/material/input";
import {FiltrosComponent} from './components/filtros/filtros.component';
import {HttpClientModule} from "@angular/common/http";
import {MatTableModule} from "@angular/material/table";
import {MatSortModule} from "@angular/material/sort";
import {MatPaginatorModule} from "@angular/material/paginator";
import {ListaPaginadaComponent} from './components/lista-paginada/lista-paginada.component';
import {ProdutoEdicaoComponent} from './components/produto/produto-edicao/produto-edicao.component';
import {MatTooltipModule} from "@angular/material/tooltip";
import {MatSnackBarModule} from "@angular/material/snack-bar";
import {LoginComponent} from './components/login/login.component';
import {DashboardComponent} from './components/dashboard/dashboard.component';
import {AuthenticationComponent} from './components/authentication/authentication.component';
import {CadastroUsuarioComponent} from './components/usuario/cadastro-usuario/cadastro-usuario.component';
import {httpInterceptorsProviders} from "./http-interceptors";
import {AtivarUsuarioComponent} from './components/usuario/ativar-usuario/ativar-usuario.component';
import {UsuarioListagemComponent} from './components/usuario/usuario-listagem/usuario-listagem.component';
import {MatSlideToggleModule} from "@angular/material/slide-toggle";
import {ClienteListagemComponent} from './components/cliente/cliente-listagem/cliente-listagem.component';
import {ClienteEdicaoComponent} from './components/cliente/cliente-edicao/cliente-edicao.component';
import {CpfCnpjValidatorDirective} from "./utils/cpf-cnpj.validator.directive";
import {NgxMaskModule} from "ngx-mask";
import {TextMaskModule} from "angular2-text-mask";
import {MAT_RADIO_DEFAULT_OPTIONS, MatRadioModule} from "@angular/material/radio";
import {MatDatepickerModule} from "@angular/material/datepicker";
import {MAT_DATE_LOCALE, MatNativeDateModule} from "@angular/material/core";
import {CURRENCY_MASK_CONFIG, CurrencyMaskConfig, CurrencyMaskModule} from 'ng2-currency-mask';
import {MatSelectModule} from "@angular/material/select";
import {MapComponent} from './components/map/map.component';
import {GoogleMapsModule} from "@angular/google-maps";
import {VendaListagemComponent} from './components/venda/venda-listagem/venda-listagem.component';
import {VendaEdicaoComponent} from './components/venda/venda-edicao/venda-edicao.component';
import {CategoriaListagemComponent} from "./components/categoria/categoria-listagem/categoria-listagem.component";
import {CategoriaEdicaoComponent} from './components/categoria/categoria-edicao/categoria-edicao.component';
import {
    MovimentacaoListagemComponent
} from './components/movimentacao/movimentacao-listagem/movimentacao-listagem.component';
import {MovimentacaoEdicaoComponent} from './components/movimentacao/movimentacao-edicao/movimentacao-edicao.component';
import {DatePipe} from '@angular/common';
import {DateService} from "./services/date.service";
import {CustomDatePipe} from "./utils/custom-date-pipe";
import { CommonModule, registerLocaleData } from '@angular/common';
import localePt from '@angular/common/locales/pt';

registerLocaleData(localePt, 'pt-BR');

export const CustomCurrencyMaskConfig: CurrencyMaskConfig = {
    align: "right",
    allowNegative: true,
    decimal: ",",
    precision: 2,
    prefix: "R$ ",
    suffix: "",
    thousands: "."
};

@NgModule({
    declarations: [
        AppComponent,
        MenuComponent,
        HomeComponent,
        ProdutoListagemComponent,
        FiltrosComponent,
        ListaPaginadaComponent,
        ProdutoEdicaoComponent,
        LoginComponent,
        DashboardComponent,
        AuthenticationComponent,
        CadastroUsuarioComponent,
        AtivarUsuarioComponent,
        UsuarioListagemComponent,
        ClienteListagemComponent,
        ClienteEdicaoComponent,
        CpfCnpjValidatorDirective,
        MapComponent,
        VendaListagemComponent,
        VendaEdicaoComponent,
        CategoriaListagemComponent,
        CategoriaEdicaoComponent,
        MovimentacaoListagemComponent,
        MovimentacaoEdicaoComponent,
        CustomDatePipe
    ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        BrowserAnimationsModule,
        MatToolbarModule,
        MatButtonModule,
        MatIconModule,
        MatSidenavModule,
        MatListModule,
        MatCardModule,
        MatFormFieldModule,
        FormsModule,
        MatInputModule,
        ReactiveFormsModule,
        HttpClientModule,
        MatTableModule,
        MatPaginatorModule,
        MatSortModule,
        MatTooltipModule,
        MatSnackBarModule,
        MatSlideToggleModule,
        NgxMaskModule.forRoot(),
        TextMaskModule,
        MatRadioModule,
        MatDatepickerModule,
        MatNativeDateModule,
        CurrencyMaskModule,
        MatSelectModule,
        GoogleMapsModule,
        CommonModule
    ],
    providers: [
        httpInterceptorsProviders,
        {provide: MAT_RADIO_DEFAULT_OPTIONS, useValue: {color: 'primary'}},
        MatDatepickerModule,
        {provide: MAT_DATE_LOCALE, useValue: 'pt-br'},
        {provide: LOCALE_ID, useValue: 'pt-br'},
        {provide: CURRENCY_MASK_CONFIG, useValue: CustomCurrencyMaskConfig},
        DatePipe,
        DateService,
        {provide: LOCALE_ID, useValue: 'pt-BR'}
    ],
    bootstrap: [AppComponent]
})
export class AppModule {
}
