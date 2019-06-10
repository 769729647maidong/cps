
const domain = '/index.php';

export const Config = {
  getOrgUrl: domain + '?m=admin&c=weixin&a=get_info&type=org',
  getSysUserUrl: domain + '?m=admin&c=weixin&a=get_info&type=sysuser',

  loginUrl: domain + '?m=admin&c=weixin&a=cps&type=login',
  cpsBindUrl: domain + '?m=admin&c=weixin&a=cps&type=bind',
  cpsUnBindUrl: domain + '?m=admin&c=weixin&a=cps&type=unbind',

  indexUrl: domain + '?m=admin&c=weixin&a=index',

  uploadInitUrl: domain + '?m=admin&c=weixin&a=upload&type=init',
  uploadSearchUrl: domain + '?m=admin&c=weixin&a=upload&type=search',
  uploadSaveUrl: domain + '?m=admin&c=weixin&a=upload&type=save',
  uploadDeleteUrl: domain + '?m=admin&c=weixin&a=upload&type=delete',

};
