import { Component } from '@angular/core';
import { Platform, AlertController, LoadingController, Loading } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  rootPage:any = 'LoginPage';

  constructor(
    platform: Platform, 
    statusBar: StatusBar, 
    splashScreen: SplashScreen,
    private alertCtrl: AlertController,
    private loadingCtrl: LoadingController
  )
  {
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      statusBar.styleDefault();
      splashScreen.hide();
    });
  }

  user: any;

  showLoading(text) {
    if(!text){
      text = 'Please wait...';
    }
    this.loading = this.loadingCtrl.create({
      content: text,
      dismissOnPageChange: true
    });
    this.loading.present();
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

    var currentUser = {
      "id": user.id,
      "name": user.name,
      "email": user.email,
      "login": user.login
    };

    this.user = currentUser;

    console.log(this.user);
    //this.photo = photo;
  }

  public getUser() {
    return this.user;
  }


}