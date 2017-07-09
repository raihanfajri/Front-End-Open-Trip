import { Component, NgZone, ViewChild } from '@angular/core';
import * as io from 'socket.io-client';
import { NavController, Content, NavParams } from 'ionic-angular';
import { Http,Headers } from '@angular/http';
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
  socketHost: string = "http://localhost:3000";
  socket:any;
  chat:any;
  username:string;
  zone:any;
  roomid: string;
  idUser =0;
  istrip =0;
  constructor(public navCtrl: NavController,public http: Http,public navParams: NavParams) {
    this.roomid = this.navParams.get('idroom');
    this.istrip = this.navParams.get('istrip');
    var room ={roomid: this.roomid, istrip: this.istrip}
    this.getrecentchat();
    var user = window.localStorage.getItem('user');
    user = JSON.parse(user);
    this.username = user[0]["Username"];
    this.idUser = user[0]["idUser"];
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
  //triggered when view dismissed
  ionViewWillLeave(){
    this.socket.emit("leave chat");
  }
  getrecentchat(){
    var headers = new Headers();
    headers.append('Content-Type', 'application/json');
    if(this.istrip == 0)
    this.http.get("http://localhost:3000/room/getrecentchat/?idroom="+this.roomid, {headers: headers}).subscribe(data => {
       let v = data.json();
       this.messages = this.messages.concat(v);
    });
    else {
      var groupid = 'trip'+this.roomid;
      this.http.get("http://localhost:3000/room/getrecentchat/?idroom="+groupid, {headers: headers}).subscribe(data => {
         let v = data.json();
         this.messages = this.messages.concat(v);
      });
    }
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
