import {Component, OnInit, ChangeDetectorRef} from '@angular/core';
import {Router} from '@angular/router';
import {Location} from '@angular/common';

import {CpsService} from '../../services/cps/cps.service';

import WechatJSSDK from 'wechat-jssdk/dist/client.umd';
import {Toast} from 'ng-zorro-antd-mobile';

@Component({
  selector: 'app-index-upload',
  templateUrl: './index-upload.component.html',
  styleUrls: ['./index-upload.component.less'],
  providers: [Toast]
})

export class IndexUploadComponent implements OnInit {

  org_data = {};
  user_data = {};

  files_data = [];
  files_origin_data = [];
  task_id: number;

  show_upload_save_btn = false;
  show_image_picker = false;

  is_ios = navigator.userAgent.includes('iPhone') || navigator.userAgent.includes('iPad');

  wechatObj: any;
  wechatConfig = {
    'appId': '',
    'nonceStr': '',
    'signature': '',
    'timestamp': '',
    'debug': false,
    'jsApiList': [
      'onMenuShareAppMessage',
      'onMenuShareTimeline',
      'onMenuShareQQ',
      'onMenuShareWeibo',
      'onMenuShareQZone',
      'previewImage',
      'scanQRCode'
    ]
  };

  constructor(
    private _toast: Toast,
    private router: Router,
    private location: Location,
    private cpsService: CpsService,
    private cdr: ChangeDetectorRef
  ) {
  }

  ngOnInit() {
    let sign_url = window.location.href.split('#')[0];
    if (this.is_ios) {
      sign_url = window.localStorage.ios_sign_url;
    }
    this.cpsService.uploadInit({sign_url: sign_url})
      .subscribe(result => {
        const code = Number(result.code);
        if (code === 0) {
          const wx_conf = JSON.parse(result.data.wx_conf);
          this.wechatConfig.appId = wx_conf.appId;
          this.wechatConfig.nonceStr = wx_conf.nonceStr;
          this.wechatConfig.signature = wx_conf.signature;
          this.wechatConfig.timestamp = wx_conf.timestamp;
          this.wechatConfig.debug = wx_conf.debug;
          this.wechatConfig.jsApiList = wx_conf.jsApiList;
          this.wechatObj = new WechatJSSDK(this.wechatConfig);
          this.wechatObj.initialize()
            .then(wechat => {
            })
            .catch(err => {
              console.error(err);
            });
          this.org_data = result.data.org_data;
          this.user_data = result.data.user_data;
        } else if (code > 0) {
          Toast.show(result.msg, 2000);
        }
      });
  }

  /**
   * 监听键盘输入(Enter)事件
   * @param event 输入事件
   */
  taskKeyUp(event) {
    if (event.code === 'Enter') {
      this.uploadSearch(this.task_id);
    }
  }

  /**
   * 输入框任务号的值变化回调函数
   * @param value 任务号的值
   */
  taskChange(value) {
    this.files_data = [];
    this.files_origin_data = [];
    this.show_image_picker = false;
    this.show_upload_save_btn = false;
  }

  /**
   * 搜索任务文件
   * @param value 输入框的值
   */
  uploadSearch(value) {
    this.files_data = [];
    this.files_origin_data = [];
    this.show_image_picker = false;
    this.show_upload_save_btn = false;

    if (!(/^[0-9]+/.test(value))) {
      Toast.show('请输入正确格式的任务号', 2000);
      return;
    }

    Toast.loading('搜索中...', 0);
    this.cpsService.uploadSearch({task_id: value})
      .subscribe(result => {
        Toast.hide();
        const code = Number(result.code);
        if (code === 0) {
          this.show_image_picker = true;
          if (result.data.task_files) {
            this.files_data = result.data.task_files;
            this.files_origin_data = [];
            for (let i = 0; i < result.data.task_files.length; i++) {
              this.files_origin_data.push(result.data.task_files[i]);
            }
          } else {
            this.files_data = [];
            this.files_origin_data = [];
          }
          this.cdr.detectChanges();
        } else {
          Toast.show(result.msg, 2000);
        }
      });
  }

  /**
   * 文件变化回调函数
   * @param params 文件参数
   */
  fileChange(params) {
    // 新增
    if (params.operationType === 'add') {
      this.files_origin_data = [];
      for (let i = 0; i < params.files.length; i++) {
        this.files_origin_data.push(params.files[i]);
      }
      this.show_upload_save_btn = true;
      this.cdr.detectChanges();
      return;
    }
    // 删除
    if (params.operationType === 'remove') {
      const deleted_file = this.files_origin_data[params.index];
      this.files_origin_data.splice(params.index, 1);
      // 判断剩余的文件数据是否含有新文件
      let show = false;
      this.files_data.map(function (value, index) {
        if (value.url.indexOf('data') > -1) {
          show = true;
        }
      });
      this.show_upload_save_btn = show;
      if (deleted_file.hasOwnProperty('task_file_id')) {
        this.delete(deleted_file.task_file_id);
      }
      this.cdr.detectChanges();
    }
  }

  /**
   * 软删除服务器上传文件
   * @param value 文件id
   */
  delete(value) {
    Toast.loading('删除中...', 0);
    this.cpsService.uploadDelete({task_file_id: value})
      .subscribe(result => {
        Toast.hide();
        if (Number(result.code) > 0) {
          Toast.show(result.msg, 2000);
        } else {
          this.cdr.detectChanges();
          Toast.show('删除成功', 1000);
        }
      });
  }

  /**
   * 上传保存
   */
  uploadSave() {
    if (this.files_data.length === 0) {
      return;
    }
    const upload_files = [];
    for (let i = 0; i < this.files_data.length; i++) {
      if (!this.files_data[i].hasOwnProperty('task_file_id')) {
        upload_files.push(this.files_data[i]);
      }
    }
    if (upload_files.length > 0) {
      if (upload_files.length > 6) {
        Toast.show('一次最多6张图片,请多次上传', 2000);
        return;
      }
      Toast.loading('上传中...', 0);
      this.cpsService.uploadSave({task_id: this.task_id, upload_files: upload_files})
        .subscribe(result => {
          Toast.hide();
          if (Number(result.code) > 0) {
            Toast.show(result.msg, 2000);
          } else {
            Toast.show('上传成功', 1000);
            this.uploadSearch(this.task_id);
            return;
          }
        });
    }
  }

  /**
   * 预览图片
   */
  imageClick(params) {
    const img_url = params.files[params.index].url;
    this.wechatObj.callWechatApi('previewImage', {
      current: img_url,
      urls: [img_url]
    });
  }

  /**
   * 扫描条形码
   */
  scanBarCode() {
    const that = this;
    this.wechatObj.callWechatApi('scanQRCode', {
      needResult: 1, // 默认为0，扫描结果由微信处理，1则直接返回扫描结果，
      scanType: ['qrCode', 'barCode'], // 可以指定扫二维码还是一维码，默认二者都有
      success: function (res) {
        const scan_result = res.resultStr; // 当needResult 为 1 时，扫码返回的结果
        const result_arr = scan_result.split(',');
        that.task_id = result_arr[1];
        that.uploadSearch(that.task_id);
        that.cdr.detectChanges();
      }
    });
  }

  goBack() {
    let is_need_save = false;
    this.files_data.map(function (value, index) {
      if (value.url.indexOf('data') > -1) {
        is_need_save = true;
      }
    });
    if (is_need_save) {
      Toast.show('有新的文件,请保存后返回', 2000);
      return;
    } else {
      this.location.back();
    }
  }

}
