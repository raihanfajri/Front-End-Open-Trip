import { Component, NgZone, ViewChild } from '@angular/core';
import * as io from 'socket.io-client';
import { NavController, Content, NavParams, AlertController } from 'ionic-angular';
import { Http,Headers } from '@angular/http';
import { DataService } from '../tabs/tabs';
/**
 * Generated class for the Chats page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@Component({
  selector: 'page-chats',
  templateUrl: 'chats.html',
})
export class Chats {

  @ViewChild(Content) content: Content;
  messages:any = [];
  socketHost: string;
  socket:any;
  chat:any;
  username:string;
  zone:any;
  roomid: string;
  idUser =0;
  istrip =0;
  dataService :any = new DataService;
  tripname:string;
  pairuname: string;
  constructor(public navCtrl: NavController,public http: Http,public navParams: NavParams, public alertCtrl:AlertController) {
    this.roomid = this.navParams.get('idroom');
    this.istrip = this.navParams.get('istrip');
    var room ={roomid: this.roomid, istrip: this.istrip}
    if(this.istrip == 1) this.gettripinfo();
    this.getrecentchat();
    var user = window.localStorage.getItem('user');
    user = JSON.parse(user);
    this.username = user[0]["Username"];
    this.idUser = user[0]["idUser"];
    this.socketHost = this.dataService.getHost();
    this.socket = io.connect(this.socketHost);
    //connect to room
    this.socket.emit("room",room);
    this.zone = new NgZone({enableLongStackTrace: false});
    //wait for message comes
    this.socket.on("chat message", (msg) =>{
      this.zone.run(() =>{
        this.messages.push(msg);
        this.content.scrollToBottom();
      });
    });
  }
  ionViewWillEnter(){
    
  }
  //triggered when view dismissed
  ionViewWillLeave(){
    this.socket.emit("leave chat");
  }
  gettripinfo(){
    var idtrip = this.roomid.replace('trip','')
    var headers = new Headers();
    headers.append('Content-Type', 'application/json');
    this.http.get(this.dataService.getHost()+"/trip/gettripinfo/?idtrip="+idtrip, {headers: headers})
    .subscribe(data => {
      if(data.text()){
       let v = data.json();
       this.tripname = v[0].tripname;
      }
    },err=>{
      let alert = this.alertCtrl.create({
          title: 'Connection Error!',
          subTitle: 'Please Check Your Connection',
          buttons: ['Dismiss']
        });
        alert.present();
    });
  }
  getrecentchat(){
    var headers = new Headers();
    headers.append('Content-Type', 'application/json');
    this.http.get(this.dataService.getHost()+"/room/getrecentchat/?idroom="+this.roomid, {headers: headers})
    .subscribe(data => {
      if(data.text()){
       let v = data.json();
       this.messages = this.messages.concat(v);
       this.pairuname = this.messages[0].user.Username
      }
    },err=>{
      let alert = this.alertCtrl.create({
          title: 'Connection Error!',
          subTitle: 'Please Check Your Connection',
          buttons: ['Dismiss']
        });
        alert.present();
    });
  }
  chatSend(v){
    let data = {
      message: v.chatText,
      username: this.username,
      idUser: this.idUser
    }
    this.socket.emit('new message', data);
    this.chat = '';
  }


}
