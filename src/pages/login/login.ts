import { Component } from '@angular/core';
import { IonicPage, NavController } from 'ionic-angular';
import { AuthServiceProvider } from '../../providers/auth-service/auth-service';
import { HomePage } from '../home/home';
import { MyApp } from '../../app/app.component';

/**
 * Generated class for the LoginPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {

  registerCredentials = { login: '', password: '' };

  constructor(
    public nav: NavController,
    private auth: AuthServiceProvider,
    private app: MyApp
  ) {
    //this.app.setAccess(true);
    //console.log(this.app.getAccess());
    if(this.app.getStorage('access')){
      this.nav.setRoot('MenuPage');
    }
  }

  public createAccount() {
    this.nav.push('RegisterPage');
  }

  public login() {
    this.app.block();
    this.auth.login(this.registerCredentials)
    .subscribe(response => {
      
      var status = response.status;
      var data = response.data;
      //console.log(data);
      if(status === 'success'){
        this.app.setUser(data);
        this.app.setStorage('access', true);
        this.nav.setRoot('MenuPage');
      } else {
        this.app.setStorage('access', false);
        this.app.showError(data);
      }
    },
      error => {
        this.app.showError(error);
      });
    this.app.unblock();
  }


  // Logout
  public logout() {
    return Observable.create(observer => {
      // clear storage etc
      this.currentUser = null;
      observer.next(true);
      observer.complete();
    });
  }


}