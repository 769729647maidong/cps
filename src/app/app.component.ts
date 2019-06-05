import {Component} from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.less'],
})
export class AppComponent {
  constructor() {
    if (window.localStorage) {
      const storage = window.localStorage;
      storage.ios_sign_url = location.href.split('#')[0];
    }
  }
}
