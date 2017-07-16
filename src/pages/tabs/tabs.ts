import { Component } from '@angular/core';
import { NavController, AlertController, LoadingController } from 'ionic-angular';
import { AboutPage } from '../about/about';
import { ContactPage } from '../contact/contact';
import { createTripPage } from '../createTrip/createTrip';
import { Chats } from '../chats/chats';
import { Http,Headers } from '@angular/http';
import {PostDetail} from '../post-detail/post-detail';
import {ProfilePage} from '../profile-page/profile-page';
import {HomePage} from '../home/home';
import { AllChat } from '../all-chat/all-chat';
import * as io from 'socket.io-client';
@Component({
  selector: 'page-tabs',
  templateUrl: 'tabs.html'
})
export class TabsPage {
  profilePageTab :any = ProfilePage;
  homeTab: any = HomePage;
  allChatTab: any= AllChat;
  contactTab: any= ContactPage;
  selected = 1;
  hozt:string = "https://a381dd3a.ngrok.io";
  socket:any;
  idUser =0;
  constructor(public loadingCtrl: LoadingController,public navCtrl: NavController, public alertCtrl: AlertController, public http: Http) {
    
  }
  
  goToPost(){
    this.navCtrl.push(PostDetail);
  }
}
export class DataService{
  public host :string = "http://localhost:3000";
  constructor(){

  }
  getHost(){
    return this.host;
  }
}