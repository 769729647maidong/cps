import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {Location} from '@angular/common';

import {CpsService} from '../services/cps/cps.service';

import {Toast} from 'ng-zorro-antd-mobile';

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.less'],
  providers: [Toast]
})

export class IndexComponent implements OnInit {

  org_id: number;
  org_data = {};
  user_data = {};

  grid_data = [
    {text: '上传文件', icon: '/v/cps/0.0.1/assets/img/logo.svg', navigation: 'index/upload'},
    {text: '...', icon: '/v/cps/0.0.1/assets/img/logo.svg'}
  ];

  constructor(
    private cpsService: CpsService,
    private router: Router,
    private location: Location,
    private _toast: Toast,
  ) {

  }

  ngOnInit() {
    this.cpsService.cpsIndex({})
      .subscribe(result => {
        const code = Number(result.code);
        if (code === 0) {
          this.org_data = result.data.org_data;
          this.user_data = result.data.user_data;
          this.org_id = result.data.org_data.org_id;
        } else if (code > 0) {
          Toast.show(result.msg, 2000);
        }
      });
  }

  click(event) {
    if (event.data.navigation) {
      this.router.navigate([event.data.navigation]);
    }
  }

  goBack() {
    this.location.back();
  }

}
