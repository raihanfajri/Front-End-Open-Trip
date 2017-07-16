import { Component, ViewChild, Pipe } from '@angular/core';
import { NavController, NavParams, AlertController, Content } from 'ionic-angular';
import { Http,Headers } from '@angular/http';
import { DataService } from '../tabs/tabs';
/**
 * Generated class for the Chats page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@Component({
  selector: 'page-all-comment',
  templateUrl: 'all-comment.html',
})
export class AllComment {
  @ViewChild(Content) content: Content;
  public comments: any = [];
  public textcomment: string;
  public limit= 10;
  public offset= 0;
  public idtrip= 0;
  public idUser= 0;
  public idadmin= 0;
  public username: string;
  public dataService :any = new DataService;
  constructor(public navCtrl: NavController,public http: Http,public navParams: NavParams,public alertCtrl: AlertController) {
    let user = window.localStorage.getItem('user');
    user = JSON.parse(user);
    this.idUser = user[0]["idUser"];
    this.username = user[0]["Username"];
    this.idtrip = navParams.get('id');
    this.idadmin = navParams.get('idadmin');
    this.getallcomment(this.idtrip,this.limit);
  }
  doRefresh(refresher) {
    console.log('Begin async operation', refresher);
    this.offset = this.offset+10;
    setTimeout(() => {
      console.log('Async operation has ended');
      this.getpluscomment(this.limit,this.offset);
      refresher.complete();
    }, 2000);
  }
  getpluscomment(limit,offset){
    var headers = new Headers();
    headers.append('Content-Type', 'application/json');
    this.http.get(this.dataService.getHost()+"/users/getcomment/?id="+this.idtrip+"&limit="+limit+"&offset="+offset+"&order=desc", {headers: headers})
    .subscribe(data => {
      if(data.text()){
        let v = data.json();
        v.sort(()=>1);
        if(v.length > 0) this.comments = v.concat(this.comments);
        else {
          this.offset = this.offset-10;
        }
      }
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
  getallcomment(id,limit){
    var headers = new Headers();
    headers.append('Content-Type', 'application/json');
    this.http.get(this.dataService.getHost()+"/users/getcomment/?id="+id+"&limit="+limit+"&order=desc&offset=0", {headers: headers})
    .subscribe(data => {
      if(data.text()){
        this.comments = data.json();
        this.comments.sort(()=>1);
        console.log(this.comments)
      }
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
  commentSend(v){
    var input= JSON.stringify({
      idtrip: this.idtrip,
      idUser: this.idUser,
      commentcontent: v.Text
    })
    this.textcomment = '';
    var headers = new Headers();
    headers.append('Content-Type', 'application/json');
    console.log(input);
    this.http.post(this.dataService.getHost()+"/users/comment/",input, {headers: headers})
    .subscribe(data => {
      if(data.text()){
        let times = data.json();
        var newcomment = {
          idUser:this.idUser,
          user:{Username: this.username},
          commentcontent: v.Text,
          tanggal: times.time
        };
        this.comments.push(newcomment);
        this.content.scrollToBottom();
      }
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
