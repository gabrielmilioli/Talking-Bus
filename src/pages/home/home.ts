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
    this.getUsers();
    //console.log(this);
  }

  public getUsers() {
    this.app.block();
    this.auth.getUsers()
    .subscribe(response => {
      var status = response.status;
      var data = response.data;
      
      if(status === 'success'){
        this.users = data;
      } else {
        this.app.showError(data);
      }
    },
      error => {
        this.app.showError(error);
      });
    this.app.unblock();
  }

  doRefresh(refresher) {
    setTimeout(() => {
      refresher.complete();
      this.getUsers();
    }, 1000);
  }

}