import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/map';

/*
  Generated class for the AuthServiceProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class AuthServiceProvider {
  resturl : string = 'https://4p.pelainternet.com.br/rest.php';
  access: boolean;
  token: string;
  data: any;
  get: any;
  class: string = 'TalkingBus';
  headers: any;

  constructor(public http: Http) {
    console.log('Authorization');
    //this.getHeaders();
  }

  // Login
  public login(credentials) {
    credentials.class = this.class;
    credentials.method = 'login';

    if (credentials.login === null || credentials.password === null) {
      return Observable.throw("Please insert credentials.");
    } else {
      return Observable.create(observer => {

        this.http.post(this.resturl, credentials,  { headers: this.getHeaders() })
        .map(res => res.json())
        .subscribe( response => {
          var status = response.status;
          this.data = response;
          
          if(status === 'success'){
            this.access = true;
          }else{
            this.access = false;
          }
        });

        setTimeout(() => {
            observer.next(this.data);
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

      //var object = JSON.parse(credentials);
      
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

    }
  }

  // Get Token
  public getToken() {
    return this.token;
  }

  // Get Access
  public getAccess() {
    return this.access;
  }

  // Logout
  public logout() {
    return Observable.create(observer => {
      this.currentUser = null;
      observer.next(true);
      observer.complete();
    });
  }

  public getHeaders(){
    let headers = new Headers();

    headers.append('Content-Type', 'application/json');
    headers.append('Access-Control-Allow-Origin', '*');
    //headers.append('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, DELETE, PUT');
    //headers.append('Access-Control-Allow-Headers', 'Content-Type, Access-Control-Allow-Headers');
    headers.append('Accept', 'application/json');
    headers.append('Authorization', 'Basic' + btoa('talkingbus' + ":" + 'zx96@28#'));

    //console.log(headers);
    return headers;
  }




  // Login
  public getUsers() {
    var credentials = {"class": this.class, "method": "get_users"};
  
    return Observable.create(observer => {

      this.http.post(this.resturl, credentials,  { headers: this.getHeaders() })
      .map(res => res.json())
      .subscribe( response => {
        var status = response.status;
        this.data = response;
        
        if(status === 'success'){
          this.access = true;
        }else{
          this.access = false;
        }
      });

      setTimeout(() => {
          observer.next(this.data);
        }, 500);

      setTimeout(() => {
            observer.complete();
        }, 1000);

    }, err => console.error(err));

  }


}