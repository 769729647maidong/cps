import {Injectable} from '@angular/core';

import {HttpClientService} from '../http/http-client.service';

import {Observable, of} from 'rxjs';
import {catchError, map, tap} from 'rxjs/operators';

import {Cps} from './cps';
import {Config} from './config';
import {MessageService} from '../message/message.service';
import {Toast} from 'ng-zorro-antd-mobile';


@Injectable({
  providedIn: 'root'
})

export class CpsService {

  constructor(
    private http: HttpClientService,
    private messageService: MessageService
  ) {
  }

  getSysUser(param: Object): Observable<Cps> {
    return this.http.post<Cps>(Config.getSysUserUrl, param).pipe(
      tap((result: Cps) => this.log(`${result.msg}`)),
      catchError(this.handleError<Cps>('获取系统用户'))
    );
  }

  getOrg(): Observable<Cps> {
    return this.http.get<Cps>(Config.getOrgUrl).pipe(
      tap((result: Cps) => this.log(`${result.msg}`)),
      catchError(this.handleError<Cps>('获取机构'))
    );
  }

  cpsLogin(param: Object): Observable<Cps> {
    return this.http.post<Cps>(Config.loginUrl, param).pipe(
      tap((result: Cps) => this.log(`${result.msg}`)),
      catchError(this.handleError<Cps>('测评师登录'))
    );
  }

  cpsBind(param: Object): Observable<Cps> {
    return this.http.post<Cps>(Config.cpsBindUrl, param).pipe(
      tap((result: Cps) => this.log(`${result.msg}`)),
      catchError(this.handleError<Cps>('测评师绑定'))
    );
  }

  cpsUnBind(param: Object): Observable<Cps> {
    return this.http.post<Cps>(Config.cpsUnBindUrl, param).pipe(
      tap((result: Cps) => this.log(`${result.msg}`)),
      catchError(this.handleError<Cps>('测评师解绑'))
    );
  }

  cpsIndex(param: Object): Observable<Cps> {
    return this.http.post<Cps>(Config.indexUrl, param).pipe(
      tap((result: Cps) => this.log(`${result.msg}`)),
      catchError(this.handleError<Cps>('测评师首页'))
    );
  }

  uploadInit(param: Object): Observable<Cps> {
    return this.http.post<Cps>(Config.uploadInitUrl, param).pipe(
      tap((result: Cps) => this.log(`${result.msg}`)),
      catchError(this.handleError<Cps>('上传页面初始化'))
    );
  }

  uploadSearch(param: Object): Observable<Cps> {
    return this.http.post<Cps>(Config.uploadSearchUrl, param).pipe(
      tap((result: Cps) => this.log(`${result.msg}`)),
      catchError(this.handleError<Cps>('查询文件'))
    );
  }

  uploadSave(param: Object): Observable<Cps> {
    return this.http.post<Cps>(Config.uploadSaveUrl, param).pipe(
      tap((result: Cps) => this.log(`${result.msg}`)),
      catchError(this.handleError<Cps>('保存文件'))
    );
  }

  uploadDelete(param: Object): Observable<Cps> {
    return this.http.post<Cps>(Config.uploadDeleteUrl, param).pipe(
      tap((result: Cps) => this.log(`${result.msg}`)),
      catchError(this.handleError<Cps>('删除文件'))
    );
  }

  /**
   * 请求错误的处理
   * @param operation 操作名
   * @param result 空结果
   */
  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      // TODO: send the error to remote logging infrastructure
      // console.error(error); // log to console instead

      // TODO: better job of transforming error for user consumption
      // this.log(`${operation} failed: ${error.message}`);
      Toast.offline(`请求失败,操作:${operation}`, 2000);
      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }

  /**
   * 记录信息
   * @param message 信息
   */
  private log(message: string) {
    this.messageService.add(`${message}`);
  }

}
