import { Component, ViewChild } from '@angular/core';
import { Platform, Nav } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { NativeStorage } from '@ionic-native/native-storage'
import { LoginPage } from '../pages/login/login';
import { TabsPage } from '../pages/tabs/tabs';
import {HomePage} from '../pages/home/home';
import {ContactPage} from '../pages/contact/contact';
import {AboutPage} from '../pages/about/about';
import {createTripPage} from '../pages/createTrip/createTrip';
import { SplashPage } from '../pages/splash/splash';
import {PostDetail} from '../pages/post-detail/post-detail';
import {ProfilePage} from '../pages/profile-page/profile-page';
import { AllChat } from '../pages/all-chat/all-chat'
@Component({
  templateUrl: `app.html`
})
export class MyApp {

  @ViewChild(Nav) nav: Nav;
  rootPage: any;


  constructor(platform: Platform, private Splashscreen: SplashScreen, private statusBar: StatusBar,private nativeStorage: NativeStorage) {
    platform.ready().then(() => {
     this.nav.setRoot(SplashPage);
     statusBar.styleDefault();
    });
  }
  isAlreadyLoggedIn(){
    
  }
  goHome(){
    this.nav.push(HomePage);
  }
  goAbout(){
    this.nav.push(AboutPage);
  }
  goCreateTrip(){
    this.nav.push(createTripPage);
  }
  goToPost(){
    this.nav.push(PostDetail);
  }
}
