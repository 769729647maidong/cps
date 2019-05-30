import {Component} from '@angular/core';
import {CpsService} from './services/cps/cps.service';
import {Router} from '@angular/router';
import {Location} from '@angular/common';
import {CookieService} from 'ngx-cookie-service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.less']
})
export class AppComponent {
  title = '测评师';

  constructor() {
    if (window.localStorage) {
      const storage = window.localStorage;
      storage.ios_sign_url = location.href.split('#')[0] + 'login';
    }
  }

}
