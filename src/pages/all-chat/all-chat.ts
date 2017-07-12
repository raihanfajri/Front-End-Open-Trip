import { Component, NgZone } from '@angular/core';
import { NavController, Content, NavParams, AlertController } from 'ionic-angular';
import { Http,Headers } from '@angular/http';
import * as io from 'socket.io-client';
import { DataService } from '../tabs/tabs';
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
  public socket:any;
  public rooms: any=[];
  public zone:any;
  public dataService:any = new DataService;
  constructor(public navCtrl: NavController, public navParams: NavParams, public http: Http,public alertCtrl: AlertController) {
    var user = window.localStorage.getItem('user');
    user = JSON.parse(user);
    this.idUser = user[0]['idUser'];
    this.getlatestchats(this.idUser);
    this.socket = io.connect(this.dataService.getHost());
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
  getlatestchats(iduser){
    var headers = new Headers();
    headers.append('Content-Type', 'application/json');
    this.http.get(this.dataService.getHost()+"/room/getlatestchats/?idUser="+iduser, {headers: headers}).subscribe(data => {
      let v = data.json();
      this.chats = this.chats.concat(v);
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
  getpersonalchat(idroom){
    var headers = new Headers();
    headers.append('Content-Type', 'application/json');
    this.http.get(this.dataService.getHost()+"/room/getpersonalchat/?idroom="+idroom, {headers: headers}).subscribe(data => {
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
