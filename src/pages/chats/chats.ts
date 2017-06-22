import { Component, NgZone, ViewChild } from '@angular/core';
import * as io from 'socket.io-client';
import { NavController, Content } from 'ionic-angular';
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

  constructor(public navCtrl: NavController,public http: Http) {
    var user = window.localStorage.getItem('user');
    user = JSON.parse(user);
    this.username = user["name"];
    //console.log(user[0].name);
    var headers = new Headers();
    headers.append('Content-Type', 'application/json');
    this.roomid = JSON.stringify({roomid:"myroom"});
    this.http.post("http://localhost:3000/room", this.roomid, {headers: headers}).subscribe(data => {
       let v = data.json();
    });
    this.socket = io.connect(this.socketHost);
    this.zone = new NgZone({enableLongStackTrace: false});
    this.socket.on("chat message", (msg) =>{
      this.zone.run(() =>{
        this.messages.push(msg);
        this.content.scrollToBottom();
      });
    });
  }

  chatSend(v){
    let data = {
      message: v.chatText,
      username: this.username
    }
    this.socket.emit('new message', data);
    this.chat = '';
  }


}
