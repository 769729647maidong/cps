import {Component, OnInit, Input} from '@angular/core';
import {Router} from '@angular/router';

import {Toast} from 'ng-zorro-antd-mobile';
import {Picker} from 'ng-zorro-antd-mobile';

import {CpsService} from '../services/cps/cps.service';
import {Location} from '@angular/common';

@Component({
  selector: 'app-bind',
  templateUrl: './bind.component.html',
  styleUrls: ['./bind.component.less'],
  providers: [Toast, Picker],
})
export class BindComponent implements OnInit {
  org_info: any;
  org_data = [];

  selected_org_arr = [];
  selected_org_name = '请选择机构';
  selected_org_id = null;

  user_name = '';
  user_name_error = false;
  password = '';
  password_error = false;

  is_binding = false;

  constructor(
    private cpsService: CpsService,
    private _toast: Toast,
    private _picker: Picker,
    private router: Router,
    private location: Location
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
          this.org_info = result.data.org_data;
          for (const i in this.org_info) {
            if (this.org_info.hasOwnProperty(i)) {
              this.org_data.push(this.org_info[i]);
            }
          }
        } else {
          Toast.show(result.msg, 2000);
        }
      });
  }

  /**
   * 用户名校验
   */
  userNameChange() {
    const value = this.user_name.trim();
    this.user_name_error = value === '' || value.length === 0;
  }

  /**
   * 密码校验
   */
  passwordChange() {
    const value = this.password.trim();
    this.password_error = value === '' || value.length === 0;
  }

  /**
   * 绑定机构
   */
  bindOrg() {
    if (this.selected_org_id === null) {
      Toast.show('请选择机构', 2000);
      return false;
    }
    this.userNameChange();
    this.passwordChange();
    if (this.user_name_error || this.password_error) {
      return false;
    }
    this.is_binding = true;
    const param = {org_id: this.selected_org_id, user_name: this.user_name, password: this.password};
    this.cpsService.cpsBind(param)
      .subscribe(result => {
        this.is_binding = false;
        if (Number(result.code) === 0) {
          this.router.navigate(['/bind/success']);
        } else {
          Toast.show(result.msg, 2000);
        }
      });
  }

  /**
   * 选择机构
   * @param result 选中的机构数组
   */
  selectOrg(result) {
    this.selected_org_name = result[0];
    for (const i in this.org_info) {
      if (this.org_info.hasOwnProperty(i) && this.org_info[i] === result[0]) {
        this.selected_org_id = i;
        break;
      }
    }
  }

  /**
   * 返回
   */
  goBack() {
    this.location.back();
  }
}
