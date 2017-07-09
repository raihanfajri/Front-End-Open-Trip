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
  public anggota = 0;
  public members: any;
  constructor(public navCtrl: NavController, public navParams: NavParams, public http: Http) {
    this.content = this.navParams.data;
    //this.gettripadmin(this.content.tripadminid);
    this.limit = 4;
    this.menu = "Description";
    this.anggota = this.content.kapasitas - this.content.sisa;
  }
  ionViewDidEnter(){
    this.getfewcomment(this.content.idtrip,this.limit);
    this.getallmember();
  }
  gettripadmin(id){
    var headers = new Headers();
    headers.append('Content-Type', 'application/json');
    var kirim = {idUser: id};
    this.http.post("http://localhost:3000/users/gettripadmin",kirim, {headers: headers}).subscribe(data => {
       this.admin = data.json();
    });
  }
  getallmember(){
    var headers = new Headers();
    headers.append('Content-Type', 'application/json');
    this.http.get("http://localhost:3000/trip/getallmember/?idtrip="+this.content.idtrip, {headers: headers}).subscribe(data => {
       this.members = data.json();
    },err =>{
      console.log(err);
    });
  }
  getallcomment(){
    this.navCtrl.push(AllComment, {id:this.content.idtrip,idadmin:this.content.tripadminid});
  }
  getfewcomment(id,limit){
    var headers = new Headers();
    headers.append('Content-Type', 'application/json');
    this.http.get("http://localhost:3000/users/getcomment/?id="+id+"&limit="+limit+"&order=desc", {headers: headers}).subscribe(data => {
       this.comments = data.json();
       this.comments.sort(()=>1);
    });
  }

}
