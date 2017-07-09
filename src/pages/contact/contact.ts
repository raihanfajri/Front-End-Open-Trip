import { Component } from '@angular/core';
import { NavController, AlertController } from 'ionic-angular';
import { Http,Headers } from '@angular/http';
import { Chats } from '../chats/chats';

@Component({
  selector: 'page-contact',
  templateUrl: 'contact.html'
})
export class ContactPage {
  public contacts :any =[];
  public idUser= 0;
  public groups:any =[];
  constructor(public navCtrl: NavController, public alertCtrl: AlertController, public http: Http) {

  }
  ionViewWillEnter(){
    var user = window.localStorage.getItem('user');
    user = JSON.parse(user);
    this.idUser = user[0]['idUser'];
    this.getallcontact();
    this.getallgroup();
  }
  generateroomid(id1,id2){
    var roomid = (0.5 * (Math.max(id1,id2)+Math.min(id1,id2)) * (Math.max(id1,id2)+Math.min(id1,id2)+1)) + Math.min(id1,id2);
    return roomid
  }
  getallgroup(){
    var headers = new Headers();
    headers.append('Content-Type', 'application/json');
    this.http.get("http://localhost:3000/trip/grouplist/?idUser="+this.idUser, {headers: headers}).subscribe(data => {
      this.groups = data.json();
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
  getallcontact(){
    var headers = new Headers();
    headers.append('Content-Type', 'application/json');
    this.http.get("http://localhost:3000/users/contactlist/?idUser="+this.idUser, {headers: headers}).subscribe(data => {
      this.contacts = data.json();
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
  goToGroupChat(id){
    this.navCtrl.push(Chats,{idroom: id,istrip:1});
  }
  goToChat(id){
    var roomid = this.generateroomid(this.idUser,id);
    this.navCtrl.push(Chats,{idroom: roomid,istrip:0});
  }
}
