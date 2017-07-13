import { Component } from '@angular/core';
import { NavController, AlertController, LoadingController } from 'ionic-angular';
import { Http,Headers } from '@angular/http';
import { Chats } from '../chats/chats';
import { DataService } from '../tabs/tabs'

@Component({
  selector: 'page-contact',
  templateUrl: 'contact.html'
})
export class ContactPage {
  public contacts :any =[];
  public idUser= 0;
  public groups:any =[];
  public dataService : any=new DataService;
  constructor(public navCtrl: NavController, public alertCtrl: AlertController, public http: Http, public loadingCtrl: LoadingController) {

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
    this.http.get(this.dataService.getHost()+"/trip/grouplist/?idUser="+this.idUser, {headers: headers}).subscribe(data => {
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
    let loading = this.loadingCtrl.create({
      content: `<ion-spinner name="bubbles">Loading, Please wait..</ion-spinner>`
    });
    loading.present();
    var headers = new Headers();
    headers.append('Content-Type', 'application/json');
    this.http.get(this.dataService.getHost()+"/users/contactlist/?idUser="+this.idUser, {headers: headers}).subscribe(data => {
      this.contacts = data.json();
      loading.dismiss();
    },
      err => {
        loading.dismiss();
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
