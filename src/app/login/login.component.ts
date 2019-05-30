import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';

import {CpsService} from '../services/cps/cps.service';

import {Toast} from 'ng-zorro-antd-mobile';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.less'],
  providers: [Toast]
})

export class LoginComponent implements OnInit {
  unbind_org_id = '';
  sys_user_data = [];
  org_data = {};

  is_logging = false;

  right = [
    {
      text: '×',
      onPress: () => this.unBind(),
      style: {backgroundColor: '#F4333C', color: 'white', fontSize: '30px', width: '54px'}
    }
  ];

  constructor(
    private cpsService: CpsService,
    private _toast: Toast,
    private router: Router
  ) {

  }

  ngOnInit() {
    this.getOrg();
  }

  /**
   * 获取机构信息
   */
  getOrg() {
    this.cpsService.getOrg()
      .subscribe(result => {
        const code = Number(result.code);
        if (code === 0) {
          this.org_data = result.data.org_data;
          this.getSysUser();
        } else if (code > 0) {
          Toast.show(result.msg, 2000);
        }
      });
  }

  /**
   * 获取系统用户
   */
  getSysUser() {
    this.cpsService.getSysUser({})
      .subscribe(result => {
        const code = Number(result.code);
        if (code === 0) {
          this.sys_user_data = result.data.sys_user;
        } else {
          this.sys_user_data = [];
          Toast.show(result.msg, 2000);
        }
      });
  }

  /**
   * 测评师登录
   * @param org_id 登录的机构id
   */
  login(org_id) {
    if (!org_id) {
      Toast.show('请选择机构登录', 2000);
      return;
    }
    this.is_logging = true;
    const param = {org_id: org_id};
    this.cpsService.cpsLogin(param)
      .subscribe(result => {
        this.is_logging = false;
        const code = Number(result.code);
        if (code === 0) {
          this.router.navigate(['/index']);
        } else {
          Toast.show(result.msg, 2000);
        }
      });
  }

  /**
   * 系统用户解绑微信账号
   */
  unBind() {
    if (!this.unbind_org_id) {
      Toast.show('请选择机构解绑', 2000);
      return;
    }
    const param = {org_id: this.unbind_org_id};
    this.cpsService.cpsUnBind(param)
      .subscribe(result => {
        const code = Number(result.code);
        if (code === 0) {
          this.getSysUser();
        } else {
          Toast.show(result.msg, 2000);
        }
      });
  }

  goBind() {
    this.router.navigate(['/bind']);
  }

  /**
   * 机构左滑动的回调函数
   * @param org_id 解绑的机构id
   */
  open(org_id) {
    this.unbind_org_id = org_id;
  }

}
