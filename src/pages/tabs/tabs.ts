import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { AboutPage } from '../about/about';
import { ContactPage } from '../contact/contact';
import { createTripPage } from '../createTrip/createTrip';
import { Chats } from '../chats/chats';
import {PostDetail} from '../post-detail/post-detail';
import {ProfilePage} from '../profile-page/profile-page';
import {HomePage} from '../home/home';
import { AllChat } from '../all-chat/all-chat';
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
  constructor(public navCtrl: NavController) {

  }
  
  goToPost(){
    this.navCtrl.push(PostDetail);
  }
}
export class DataService{
  public host :string = "https://002f0805.ngrok.io/";
  constructor(){

  }
  getHost(){
    return this.host;
  }
}