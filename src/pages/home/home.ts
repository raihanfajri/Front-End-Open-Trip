import { Component } from '@angular/core';
import { NavController, NavParams, LoadingController, AlertController } from 'ionic-angular';
import { Chats } from '../chats/chats';
import {PostDetail} from '../post-detail/post-detail';
import { createTripPage } from '../createTrip/createTrip';
import { Http,Headers } from '@angular/http';


@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  public id = 0;
  public judul: string;
  public foto: string;
  public detail: string;
  public items: any;
  public limit = 4;
  public offset = 0;
  public search = false;
  public val: string;
  constructor(public navCtrl: NavController,public http: Http, public loadingCtrl: LoadingController,public alertCtrl: AlertController) {
    this.getallitem(this.limit,this.offset);
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
    var headers = new Headers();
    headers.append('Content-Type', 'application/json');
    this.http.get("http://localhost:3000/trip/semuatrip/?limit="+limit+"&offset="+offset, {headers: headers}).subscribe(data => {
      this.items = this.items.concat(data.json());
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
  getallitem(limit,offset){
    let loading = this.loadingCtrl.create({
      content: `<ion-spinner name="bubbles">Loading, Please wait..</ion-spinner>`
    });
    loading.present();
    var headers = new Headers();
    headers.append('Content-Type', 'application/json');
    this.http.get("http://localhost:3000/trip/semuatrip/?limit="+limit+"&offset="+offset, {headers: headers}).subscribe(data => {
       this.items = data.json();
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
  getItemplus(limit,offset){
    if (this.val && this.val.trim() != '') {
      var headers = new Headers();
      headers.append('Content-Type', 'application/json');
      this.http.get("http://localhost:3000/trip/searchtrip/?name="+this.val+"&limit="+limit+"&offset=0"+offset, {headers: headers}).subscribe(data => {
         this.items = this.items.concat(data.json());
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
  }
  getItems(key: any){
    this.val = key.target.value;
    console.log(this.val);
    if (this.val && this.val.trim() != '') {
      this.search = true;
      this.offset = 0;
      var headers = new Headers();
      headers.append('Content-Type', 'application/json');
      this.http.get("http://localhost:3000/trip/searchtrip/?name="+this.val+"&limit=4&offset=0", {headers: headers}).subscribe(data => {
         this.items = data.json();
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
