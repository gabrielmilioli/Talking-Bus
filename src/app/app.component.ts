import { Component, ViewChild } from '@angular/core';
import { Platform, AlertController, LoadingController, Loading, Nav } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { Storage } from '@ionic/storage';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;

  rootPage:any = 'LoginPage';
  loading: Loading;
  pages: PageInterface[] = [
    { title: 'Home', pageName: 'HomePage', tabComponent: 'HomePage', index: 0, icon: 'home' }
  ];

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

  openPage(page: PageInterface) {
    let params = {};
 
    // The index is equal to the order of our tabs inside tabs.ts
    if (page.index) {
      params = { tabIndex: page.index };
    }
 
    // The active child nav is our Tabs Navigation
    if (this.nav.getActiveChildNav() && page.index != undefined) {
      this.nav.getActiveChildNav().select(page.index);
    } else {
      // Tabs are not active, so reset the root page 
      // In this case: moving to or from SpecialPage
      this.nav.setRoot(page.pageName, params);
    }
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

}