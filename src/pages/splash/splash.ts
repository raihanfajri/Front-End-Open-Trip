import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { LoginPage } from '../login/login';
import { TabsPage } from '../tabs/tabs';
@Component({
  selector: 'page-splash',
  templateUrl: 'splash.html'
})
export class SplashPage {
  constructor(public navCtrl: NavController,private Splashscreen: SplashScreen) {
     this.Splashscreen.show();
     let user = window.localStorage.getItem('user');
     let env = this;
     if(!this.isLoggedin()){
       console.log('not login yet, redirect to login page');
       env.navCtrl.setRoot(LoginPage);
       Splashscreen.hide();
     }
     else{
       let user = window.localStorage.getItem('user');
       console.log(user);
       env.navCtrl.setRoot(TabsPage);
       Splashscreen.hide();
     }
  }
  isLoggedin(){
      let user = window.localStorage.getItem('user');
      return user !== null && user !== undefined;
  }
  
}
