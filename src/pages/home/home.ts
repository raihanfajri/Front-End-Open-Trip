import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
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

  constructor(public navCtrl: NavController,public http: Http) {
    var headers = new Headers();
    headers.append('Content-Type', 'application/json');
    this.http.get("http://localhost:3000/trip/semuatrip", {headers: headers}).subscribe(data => {
       this.items = data.json();
    });
  }
  getItems(key: any){
    let val = key.target.value;
    console.log(val);
    if (val && val.trim() != '') {
      var headers = new Headers();
      headers.append('Content-Type', 'application/json');
      this.http.get("http://localhost:3000/trip/searchtrip/?name="+val, {headers: headers}).subscribe(data => {
         this.items = data.json();
      });
    }
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
