import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {Chats} from '../chats/chats'
/**
 * Generated class for the AllChat page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-all-chat',
  templateUrl: 'all-chat.html',
})
export class AllChat {

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }
goToChat(){
    this.navCtrl.push(Chats);
  }
  ionViewDidLoad() {
    console.log('ionViewDidLoad AllChat');
  }

}
