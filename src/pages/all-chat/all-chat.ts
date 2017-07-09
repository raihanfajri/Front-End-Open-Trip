import { Component, NgZone } from '@angular/core';
import { NavController, Content, NavParams, AlertController } from 'ionic-angular';
import { Http,Headers } from '@angular/http';
import * as io from 'socket.io-client';
/**
 * Generated class for the AllChat page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@Component({
  selector: 'page-all-chat',
  templateUrl: 'all-chat.html',
})
export class AllChat {
  public chats: any=[];
  public idUser=0;
  public socketHost: string = "http://localhost:3000";
  public socket:any;
  public rooms: any=[];
  public zone:any;
  constructor(public navCtrl: NavController, public navParams: NavParams, public http: Http,public alertCtrl: AlertController) {
    var user = window.localStorage.getItem('user');
    user = JSON.parse(user);
    this.idUser = user[0]['idUser'];
    this.socket = io.connect(this.socketHost);
    this.zone = new NgZone({enableLongStackTrace: false});
    this.socket.on("all chat", (data) =>{
      this.zone.run(() =>{
        if(this.idUser == data.idUser){
          this.getpersonalchat(data.roomid);
        }
      });
    });
    this.socket.on("chat message", (msg) =>{
        //this.chats.push(msg);
    });
  }
  getpersonalchat(idroom){
    var headers = new Headers();
    headers.append('Content-Type', 'application/json');
    this.http.get("http://localhost:3000/room/getpersonalchat/?idroom="+idroom, {headers: headers}).subscribe(data => {
      let v = data.json();
      var index = this.chats.findIndex((obj => obj.id_chat == idroom))
      if(index != -1){
        this.chats[index].chat = v[0].chat;
      }
      else{
        this.chats = this.chats.concat(v);
      }
      console.log(this.chats)
    },
      err => {
        let alert = this.alertCtrl.create({
          title: 'Connection Error!',
          subTitle: 'Please Check Your Connection',
          buttons: ['Dismiss']
        });
        alert.present();
      });
  }
  ionViewWillLeave(){
    this.socket.emit("leave chat");
  }
  goToChat(){
    //this.navCtrl.push(Chats,{idroom: roomid,istrip:0});
  }
}
