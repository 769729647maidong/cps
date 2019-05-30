import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {FormsModule} from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';
import {NgZorroAntdMobileModule} from 'ng-zorro-antd-mobile';


import {LoginComponent} from './login/login.component';

import {BindComponent} from './bind/bind.component';
import {BindSuccessComponent} from './bind/bind-success/bind-success.component';

import {IndexComponent} from './index/index.component';
import { IndexUploadComponent } from './index/index-upload/index-upload.component';

import {CookieService} from 'ngx-cookie-service';
import {PermissionGuard} from './services/cps/PermissionGuard';
import {BaseInterceptor} from './http-interceptors/base-interceptor';
import {HTTP_INTERCEPTORS} from '@angular/common/http';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    BindComponent,
    BindSuccessComponent,
    IndexComponent,
    IndexUploadComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FormsModule,
    HttpClientModule,
    NgZorroAntdMobileModule
  ],
  providers: [
    CookieService,
    PermissionGuard,
    { provide: HTTP_INTERCEPTORS, useClass: BaseInterceptor, multi: true }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
