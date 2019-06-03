import {environment} from '../../../environments/environment';

const domain = 'http://bms.21thedu.com/index.php';

/*if (environment.production) {
  domain = 'http://bms.xhz.com/index.php';
}*/

export const Config = {
  getOrgUrl: domain + '?m=admin&c=weixin&a=get_info&type=org',
  getSysUserUrl: domain + '?m=admin&c=weixin&a=get_info&type=sysuser',

  loginUrl: domain + '?m=admin&c=weixin&a=cps&type=login',
  cpsBindUrl: domain + '?m=admin&c=weixin&a=cps&type=bind',
  cpsUnBindUrl: domain + '?m=admin&c=weixin&a=cps&type=unbind',

  indexUrl: domain + '?m=admin&c=weixin&a=index',
  signatureUrl: domain + '?m=admin&c=weixin&a=signature',
  uploadInitUrl: domain + '?m=admin&c=weixin&a=upload_init',
  uploadSearchUrl: domain + '?m=admin&c=weixin&a=upload_search',
  uploadSaveUrl: domain + '?m=admin&c=weixin&a=upload_save',
  uploadDeleteUrl: domain + '?m=admin&c=weixin&a=upload_delete',

};
