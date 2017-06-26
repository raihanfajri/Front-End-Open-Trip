import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Http,Headers } from '@angular/http';
import { AllComment } from '../all-comment/all-comment';
/**
 * Generated class for the PostDetail page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@Component({
  selector: 'page-post-detail',
  templateUrl: 'post-detail.html',
})
export class PostDetail {
  public content: any;
  public admin: any;
  public comments: any;
  public limit= 0;
  public menu: string;
  constructor(public navCtrl: NavController, public navParams: NavParams, public http: Http) {
    this.content = this.navParams.data;
    this.gettripadmin(this.content.tripadminid);
    this.limit = 4;
    this.getfewcomment(this.content.idtrip,this.limit);
    this.menu = "Description";
  }
  gettripadmin(id){
    var headers = new Headers();
    headers.append('Content-Type', 'application/json');
    var kirim = {idUser: id};
    this.http.post("http://localhost:3000/users/gettripadmin",kirim, {headers: headers}).subscribe(data => {
       this.admin = data.json();
    });
  }
  getallcomment(){
    this.navCtrl.push(AllComment, {id:this.content.idtrip});
  }
  getfewcomment(id,limit){
    var headers = new Headers();
    headers.append('Content-Type', 'application/json');
    this.http.get("http://localhost:3000/trip/getcomment/?id="+id+"&limit="+limit+"&order=desc", {headers: headers}).subscribe(data => {
       this.comments = data.json();
    });
  }

}
