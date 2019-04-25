import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import { AppConst } from '../constants/app.const';

@Injectable({
  providedIn: 'root'
})
export class BookService {

  constructor(private http: Http) { }

  getBookList() {
    let url = AppConst.serverPath+"/book/bookList";
    let tokenHeaders= new Headers({
      'Content-Type' : 'application/json',
      'x-auth-token' : localStorage.getItem('xAuthToken')
    });
    return this.http.get(url, {headers:tokenHeaders});
  }

  getBook(id: number) {

    let url = AppConst.serverPath+"/book/"+id;
    let tokenHeaders= new Headers({
      'Content-Type' : 'application/json',
      'x-auth-token' : localStorage.getItem('xAuthToken')
    });
    return this.http.get(url, {headers:tokenHeaders});
  }

  searchBook(keyword: string) {

    let url = AppConst.serverPath+"/book/searchBook";
    let tokenHeaders= new Headers({
      'Content-Type' : 'application/json',
      'x-auth-token' : localStorage.getItem('xAuthToken')
    });
    return this.http.post(url, keyword, {headers:tokenHeaders});

  }
}
