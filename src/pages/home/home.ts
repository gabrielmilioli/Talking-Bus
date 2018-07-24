import { Component } from '@angular/core';
import { IonicPage, NavController } from 'ionic-angular';
import { AuthServiceProvider } from '../../providers/auth-service/auth-service';
import { MyApp } from '../../app/app.component';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  users: any;

  constructor(private nav: NavController, private auth: AuthServiceProvider, private app: MyApp) {
    //this.getUsers();
    console.log(this);
  }

  public getUsers() {
    this.app.showLoading();
    this.auth.getUsers()
    .subscribe(response => {
      
      var status = response.status;
      var data = response.data;
      console.log(data);
      if(status === 'success'){
        this.users = data;
      } else {
        this.app.showError(data);
      }
    },
      error => {
        this.app.showError(error);
      });
  }

  public logout() {
    this.auth.logout().subscribe(succ => {
      this.nav.setRoot('LoginPage')
    });
  }

}