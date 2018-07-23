import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/map';

/*
  Generated class for the AuthServiceProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class AuthServiceProvider {
  
  // Change to this http://ed43bb3b.ngrok.io/api/login
  static readonly LOGIN_URL = 'http://contoh.dev/api/login';
  // Change to this http://ed43bb3b.ngrok.io/api/register
  static readonly REGISTER_URL = 'http://contoh.dev/api/register';

  resturl : string = 'https://4p.pelainternet.com.br/rest.php';

  access: boolean;
  token: string;
  get: any;
  class: string = 'TalkingBus';

  constructor(public http: Http) {
  	console.log(this.http);
/*
  	this.http.get(this.resturl).map(res => res.json())
        .subscribe( data => {
          console.log(data);
        });
*/
  }

  // Login
  public login(credentials) {
    if (credentials.email === null || credentials.password === null) {
      return Observable.throw("Please insert credentials.");
    } else {
      return Observable.create(observer => {

        this.http.post(AuthServiceProvider.LOGIN_URL, credentials)
        .map(res => res.json())
        .subscribe( data => {
          if (data.access_token) {
            this.token = 'Bearer ' + data.access_token;
            this.access = true;
          } else {
            this.access = false;
          }
        });

        setTimeout(() => {
              observer.next(this.access);
          }, 500);

        setTimeout(() => {
              observer.complete();
          }, 1000);


      }, err => console.error(err));
    }
  }

  // Register
  public register(credentials) {
    if (credentials.login === null || credentials.name === null || credentials.email === null || credentials.password === null) {
      return Observable.throw("Please insert credentials");
    } else {

      //?class=TalkingBus&method=register
      //var object = JSON.parse(credentials);
      console.log(credentials);
      
      credentials.class = this.class;
      credentials.method = 'register';

      console.log(credentials);
      /*
      credentials = JSON.stringify(object);
  */
  	 return Observable.create(observer => {

        this.http.post(this.resturl, credentials)
        .map(res => res.json())
        .subscribe( data => {
          console.log(data);
        });

        observer.next(true);
        observer.complete();
      });

    /*
      return Observable.create(observer => {

        this.http.post(AuthServiceProvider.REGISTER_URL, credentials)
        .map(res => res.json())
        .subscribe( data => {
          console.log(data);
        });

        observer.next(true);
        observer.complete();
      });
      */
    }
  }

  // Get Token
  public getToken() {
    return this.token;
  }

  // Logout
  public logout() {
    return Observable.create(observer => {
      observer.next(true);
      observer.complete();
    });
  }

}