import { Component, ViewChild, Pipe } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { Http,Headers } from '@angular/http';
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
  public comments: any = [];
  public textcomment: string;
  public limit= 0;
  public idtrip= 0;
  public idUser= 0;
  public username: string;
  constructor(public navCtrl: NavController,public http: Http,public navParams: NavParams) {
    let user = window.localStorage.getItem('user');
    user = JSON.parse(user);
    this.idUser = user[0]["idUser"];
    this.username = user[0]["Username"];
    this.idtrip = navParams.get('id');
    this.limit = 1000;
    this.getallcomment(this.idtrip,this.limit);
  }
  getallcomment(id,limit){
    var headers = new Headers();
    headers.append('Content-Type', 'application/json');
    this.http.get("http://localhost:3000/trip/getcomment/?id="+id+"&limit="+limit+"&order=asc", {headers: headers}).subscribe(data => {
       this.comments = data.json();
    });
  }
  commentSend(v){
    var input= {
      idtrip: this.idtrip,
      idUser: this.idUser,
      commentcontent: v.Text
    }
    this.textcomment = '';
    var headers = new Headers();
    headers.append('Content-Type', 'application/json');
    console.log(input);
    this.http.post("http://localhost:3000/trip/comment/",JSON.stringify(input), {headers: headers}).subscribe(data => {
      let times = data.json();
      var newcomment = {
        Username: this.username,
        commentcontent: v.Text,
        tanggal: times.time
      };
      this.comments.push(newcomment);
    });
  }

}
