import { Component, NgZone } from '@angular/core';
import { NavController, Content, NavParams, LoadingController ,AlertController } from 'ionic-angular';
import { Http,Headers } from '@angular/http';
import * as io from 'socket.io-client';
import { DataService } from '../tabs/tabs';
import { Chats } from '../chats/chats'
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
  public hozt: string;
  constructor(public loadingCtrl: LoadingController,public navCtrl: NavController, public navParams: NavParams, public http: Http,public alertCtrl: AlertController) {
    var user = window.localStorage.getItem('user');
    user = JSON.parse(user);
    this.idUser = user[0]['idUser'];
    this.hozt = this.dataService.getHost();
    this.socket = io.connect(this.dataService.getHost());
    this.zone = new NgZone({enableLongStackTrace: false});
    this.socket.on("all chat", (data) =>{
      this.zone.run(() =>{
        if(this.idUser == data.idUser){
          this.getpersonalchat(data.roomid);
        }
      });
    });
    this.socket.on("all group chat", (data) =>{
      this.zone.run(() =>{
        var index = this.chats.findIndex((obj => obj.id_chat == data.roomid))
        if(index != -1){
          this.getgroupchat(data.roomid);
        }
      });
    });
    this.socket.on("chat message", (msg) =>{
        //this.chats.push(msg);
    });
  }
  ionViewWillEnter(){
    this.getlatestchats(this.idUser);
    this.getlatestgroupchat(this.idUser);
  }
  ionViewDidEnter(){
    this.chats.sort(function(a, b){
      var an = a.no, bn = b.no
      return an-bn})
  }
  getgroupchat(idroom){
    var headers = new Headers();
    headers.append('Content-Type', 'application/json');
    this.http.get(this.dataService.getHost()+"/room/getgroupchat/?idroom="+idroom, {headers: headers})
    .subscribe(data => {
      if(data.text()){
        let v = data.json();
        var index = this.chats.findIndex((obj => obj.id_chat == v[0].id_chat))
        if(index != -1){
          this.chats[index].no = v[0].no;
          this.chats[index].chat = v[0].chat;
          this.chats[index].tanggal = v[0].tanggal;
        }
        else{
          this.chats = this.chats.concat(v);
        }
      }
      this.chats.sort(function(a, b){
      var an = a.no, bn = b.no
      return bn-an})
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
  getlatestchats(iduser){
    let loading = this.loadingCtrl.create({
      content: `<ion-spinner name="bubbles">Loading, Please wait..</ion-spinner>`
    });
    loading.present();
    var headers = new Headers();
    headers.append('Content-Type', 'application/json');
    this.http.get(this.dataService.getHost()+"/room/getlatestchats/?idUser="+iduser, {headers: headers})
    .subscribe(data => {
      if(data.text()){
        let v = data.json();
        var index=0;
        for(var i=0;i<v.length;i++){
          index = this.chats.findIndex((obj => obj.id_chat == v[i].id_chat))
          if(index != -1){
            this.chats[index].chat = v[i].chat;
            this.chats[index].tanggal = v[i].tanggal;
          }
          else{
            this.chats = this.chats.concat(v);
          }
        }
      }

      //this.chats = this.chats.concat(v);
      loading.dismiss()
    },
      err => {
        let alert = this.alertCtrl.create({
          title: 'Connection Error!',
          subTitle: 'Please Check Your Connection',
          buttons: ['Dismiss']
        });
        loading.dismiss()
        alert.present();
      });
  }
  getlatestgroupchat(iduser){
    let loading = this.loadingCtrl.create({
      content: `<ion-spinner name="bubbles">Loading, Please wait..</ion-spinner>`
    });
    loading.present();
    var headers = new Headers();
    headers.append('Content-Type', 'application/json');
    this.http.get(this.dataService.getHost()+"/room/getlatestgroupchats/?idUser="+iduser, {headers: headers})
    .subscribe(data => {
      if(data.text()){
        let v = data.json();
        var index=0;
        for(var i=0;i<v.length;i++){
          index = this.chats.findIndex((obj => obj.id_chat == v[i].id_chat))
          if(index != -1){
            this.chats[index].chat = v[i].chat;
            this.chats[index].tanggal = v[i].tanggal;
          }
          else{ 
            this.chats = this.chats.concat(v);
          }
        }
      }
      this.chats.sort(function(a, b){
      var an = a.no, bn = b.no
      return an-bn})
      // this.chats = this.chats.concat(v);
      console.log(this.chats)
      loading.dismiss()
    },
      err => {
        let alert = this.alertCtrl.create({
          title: 'Connection Error!',
          subTitle: 'Please Check Your Connection',
          buttons: ['Dismiss']
        });
        loading.dismiss()
        alert.present();
      });
  }
  getpersonalchat(idroom){
    var headers = new Headers();
    headers.append('Content-Type', 'application/json');
    this.http.get(this.dataService.getHost()+"/room/getpersonalchat/?idroom="+idroom, {headers: headers})
    .subscribe(data => {
      if(data.text()){
        let v = data.json();
        var index = this.chats.findIndex((obj => obj.id_chat == idroom))
        if(index != -1){
          this.chats[index].no = v[0].no;
          this.chats[index].chat = v[0].chat;
          this.chats[index].tanggal = v[0].tanggal;
        }
        else{
          this.chats = this.chats.concat(v);
        }
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
  goToChat(id){
    if(id.indexOf('trip')>-1) this.navCtrl.push(Chats,{idroom: id,istrip:1});
    else this.navCtrl.push(Chats,{idroom: id,istrip:0});
  }
}
