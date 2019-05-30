import {environment} from '../../../environments/environment';

const domain = 'http://bms.21thedu.com/index.php';

/*if (environment.production) {
  domain = 'http://bms.xhz.com/index.php';
}*/

export const Config = {
  getOrgUrl: domain + '?m=admin&c=weixin&a=get_org',
  getSysUserUrl: domain + '?m=admin&c=weixin&a=get_sys_user',

  loginUrl: domain + '?m=admin&c=weixin&a=cps_login',

  cpsBindUrl: domain + '?m=admin&c=weixin&a=cps_bind',
  cpsUnBindUrl: domain + '?m=admin&c=weixin&a=cps_unbind',

  indexUrl: domain + '?m=admin&c=weixin&a=index',
  uploadInitUrl: domain + '?m=admin&c=weixin&a=upload_init',
  signatureUrl: domain + '?m=admin&c=weixin&a=signature',
  uploadSearchUrl: domain + '?m=admin&c=weixin&a=upload_search',
  uploadSaveUrl: domain + '?m=admin&c=weixin&a=upload_save',
  uploadDeleteUrl: domain + '?m=admin&c=weixin&a=upload_delete',

};
