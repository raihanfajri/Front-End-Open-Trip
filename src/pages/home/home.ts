import { Component } from '@angular/core';
import { NavController, NavParams, LoadingController, AlertController } from 'ionic-angular';
import { Chats } from '../chats/chats';
import {PostDetail} from '../post-detail/post-detail';
import { createTripPage } from '../createTrip/createTrip';
import { Http,Headers } from '@angular/http';
import { DataService } from '../tabs/tabs';
import * as io from 'socket.io-client';
@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  public host : string;
  public id = 0;
  public judul: string;
  public foto: string;
  public detail: string;
  public items: any;
  public limit = 4;
  public offset = 0;
  public search = false;
  public val: string;
  public dataService : any = new DataService;
  public idUser=0
  public socket:any
  constructor(public navCtrl: NavController,public http: Http, public loadingCtrl: LoadingController,public alertCtrl: AlertController) {
    this.host = this.dataService.getHost();
    this.getallitem(this.limit,this.offset);
    var user = window.localStorage.getItem('user')
    user = JSON.parse(user)
    this.idUser = user[0]['idUser']
  }
  doRefresh(refresher) {
    console.log('Begin async operation', refresher);

    setTimeout(() => {
      console.log('Async operation has ended');
      if(this.items.length) this.getallitem(this.items.length,0);
      else this.getallitem(4,0)
      refresher.complete();
    }, 2000);
  }
  
  doInfinite(infiniteScroll) {
    console.log('Begin async operation');
    setTimeout(() => {
      this.offset = this.offset+4;
      if(this.search) this.getItemplus(this.limit,this.offset);
      else this.getplusitem(this.limit,this.offset);
      console.log('Async operation has ended');
      infiniteScroll.complete();
    }, 500);
  }
  getplusitem(limit,offset){
    var header = new Headers();
    header.append('Content-Type', 'application/json');
    this.http.get(this.dataService.getHost()+"/trip/semuatrip/?limit="+limit+"&offset="+offset, {headers: header})
    .subscribe(data => {
      if(data.text())
        this.items = this.items.concat(data.json());
    },
      err => {
        let alert = this.alertCtrl.create({
          title: 'Connection Error!',
          subTitle: 'Please Check Your Connection',
          buttons: [{
            text: 'Try Again',
            handler: () => {
              this.getplusitem(limit,offset)
            }
          }]
        });
        alert.present();
      });
  }
  getallitem(limit,offset){
    let loading = this.loadingCtrl.create({
      content: `<ion-spinner name="bubbles">Loading, Please wait..</ion-spinner>`
    });
    loading.present();
    var header = new Headers();
    header.append('Content-Type', 'application/json');
    this.http.get(this.dataService.getHost()+"/trip/semuatrip/?limit="+limit+"&offset="+offset, {headers: header})
    .subscribe(data => {
       if(data.text())
        this.items = data.json();
       loading.dismiss();
    },
      err => {
        loading.dismiss();
        let alert = this.alertCtrl.create({
          title: 'Connection Error!',
          subTitle: 'Please Check Your Connection',
          buttons: [{
            text: 'Try Again',
            handler: () => {
              this.getallitem(limit,offset)
            }
          }]
        });
        alert.present();
      });
  }
  getItemplus(limit,offset){
    if (this.val && this.val.trim() != '') {
      var header = new Headers();
      header.append('Content-Type', 'application/json');
      this.http.get(this.dataService.getHost()+"/trip/searchtrip/?name="+this.val+"&limit="+limit+"&offset=0"+offset, {headers: header})
      .subscribe(data => {
        if(data.text())
         this.items = this.items.concat(data.json());
      },
        err => {
          let alert = this.alertCtrl.create({
            title: 'Connection Error!',
            subTitle: 'Please Check Your Connection',
            buttons: [{
              text: 'Try Again',
              handler: () => {
                this.getItemplus(limit,offset)
              }
            }]
          });
          alert.present();
        });
    }
  }
  getItems(key: any){
    this.val = key.target.value;
    console.log(this.val);
    if (this.val && this.val.trim() != '') {
      this.search = true;
      this.offset = 0;
      var header = new Headers();
      header.append('Content-Type', 'application/json');
      this.http.get(this.dataService.getHost()+"/trip/searchtrip/?name="+this.val+"&limit=4&offset=0", {headers: header})
      .subscribe(data => {
        if(data.text())
         this.items = data.json();
      },
        err => {
          let alert = this.alertCtrl.create({
            title: 'Connection Error!',
            subTitle: 'Please Check Your Connection',
            buttons: [{
            text: 'Try Again',
            handler: () => {
              this.getItems(key)
            }
          }]
          });
          alert.present();
        });
    }
    else this.search = false;
  }
  goToChat(){
    this.navCtrl.push(Chats);
  }
  goToPost(index){
    this.navCtrl.push(PostDetail,this.items[index]);
  }
  goToCreatePost(){
    this.navCtrl.push(createTripPage);
  }
}
