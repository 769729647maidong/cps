import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';

import {LoginComponent} from './login/login.component';

import {BindComponent} from './bind/bind.component';
import {BindSuccessComponent} from './bind/bind-success/bind-success.component';

import {IndexComponent} from './index/index.component';
import {IndexUploadComponent} from './index/index-upload/index-upload.component';

import {PermissionGuard} from './services/cps/PermissionGuard';

const routes: Routes = [
  {path: 'login', component: LoginComponent},
  {path: 'bind', component: BindComponent},
  {path: 'bind/success', component: BindSuccessComponent},
  {path: 'index', component: IndexComponent},
  {path: 'index/upload', component: IndexUploadComponent, canActivate: [PermissionGuard]},
  {path: '', redirectTo: '/login', pathMatch: 'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {enableTracing: false})],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
