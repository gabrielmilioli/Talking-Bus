import { Component, ViewChild } from '@angular/core';
import { Platform, AlertController, LoadingController, Loading, Nav } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { Storage } from '@ionic/storage';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {

  rootPage:any = 'LoginPage';
  loading: Loading;

  user: any;

  constructor(
    platform: Platform, 
    statusBar: StatusBar, 
    splashScreen: SplashScreen,
    private alertCtrl: AlertController,
    private loadingCtrl: LoadingController,
    private storage: Storage
  )
  {
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      statusBar.styleDefault();
      splashScreen.hide();
      this.user = this.getUser();
    });

  }

  block(text = '') {
    if(!text){
      text = 'Please wait...';
    }
    this.loading = this.loadingCtrl.create({
      content: text,
      dismissOnPageChange: true
    });
    this.loading.present();
  }

  unblock() {
    this.loading.dismiss();
  }

  showError(text) {
    this.loading.dismiss();

    let alert = this.alertCtrl.create({
      title: 'Fail',
      subTitle: text,
      buttons: ['OK']
    });
    alert.present();
  }

  public setUser(user) {
    var avatar = "assets/701987-avatar/png/001-man-13.png";
    var currentUser = {
      "id": user.id,
      "name": user.name,
      "email": user.email,
      "login": user.login,
      "avatar": avatar
    };

    this.user = currentUser;

    this.setStorage('user', currentUser);

    this.setStorage('id', user.id);
    this.setStorage('name', user.name);
    this.setStorage('email', user.email);
    this.setStorage('login', user.login);
    this.setStorage('avatar', user.id);
    //console.log(this.user);
    //this.photo = photo;
  }

  public getUser() {
    return this.user;
  }

  public getStorage(name){
    return window.localStorage.getItem(name);
  }

  public setStorage(name, value){
    window.localStorage.setItem(name, value);
  }

  public logout() {
    window.localStorage.clear();
    this.nav.setRoot('LoginPage');
    // limpar storage
  }

}