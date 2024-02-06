import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {HomeComponent} from "./components/home/home.component";
import {ProdutoListagemComponent} from "./components/produto/produto-listagem/produto-listagem.component";
import {ProdutoEdicaoComponent} from "./components/produto/produto-edicao/produto-edicao.component";
import {LoginComponent} from "./components/login/login.component";
import {DashboardComponent} from "./components/dashboard/dashboard.component";
import {AuthenticationComponent} from "./components/authentication/authentication.component";
import {CadastroUsuarioComponent} from "./components/usuario/cadastro-usuario/cadastro-usuario.component";
import {AuthGuard} from "./guard/auth.guard";
import {UsuarioListagemComponent} from "./components/usuario/usuario-listagem/usuario-listagem.component";
import {AtivarUsuarioComponent} from "./components/usuario/ativar-usuario/ativar-usuario.component";
import {ClienteListagemComponent} from "./components/cliente/cliente-listagem/cliente-listagem.component";
import {ClienteEdicaoComponent} from "./components/cliente/cliente-edicao/cliente-edicao.component";
import {VendaListagemComponent} from "./components/venda/venda-listagem/venda-listagem.component";
import {VendaEdicaoComponent} from "./components/venda/venda-edicao/venda-edicao.component";
import {CategoriaListagemComponent} from "./components/categoria/categoria-listagem/categoria-listagem.component";
import {CategoriaEdicaoComponent} from "./components/categoria/categoria-edicao/categoria-edicao.component";
import {
  MovimentacaoListagemComponent
} from "./components/movimentacao/movimentacao-listagem/movimentacao-listagem.component";
import {MovimentacaoEdicaoComponent} from "./components/movimentacao/movimentacao-edicao/movimentacao-edicao.component";

const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
    children: [
      {path: '', redirectTo: 'home', pathMatch: 'full'},
      {path: 'home', component: DashboardComponent},
      {path: 'categorias', component: CategoriaListagemComponent},
      {path: 'categorias/edicao', component: CategoriaEdicaoComponent},
      {path: 'categorias/edicao/:id', component: CategoriaEdicaoComponent},
      {path: 'produtos', component: ProdutoListagemComponent},
      {path: 'produtos/edicao', component: ProdutoEdicaoComponent},
      {path: 'produtos/edicao/:id', component: ProdutoEdicaoComponent},
      {path: 'movimentacoes', component: MovimentacaoListagemComponent},
      {path: 'movimentacoes/edicao', component: MovimentacaoEdicaoComponent},
      {path: 'movimentacoes/edicao/:id', component: MovimentacaoEdicaoComponent},
      {path: 'usuarios', component: UsuarioListagemComponent},
      {path: 'usuarios/ativar/:id', component: AtivarUsuarioComponent},
      {path: 'clientes', component: ClienteListagemComponent},
      {path: 'clientes/edicao', component: ClienteEdicaoComponent},
      {path: 'clientes/edicao/:id', component: ClienteEdicaoComponent},
      {path: 'vendas', component: VendaListagemComponent},
      {path: 'vendas/edicao', component: VendaEdicaoComponent},
      {path: 'vendas/edicao/:id', component: VendaEdicaoComponent},
    ],
    canActivate: [AuthGuard]
  },
  {
    path: '',
    component: AuthenticationComponent,
    children: [
      {path: '', redirectTo: 'login', pathMatch: 'full'},
      {path: 'login', component: LoginComponent},
      {path: 'criar-conta', component: CadastroUsuarioComponent},
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
