import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';

import { Hero } from './hero';


@Injectable({ providedIn: 'root' })
export class HeroService {

  private heroesUrl = "http://ec2-3-129-39-58.us-east-2.compute.amazonaws.com:8080/api";  // Web APIのURL

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  constructor(
    private http: HttpClient,) { }

  /** サーバーからヒーローを取得する */
  getHeroes(email:string): Observable<Hero[]> {
    return this.http.get<Hero[]>("http://ec2-3-129-39-58.us-east-2.compute.amazonaws.com:8080/api/getHeroes/"+email)
      .pipe(
        catchError(this.handleError<Hero[]>('getHeroes', []))
      );
  }

  getMarvelHeroes(): Observable<Hero[]> {
    return this.http.get<Hero[]>("http://ec2-3-129-39-58.us-east-2.compute.amazonaws.com:8080/api/getMarvelHeroes")
      .pipe(
        catchError(this.handleError<Hero[]>('getHeroes', []))
      );
  }

  gettest(email:String):Observable<String>{
    console.log(email);
    return this.http.get<any>("http://ec2-3-129-39-58.us-east-2.compute.amazonaws.com:8080/api/gettest/"+email)
    .pipe(
    );
  }


  /** IDによりヒーローを取得する。idが見つからない場合は`undefined`を返す。 */
  getHeroNo404<Data>(id: number): Observable<Hero> {
    const url = `${this.heroesUrl}/?id=${id}`;
    return this.http.get<Hero[]>(url)
      .pipe(
        map(heroes => heroes[0]), // {0|1} 要素の配列を返す
        tap(h => {
          const outcome = h ? `fetched` : `did not find`;
        }),
        catchError(this.handleError<Hero>(`getHero id=${id}`))
      );
  }

  /** IDによりヒーローを取得する。見つからなかった場合は404を返却する。 */
  getHero(id: number): Observable<Hero> {
    const url = `${this.heroesUrl}/${id}`;
    return this.http.get<Hero>(url).pipe(
      catchError(this.handleError<Hero>(`getHero id=${id}`))
    );
  }

  /* 検索語を含むヒーローを取得する */
  searchHeroes(term: string): Observable<Hero[]> {
    if (!term.trim()) {
      // 検索語がない場合、空のヒーロー配列を返す
      return of([]);
    }
    return this.http.get<Hero[]>(`${this.heroesUrl}/?name=${term}`).pipe(
      catchError(this.handleError<Hero[]>('searchHeroes', []))
    );
  }

  //////// Save methods //////////

  /** POST: サーバーに新しいヒーローを登録する */
  addHero(hero: Hero): Observable<Hero> {
    console.log("ok");
    return this.http.post<Hero>("http://ec2-3-129-39-58.us-east-2.compute.amazonaws.com:8080/api/saveHero", hero, this.httpOptions).pipe(
      catchError(this.handleError<Hero>('addHero'))
    );
  }

  /** DELETE: サーバーからヒーローを削除 */
  deleteHero(hero: Hero | number): Observable<Hero> {
    const id = typeof hero === 'number' ? hero : hero.id;

    return this.http.delete<Hero>(`${this.heroesUrl}/deleteHero/${id}`, this.httpOptions).pipe(
      catchError(this.handleError<Hero>('deleteHero'))
    );
  }

  /** PUT: サーバー上でヒーローを更新 */
  updateHero(hero: Hero): Observable<any> {
    return this.http.put(this.heroesUrl, hero, this.httpOptions).pipe(
      catchError(this.handleError<any>('updateHero'))
    );
  }

  /**
   * 失敗したHttp操作を処理します。
   * アプリを持続させます。
   * @param operation - 失敗した操作の名前
   * @param result - observableな結果として返す任意の値
   */
  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      // TODO: リモート上のロギング基盤にエラーを送信する
      console.error(error); // かわりにconsoleに出力

      // TODO: ユーザーへの開示のためにエラーの変換処理を改善する

      // 空の結果を返して、アプリを持続可能にする
      return of(result as T);
    };
  }

  /** HeroServiceのメッセージをMessageServiceを使って記録 */
  // private log(message: string) {
  //   this.messageService.add(`HeroService: ${message}`);
  // }
}


/*
Copyright Google LLC. All Rights Reserved.
Use of this source code is governed by an MIT-style license that
can be found in the LICENSE file at http://angular.io/license
*/