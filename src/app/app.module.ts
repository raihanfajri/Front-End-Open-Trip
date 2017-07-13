import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';
import { NativeStorage } from '@ionic-native/native-storage'
import { Facebook } from '@ionic-native/facebook'
import { AboutPage } from '../pages/about/about';
import { ContactPage } from '../pages/contact/contact';
import { HomePage } from '../pages/home/home';
import { TabsPage } from '../pages/tabs/tabs';
import { Chats } from '../pages/chats/chats';
import { LoginPage } from '../pages/login/login';
import { createTripPage } from '../pages/createTrip/createTrip'
import { Http, HttpModule } from '@angular/http';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { AngularFireModule } from 'angularfire2';
import { AuthService } from '../providers/auth-service';
import { PostDetail } from '../pages/post-detail/post-detail';
import { ProfilePage } from '../pages/profile-page/profile-page';
import { SplashPage } from '../pages/splash/splash';
import { AllChat } from '../pages/all-chat/all-chat';
import {Editpost} from '../pages/editpost/editpost';
import { AllComment } from '../pages/all-comment/all-comment';
import { File } from '@ionic-native/file'
import { Transfer } from '@ionic-native/transfer'
import { Camera } from '@ionic-native/camera'
export const firebaseConfig = {
  apiKey: "AIzaSyDgxo6yYUizMM0bPH9CpTjrGQbhOh4wr4E",
  authDomain: "opentrip-165706.firebaseapp.com",
  databaseURL: "https://opentrip-165706.firebaseio.com",
  projectId: "opentrip-165706",
  storageBucket: "opentrip-165706.appspot.com",
  messagingSenderId: "1050022502444"
};


@NgModule({
  declarations: [
    MyApp,
    AboutPage,
    ContactPage,
    HomePage,
    TabsPage,
    LoginPage,
    createTripPage,
    Chats,
    PostDetail,
    ProfilePage,
    AllChat,
    AllComment,
    SplashPage,
    Editpost
  ],
  imports: [
    HttpModule,
    BrowserModule,
    IonicModule.forRoot(MyApp),
    AngularFireModule.initializeApp(firebaseConfig)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    AboutPage,
    ContactPage,
    HomePage,
    LoginPage,
    TabsPage,
    createTripPage,
    Chats,
    PostDetail,
    ProfilePage,
    AllChat,
    AllComment,
    SplashPage,
    Editpost
  ],
  providers: [
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    File,
    Transfer,
    StatusBar,
    Camera,
    SplashScreen,
    NativeStorage,
    Facebook,
    AuthService
  ]
})
export class AppModule {}
