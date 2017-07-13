import { Component } from '@angular/core';
import { NavController, NavParams, LoadingController, AlertController, App} from 'ionic-angular';
import { createTripPage } from '../createTrip/createTrip';
import { Http,Headers } from '@angular/http';
import { DataService } from '../tabs/tabs';
import { LoginPage} from '../login/login';

/**
 * Generated class for the ProfilePage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@Component({
  selector: 'page-profile-page',
  templateUrl: 'profile-page.html',
})
export class ProfilePage {
  dataService: any = new DataService
  val=0
  trips: any = []
  iduser = 0
  username: string
  fotoprofil: string
  hozt: string
  constructor(public app: App ,public navCtrl: NavController, public navParams: NavParams,public alertCtrl: AlertController,public loadingCtrl: LoadingController,public http: Http) {
    var user = window.localStorage.getItem('user')
    user = JSON.parse(user)
    this.iduser = user[0]['idUser']
    this.username = user[0]['Username']
    this.fotoprofil = user[0]['foto_profil']
    this.hozt = this.dataService.getHost()
    this.show()
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ProfilePage');
  }
  show(){
    let loading = this.loadingCtrl.create({
      content: `<ion-spinner name="bubbles">Loading, Please wait..</ion-spinner>`
    });
    loading.present();
    var headers = new Headers();
      headers.append('Content-Type', 'application/json');
      this.http.get(this.dataService.getHost()+"/trip/showtrip/?iduser="+this.iduser, {headers: headers}).subscribe(data => {
         this.trips = data.json()
         console.log(this.hozt)
         loading.dismiss()
      },
        err => {
          let alert = this.alertCtrl.create({
            title: 'Connection Error!',
            subTitle: 'Please Check Your Connection',
            buttons: ['Dismiss']
          });
          loading.dismiss()
          alert.present();
        });
  }  
  editPost(id){
    this.navCtrl.push(createTripPage,id)
  }
  hapusPost(){
    var headers = new Headers();
      headers.append('Content-Type', 'application/json');
      this.http.get(this.dataService.getHost()+"/trip/deletetrip/?idtrip="+this.val, {headers: headers}).subscribe(data => {
         console.log("terhapus!")
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
  logoutProses(){
    window.localStorage.removeItem("user")
    this.app.getRootNav().setRoot(LoginPage);
  }

}
