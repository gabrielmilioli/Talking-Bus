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

  loading: Loading;
  registerCredentials = { login: '', password: '' };

  constructor(
    public nav: NavController,
    private auth: AuthServiceProvider,
    private app: MyApp
  ) {
    //console.log(this.app);
  }

  public createAccount() {
    this.nav.push('RegisterPage');
  }

  public login() {
    this.app.showLoading();
    this.auth.login(this.registerCredentials)
    .subscribe(response => {
      
      var status = response.status;
      var data = response.data;
      //console.log(data);
      if(status === 'success'){
        this.app.setUser(data);
        this.nav.setRoot(HomePage);
      } else {
        this.app.showError(data);
      }
    },
      error => {
        this.app.showError(error);
      });
  }

}