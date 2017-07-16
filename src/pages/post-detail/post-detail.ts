import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, LoadingController } from 'ionic-angular';
import { Http,Headers } from '@angular/http';
import { AllComment } from '../all-comment/all-comment';
import { DataService } from '../tabs/tabs';
import { HomePage } from '../home/home';
import * as io from 'socket.io-client';
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
  public comments: any=[];
  public limit= 0;
  public menu: string;
  public anggota = 0;
  public members: any=[];
  public dataService:any = new DataService;
  public hozt:string
  public socket:any;
  public idUser=0;
  constructor(public navCtrl: NavController, public navParams: NavParams, public http: Http, public alertCtrl: AlertController, public loadingCtrl: LoadingController) {
    var user = window.localStorage.getItem('user')
    user = JSON.parse(user)
    this.idUser = user[0]['idUser']
    this.content = this.navParams.data;
    this.hozt = this.dataService.getHost();
    //this.gettripadmin(this.content.tripadminid);
    // this.socket = io.connect(this.hozt);
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
    this.http.post(this.dataService.getHost()+"/users/gettripadmin",kirim, {headers: headers})
    .subscribe(data => {
      if(data.text()){
       this.admin = data.json();
      }
    },err=>{
      let alert = this.alertCtrl.create({
        title: 'Connection Error!',
        subTitle: 'Please Check Your Connection',
        buttons: [{
          text:'Try Again',
          handler:()=>{
            this.gettripadmin(id)
          }
        }]
      })
    });
  }
  getallmember(){
    var headers = new Headers();
    headers.append('Content-Type', 'application/json');
    this.http.get(this.dataService.getHost()+"/trip/getallmember/?idtrip="+this.content.idtrip, {headers: headers}).subscribe(data => {
       if(data.text()){
        this.members = this.members.concat(data.json());
       }
    },err =>{
      let alert = this.alertCtrl.create({
        title: 'Connection Error!',
        subTitle: 'Please Check Your Connection',
        buttons: [{
          text:'Try Again',
          handler:()=>{
            this.getallmember()
          }
        }]
      })
      console.log(err);
    });
  }
  getallcomment(){
    this.navCtrl.push(AllComment, {id:this.content.idtrip,idadmin:this.content.tripadminid});
  }
  getfewcomment(id,limit){
    var headers = new Headers();
    headers.append('Content-Type', 'application/json');
    this.http.get(this.dataService.getHost()+"/users/getcomment/?id="+id+"&limit="+limit+"&offset=0"+"&order=desc", {headers: headers})
    .subscribe(data => {
      if(data.text()){
       this.comments = this.comments.concat(data.json());
       this.comments.sort(()=>1);
       console.log(this.comments)
      }
    },err=>{
      let alert = this.alertCtrl.create({
        title: 'Connection Error!',
        subTitle: 'Please Check Your Connection',
        buttons: [{
          text:'Try Again',
          handler:()=>{
            this.getfewcomment(id,limit)
          }
        }]
      })
    });
  }
  requesttojoin(){
    var data={
      idUser: this.idUser,
      idtrip: this.content.idtrip,
      tripadminid: this.content.tripadminid
    }
    // this.socket.emit("join group",data)
    
    let self = this
    let loading = this.loadingCtrl.create({
      content: `<ion-spinner name="bubbles">Loading, Please wait..</ion-spinner>`
    });
    loading.present();
    var headers = new Headers();
      headers.append('Content-Type', 'application/json');
      this.http.get(this.hozt+"/trip/addtogroup/?id_user="+data.idUser+"&id_group="+data.idtrip, {headers: headers}).subscribe(resp => {
        self.socket.emit("berhasil ditambah",data)
      },
        err => {
          let alert = this.alertCtrl.create({
            title: 'Connection Error!',
            subTitle: 'Please Check Your Connection',
            buttons: [{
              text:'Try Again',
              handler:()=>{
                this.requesttojoin()
              }
            }]
          });
          loading.dismiss()
          alert.present();
        });
      
    }
   
  }

