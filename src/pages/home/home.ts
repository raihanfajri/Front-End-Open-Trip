import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { Chats } from '../chats/chats';
import {PostDetail} from '../post-detail/post-detail';
import {ProfilePage} from '../profile-page/profile-page';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  constructor(public navCtrl: NavController) {

  }
 goToChat(){
    this.navCtrl.push(Chats);
  }
  goToPost(){
    this.navCtrl.push(PostDetail);
  }
}
